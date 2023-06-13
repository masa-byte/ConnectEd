import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { ProfileService } from 'src/app/main-page/profile/profile.service';
import { FacultyMember } from 'src/app/faculty-member/faculty-member.model';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/user/user.service';
import { EmailService } from 'src/app/email/email.service';
import { BackgroundService } from 'src/app/background.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  book: Book = {
    id: 0,
    title: '',
    topic: '',
    description: '',
    contributors: 0,
    facultyMember: undefined,
    applications: [],
  };

  isEditing: boolean = false;

  constructor(
    private profileService: ProfileService,
    private bookService: BookService,
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
        this.bookService.editBook !== null
      ) {
        this.book = this.bookService.editBook;
        this.bookService.editBook = null;
        this.isEditing = true;
      }
    });
  }

  createOrUpdateBook() {
    if (this.isEditing) {
      this.bookService.updateBook(this.book).subscribe((response) => {
        if (response.status == 200) {
          this.openSnackBar('Book updated successfully!');
          this.sendMail();
          this.router.navigate(['/mainPage/myArticles']);
        }
      });
    } else {
      this.book.facultyMember = this.profileService.profile as FacultyMember;
      this.bookService.createBook(this.book).subscribe((response) => {
        if (response.status == 201) {
          this.openSnackBar('Book created successfully!');
          this.sendMail();
          this.router.navigate(['/mainPage/myArticles']);
        }
      });
    }
  }

  sendMail() {
    if (this.isEditing) {
      this.bookService.getAllApplicants(this.book.id).subscribe((response) => {
        if (response.status == 200) {
          let applicants = response.body;
          for (let applicant of applicants) {
            this.emailService.sendUpdatedArticleEmail(
              applicant.email,
              this.book
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
              this.emailService.sendNewBookEmail(subscriber.email, this.book);
            }
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

  cancel() {
    window.history.back();
  }
}
