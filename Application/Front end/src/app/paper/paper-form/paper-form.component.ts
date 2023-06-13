import { Component, OnInit } from '@angular/core';
import { Paper } from '../paper.model';
import { PaperService } from '../paper.service';
import { ProfileService } from 'src/app/main-page/profile/profile.service';
import { Faculty } from 'src/app/faculty/faculty.model';
import { FacultyMember } from 'src/app/faculty-member/faculty-member.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/user/user.service';
import { EmailService } from 'src/app/email/email.service';
import { BackgroundService } from 'src/app/background.service';

@Component({
  selector: 'app-paper-form',
  templateUrl: './paper-form.component.html',
  styleUrls: ['./paper-form.component.scss'],
})
export class PaperFormComponent implements OnInit {
  paper: Paper = {
    id: 0,
    title: '',
    topic: '',
    description: '',
    contributors: 0,
    student: undefined,
    facultyMember: undefined,
    applications: [],
  };

  isEditing: boolean = false;

  constructor(
    private paperService: PaperService,
    private profileService: ProfileService,
    private userService: UserService,
    private emailService: EmailService,
    public backgroundService: BackgroundService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      if (
        params.get('action') == 'edit' &&
        this.paperService.editPaper !== null
      ) {
        this.paper = this.paperService.editPaper;
        this.paperService.editPaper = null;
        this.isEditing = true;
      }
    });
  }

  createOrUpdatePaper() {
    if (this.isEditing) {
      this.paperService.updatePaper(this.paper).subscribe((response) => {
        if (response.status == 200) {
          this.openSnackBar('Paper updated successfully!');
          this.sendMail();
          this.router.navigate(['/mainPage/myArticles']);
        }
      });
    } else {
      if ('degreeLevel' in this.profileService.profile)
        this.paper.student = this.profileService.profile;
      else
        this.paper.facultyMember = this.profileService.profile as FacultyMember;
      this.paperService.createPaper(this.paper).subscribe((response) => {
        if (response.status == 201) {
          this.openSnackBar('Paper created successfully!');
          this.sendMail();
          this.router.navigate(['/mainPage/myArticles']);
        }
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  sendMail() {
    if (this.isEditing) {
      this.paperService
        .getAllApplicants(this.paper.id)
        .subscribe((response) => {
          if (response.status == 200) {
            let applicants = response.body;
            for (let applicant of applicants) {
              this.emailService.sendUpdatedArticleEmail(
                applicant.email,
                this.paper
              );
            }
          }
        });
    } else {
      this.userService
        .getAllSubscribers(this.profileService.profile.user!.id)
        .subscribe((response) => {
          if (response.status == 200) {
            let subscribers = response.body;
            for (let subscriber of subscribers) {
              this.emailService.sendNewPaperEmail(subscriber.email, this.paper);
            }
          }
        });
    }
  }

  cancel() {
    window.history.back();
  }
}
