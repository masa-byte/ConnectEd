import { Component, Inject, OnInit, ViewChild ,HostListener} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ScheduleMeetingService } from './schedule-meeting.service';
import { Student } from '../student/student.model';
import { Faculty } from '../faculty/faculty.model';
import { FacultyMember } from '../faculty-member/faculty-member.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable, Subject, of } from 'rxjs';
import { EmailService } from '../email/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface StudentIndexed extends Student {
  index?: number;
  selected?: boolean;
}
export interface FacultyIndexed extends Faculty {
  index?: number;
  selected?: boolean;
}
export interface FacultyMemberIndexed extends FacultyMember {
  index?: number;
  selected?: boolean;
}

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),]

})
export class ScheduleMeetingComponent implements OnInit {
  columnsToDisplay = ['number', 'name', 'phoneNumber', 'email', 'type', 'accept'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: StudentIndexed | FacultyIndexed | FacultyMemberIndexed | null = null;

  article: any;
  applications: any[] = [];
  articleId: number | undefined;
  articleType: string = "";
  applicants: Array<StudentIndexed | FacultyIndexed | FacultyMemberIndexed> = [];
  applicants$: Observable<Array<StudentIndexed | FacultyIndexed | FacultyMemberIndexed>> =
    new Observable<Array<StudentIndexed | FacultyIndexed | FacultyMemberIndexed>>();
  date: Date = new Date();
  time: string = "";
  selectedApplicants: any[] = [];
  screenWidth: number=-1;
  thresholdWidth: number = 1100;


  constructor(
    private scheduleMeetingService: ScheduleMeetingService,
    private emailService: EmailService,
    private snackBar: MatSnackBar,
    private matDialogRef: MatDialogRef<ScheduleMeetingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.checkScreenSize();
    this.article = this.data.article;
    this.articleId = this.data.articleId;
    this.articleType = this.data.articleType;
    this.scheduleMeetingService.getAllApplications(this.articleType, this.articleId).subscribe((res) => {
      this.applications = res.body;
      this.applicants$ = this.getApplicants();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }
  checkScreenSize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < this.thresholdWidth) {
      this.showSnackBar('Screen size is smaller than allowed. Please use a bigger screen to schedule a meeting.');
      this.matDialogRef.close();
    }
  }
  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }

  getApplicants() {
    this.applications.forEach((application, index) => {
      if (this.articleType === "book") {
        this.applicants.push({ ...application.facultyMember, index: index, selected: false });
      } else if (this.articleType === "paper") {
        this.applicants.push(application.student ? { ...application.student, index: index, selected: false } : { ...application.facultyMember, index: index, selected: false });
      } else if (this.articleType === "project") {
        this.applicants.push(application.faculty ? { ...application.faculty, index: index, selected: false } : application.facultyMember ? { ...application.facultyMember, index: index, selected: false } : { ...application.student, index: index, selected: false });
      }
    });
    return of(this.applicants);
  }
  cancel() {
    this.matDialogRef.close();
  }
  schedule() {
    let applicantType = "";
  
    const selectedApplicants = this.applicants.filter((applicant) => applicant.selected);
    for (let accepted of selectedApplicants) {
      this.emailService.sendAcceptEmail(accepted.user!.email, this.article, this.date, this.time);
    }
    const declinedApplicants = this.applicants.filter((applicant) => !applicant.selected);
    for (let declined of declinedApplicants) {
      this.emailService.sendDeclineEmail(declined.user!.email, this.article);
      if ('degreeLevel' in declined) {
        applicantType = "student";
      } else if ('academicTitle' in declined) {
        applicantType = "facultyMember";
      } else {
        applicantType = "faculty";
      }
      this.scheduleMeetingService.deleteDeclinedApplication(this.articleId!, declined.id, applicantType, this.articleType).subscribe((res) => {
      });
    }
    this.matDialogRef.close();
  }
}
