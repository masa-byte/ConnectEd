import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../book/book.model';
import { Paper } from '../paper/paper.model';
import { Project } from '../project/project.model';
import { Student } from '../student/student.model';
import { FacultyMember } from '../faculty-member/faculty-member.model';
import { Faculty } from '../faculty/faculty.model';
import { ScheduleMeetingService } from '../schedule-meeting/schedule-meeting.service';
import { HttpResponse } from '@angular/common/http';
import { PaperApplication } from '../paper/paper-application.model';
import { BookApplication } from '../book/book-application.model';
import { ProjectApplication } from '../project/project-application.model';
import { FacultyMemberService } from '../faculty-member/faculty-member.service';
import { StudentService } from '../student/student.service';
import { BookService } from '../book/book.service';
import { PaperService } from '../paper/paper.service';
import { ProjectService } from '../project/project.service';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService } from '../main-page/profile/profile.service';
import { UserService } from '../user/user.service';
import { EmailService } from '../email/email.service';

export interface GradedProfile {
  profile: Student | FacultyMember | Faculty;
  grade: number;
}

@Component({
  selector: 'app-review-article',
  templateUrl: './review-article.component.html',
  styleUrls: ['./review-article.component.scss'],
})
export class ReviewArticleComponent implements OnInit, OnDestroy {
  public articleToReview: (Book & Paper & Project) | null = null;
  public articleType: string = '';
  public applicants: GradedProfile[] = [];
  public articleOwner?: Student | FacultyMember | Faculty;
  public articleOwnerType?: string;

  private unsubscriber: Subject<void> = new Subject<void>();

  public reviewedArticleEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      articleType: string;
      articleToReview: (Book & Paper & Project) | null;
      articleOwner?: Student | FacultyMember | Faculty;
      articleOwnerType?: string;
    },
    private scheduleMeetingService: ScheduleMeetingService,
    private facultyMemberService: FacultyMemberService,
    private studentService: StudentService,
    private bookService: BookService,
    private paperService: PaperService,
    private projectService: ProjectService,
    private emailService: EmailService,
    private userService: UserService
  ) {
    this.articleType = data.articleType;
    this.articleToReview = data.articleToReview;
    this.articleOwner = data.articleOwner;
    this.articleOwnerType = data.articleOwnerType;
  }

  ngOnInit(): void {
    this.scheduleMeetingService
      .getAllApplications(this.articleType, this.articleToReview?.id)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(
        (
          response: HttpResponse<
            (PaperApplication | BookApplication | ProjectApplication)[]
          >
        ) => {
          response.body?.forEach(
            (
              application:
                | PaperApplication
                | BookApplication
                | ProjectApplication
            ) => {
              if ('book' in application) {
                this.applicants.push({
                  profile: application.facultyMember,
                  grade: 0,
                });
              } else if ('paper' in application) {
                if (application.student !== null) {
                  this.applicants.push({
                    profile: application.student,
                    grade: 0,
                  });
                } else
                  this.applicants.push({
                    profile: application.facultyMember,
                    grade: 0,
                  });
              } else if ('project' in application) {
                if (application.student !== null) {
                  this.applicants.push({
                    profile: application.student,
                    grade: 0,
                  });
                } else if (application.facultyMember !== null)
                  this.applicants.push({
                    profile: application.facultyMember,
                    grade: 0,
                  });
              }
            }
          );
          // filter myself out
          this.applicants = this.applicants.filter(
            (applicant: GradedProfile) =>
              applicant.profile.user?.id !== this.userService.user.id
          );
        },
        (error: Error) => {
          console.log(error);
        }
      );
    if (
      this.articleOwnerType !== 'faculty' &&
      this.articleOwner !== undefined
    ) {
      this.applicants.push({
        profile: this.articleOwner as Student | FacultyMember,
        grade: 0,
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  finishReview() {
    if (this.articleToReview === null)
      throw new Error('Article to review is null');

    this.applicants.forEach((applicant: GradedProfile) => {
      if ('degreeLevel' in applicant.profile) {
        this.studentService
          .updateStudentGrade(applicant.profile.id, applicant.grade)
          .pipe(takeUntil(this.unsubscriber))
          .subscribe(
            (_) => {
              // `You've got ${applicant.grade} for your ${this.articleToReview?.title}, from user ${this.userService.user.username}`
              this.emailService.sendReviewResultsMail(
                applicant.profile.user?.email,
                this.userService.user.email,
                applicant.grade,
                this.articleToReview?.title
              );
            },
            (error: Error) => {
              console.log(error);
            }
          );
      } else if ('academicTitle' in applicant.profile) {
        this.facultyMemberService
          .updateFacultyMemberGrade(applicant.profile.id, applicant.grade)
          .pipe(takeUntil(this.unsubscriber))
          .subscribe(
            (_) => {
              // `You've got ${applicant.grade} for your ${this.articleToReview?.title}, from user ${this.userService.user.username}`
              this.emailService.sendReviewResultsMail(
                applicant.profile.user?.email,
                this.userService.user.email,
                applicant.grade,
                this.articleToReview?.title
              );
            },
            (error: Error) => {
              console.log(error);
            }
          );
      }
    });
    if (this.articleType === 'book')
      this.bookService
        .closeBook(this.articleToReview.id)
        .pipe(takeUntil(this.unsubscriber))
        .subscribe((response: HttpResponse<any>) => {
          this.reviewedArticleEmitter.emit(response);
        });
    else if (this.articleType === 'paper')
      this.paperService
        .closePaper(this.articleToReview.id)
        .pipe(takeUntil(this.unsubscriber))
        .subscribe((response: HttpResponse<any>) => {
          this.reviewedArticleEmitter.emit(response);
        });
    else if (this.articleType === 'project')
      this.projectService
        .closeProject(this.articleToReview.id)
        .pipe(takeUntil(this.unsubscriber))
        .subscribe((response: HttpResponse<any>) => {
          this.reviewedArticleEmitter.emit(response);
        });
  }

  facultyMemberTypeGuard(
    applicantProfile: Student | FacultyMember | Faculty
  ): FacultyMember | undefined {
    return 'academicTitle' in applicantProfile ? applicantProfile : undefined;
  }

  studentTypeGuard(
    applicantProfile: Student | FacultyMember | Faculty
  ): Student | undefined {
    return 'degreeLevel' in applicantProfile ? applicantProfile : undefined;
  }

  facultyTypeGuard(
    applicantProfile: Student | FacultyMember | Faculty
  ): Faculty | undefined {
    return !('degreeLevel' in applicantProfile) &&
      !('academicTitle' in applicantProfile)
      ? applicantProfile
      : undefined;
  }
}
