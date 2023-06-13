import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacultyMember } from 'src/app/faculty-member/faculty-member.model';
import { Faculty } from 'src/app/faculty/faculty.model';
import { ProfileService } from 'src/app/main-page/profile/profile.service';
import { Student } from 'src/app/student/student.model';
import { FacultyMemberService } from '../faculty-member/faculty-member.service';
import { FacultyService } from '../faculty/faculty.service';
import { StudentService } from '../student/student.service';
import { MatDialog } from '@angular/material/dialog';
import { DisplayTestComponent } from '../display-test/display-test.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book/book.service';
import { PaperService } from '../paper/paper.service';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';
import { Subject, takeUntil } from 'rxjs';
import { ArticleStateService } from './article-state.service';
import { EmailService } from '../email/email.service';
import { Book } from '../book/book.model';
import { ScheduleMeetingComponent } from '../schedule-meeting/schedule-meeting.component';
import { ReviewArticleComponent } from '../review-article/review-article.component';
import { Paper } from '../paper/paper.model';
import { Project } from '../project/project.model';
import { GradeColleaguesService } from '../grade-colleagues/grade-colleagues.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() articleToDisplay: any;
  @Input() isGuest: boolean = false;

  hasTest: boolean = false;
  isMyApplications: boolean = false;
  isSubscribed: boolean = false;
  isGradeColleagues: boolean = false;

  @Output() invokeChangeInGradeColleagues: EventEmitter<void> =
    new EventEmitter<void>();

  typeOfArticleToDisplay: string = '';
  owner: Student & FacultyMember & Faculty = {} as Student &
    FacultyMember &
    Faculty;
  ownerType: string = '';

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private studentService: StudentService,
    private facultyMemberService: FacultyMemberService,
    private facultyService: FacultyService,
    private bookService: BookService,
    private paperService: PaperService,
    private projectService: ProjectService,
    private articleStateService: ArticleStateService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private gradeColleaguesService: GradeColleaguesService
  ) { }

  get isOwnedByMe(): boolean {
    // get profile type as string
    let profileType;
    if ('degreeLevel' in this.profileService.profile) profileType = 'student';
    else if ('academicTitle' in this.profileService.profile)
      profileType = 'facultyMember';
    else if ('university' in this.profileService.profile)
      profileType = 'faculty';

    // get owner type as string
    if ('degreeLevel' in this.owner) this.ownerType = 'student';
    else if ('academicTitle' in this.owner) this.ownerType = 'facultyMember';
    else if ('university' in this.owner) this.ownerType = 'faculty';
    if (profileType !== this.ownerType) return false;
    return this.profileService.profile.id === this.owner.id;
  }

  ngOnInit(): void {
    this.determineArticleType();
    this.setOwner();

    if (this.activatedRoute.snapshot.routeConfig?.path === 'myApplications')
      this.isMyApplications = true;

    if (this.activatedRoute.snapshot.routeConfig?.path === 'gradeColleagues')
      this.isGradeColleagues = true;

    if (this.userService.user !== undefined && this.owner.user !== undefined) {
      this.userService
        .checkIfSubscribed(this.userService.user.id, this.owner.user.id)
        .subscribe((response) => {
          if (response.status === 200 && response.body === true) {
            this.isSubscribed = true;
          }
        });
    }

    this.articleStateService.articleSubscriptionStatus$.subscribe(
      (response) => {
        if (this.owner.id === response.articleOwnerId)
          this.isSubscribed = response.isSubscribed;
      }
    );
  }

  determineArticleType() {
    if ('name' in this.articleToDisplay) {
      this.typeOfArticleToDisplay = 'project';
    } else if ('student' in this.articleToDisplay) {
      this.typeOfArticleToDisplay = 'paper';
    } else {
      this.typeOfArticleToDisplay = 'book';
    }
  }

  setOwner() {
    // if it is true then set owner to that
    if (this.articleToDisplay.facultyMember) {
      this.owner = this.articleToDisplay.facultyMember;
    } else if (this.articleToDisplay.student) {
      this.owner = this.articleToDisplay.student;
    } else if (this.articleToDisplay.faculty) {
      this.owner = this.articleToDisplay.faculty;
    }
  }

  applyAll() {
    if (this.profileService.typeOfProfile === 'student') {
      if (this.typeOfArticleToDisplay === 'book')
        this.openSnackBar('You cannot apply for a book!');
      else {
        this.studentService
          .applyForArticle(
            this.profileService.profile.id,
            this.articleToDisplay.id,
            this.typeOfArticleToDisplay
          )
          .subscribe(
            () => this.openSnackBar('Successful application!'),
            (error) => {
              const errorMessage = error.error.message;
              this.openSnackBar(errorMessage);
            }
          );
      }
    } else if (this.profileService.typeOfProfile === 'facultyMember') {
      this.facultyMemberService
        .applyForArticle(
          this.profileService.profile.id,
          this.articleToDisplay.id,
          this.typeOfArticleToDisplay
        )
        .subscribe(
          () => this.openSnackBar('Successful application!'),
          (error) => {
            const errorMessage = error.error.message;
            this.openSnackBar(errorMessage);
          }
        );
    } else if (this.profileService.typeOfProfile === 'faculty') {
      if (this.typeOfArticleToDisplay === 'book')
        this.openSnackBar('You cannot apply for a book!');
      else if (this.typeOfArticleToDisplay === 'paper')
        this.openSnackBar('You cannot apply for a paper!');
      else {
        this.facultyService
          .applyForArticle(
            this.profileService.profile.id,
            this.articleToDisplay.id
          )
          .subscribe(
            () => this.openSnackBar('Successful application!'),
            (error) => {
              const errorMessage = error.error.message;
              this.openSnackBar(errorMessage);
            }
          );
      }
    }
  }

  applyForArticle() {
    if (this.typeOfArticleToDisplay === 'project') {
      this.projectService
        .checkIfApplicationExists(
          this.articleToDisplay.id,
          this.profileService.profile.id,
          this.profileService.typeOfProfile
        )
        .subscribe((response) => {
          if (response.status === 200 && response.body) {
            this.openSnackBar('You have already applied for this project!');
          } else {
            if (
              this.articleToDisplay.test !== undefined &&
              this.articleToDisplay.test !== null
            ) {
              const matDialogRef = this.dialog.open(DisplayTestComponent, {
                data: this.articleToDisplay.test,
                width: '80%',
              });
              matDialogRef.componentInstance.testSuccess.subscribe(
                (result: boolean) => {
                  if (result) {
                    this.applyAll();
                  }
                }
              );
            } else {
              this.applyAll();
            }
          }
        });
    } else {
      this.applyAll();
    }
  }

  viewProfile() {
    this.profileService.profileToDisplay = this.owner;
    this.profileService.typeOfProfileToDisplay = this.ownerType;
    this.router.navigate(['/mainPage/viewProfile']);
  }

  reviewArticle() {
    const reviewArticleDialogRef = this.dialog.open(ReviewArticleComponent, {
      data: {
        articleToReview: this.articleToDisplay,
        articleType: this.typeOfArticleToDisplay,
      },
      width: '80%',
    });
    reviewArticleDialogRef.componentInstance.reviewedArticleEmitter.subscribe(
      (article: any) => {
        if (article) {
          this.articleToDisplay = article;
        }
      }
    );
  }

  scheduleMeeting() {
    const matDialogRef = this.dialog.open(ScheduleMeetingComponent, {
      data: {
        articleId: this.articleToDisplay.id,
        articleType: this.typeOfArticleToDisplay,
        article: this.articleToDisplay,
      },
      width: '80%',
    });
    //this.emailService.sendDeclineEmail("stefan.sa.aleksic@gmail.com", this.articleToDisplay as Book);
  }

  editArticle() {
    if (this.typeOfArticleToDisplay === 'project') {
      this.projectService.editProject = this.articleToDisplay;
      this.router.navigate(['/mainPage/projectForm', 'edit']);
    } else if (this.typeOfArticleToDisplay === 'paper') {
      this.paperService.editPaper = this.articleToDisplay;
      this.router.navigate(['/mainPage/paperForm/', 'edit']);
    } else if (this.typeOfArticleToDisplay === 'book') {
      this.bookService.editBook = this.articleToDisplay;
      this.router.navigate(['/mainPage/bookForm', 'edit']);
    }
  }

  gradeColleagues() {
    const gradeColleaguesDialogRef = this.dialog.open(ReviewArticleComponent, {
      data: {
        articleToReview: this.articleToDisplay,
        articleType: this.typeOfArticleToDisplay,
        articleOwner: this.owner,
        articleOwnerType: this.ownerType,
      },
      width: '80%',
    });
    gradeColleaguesDialogRef.componentInstance.reviewedArticleEmitter.subscribe(
      (article: Book | Paper | Project) => {
        if (article) {
          this.articleToDisplay = article;
          if (this.typeOfArticleToDisplay === 'book') {
            this.gradeColleaguesService
              .finishBookGrading(
                this.articleToDisplay.id,
                this.profileService.profile.id
              )
              .subscribe(
                () => {
                  this.openSnackBar('Successful grading!'),
                    this.invokeChangeInGradeColleagues.emit();
                },
                (error) => {
                  console.log(error);
                }
              );
          } else if (this.typeOfArticleToDisplay === 'paper') {
            this.gradeColleaguesService
              .finishPaperGrading(
                this.articleToDisplay.id,
                this.profileService.profile.id,
                this.profileService.typeOfProfile
              )
              .subscribe(
                () => {
                  this.openSnackBar('Successful grading!');
                  this.invokeChangeInGradeColleagues.emit();
                },
                (error) => {
                  console.log(error);
                }
              );
          } else if (this.typeOfArticleToDisplay === 'project') {
            this.gradeColleaguesService
              .finishProjectGrading(
                this.articleToDisplay.id,
                this.profileService.profile.id,
                this.profileService.typeOfProfile
              )
              .subscribe(
                () => {
                  this.openSnackBar('Successful grading!');
                  this.invokeChangeInGradeColleagues.emit();
                },
                (error) => {
                  console.log(error);
                }
              );
          } else throw new Error('Invalid article type!');
        }
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
    });
  }
}
