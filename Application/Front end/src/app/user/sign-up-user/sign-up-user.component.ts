import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ProfileService } from 'src/app/main-page/profile/profile.service';
import { EmailVerificationService } from '../email-verification-service';
import { GuestStateService } from 'src/app/guest-home-page/guest-state.service';

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.scss'],
})
export class SignUpUserComponent implements OnInit {
  email: string = '';
  password: string = '';
  type: string = '';
  hidePassword: boolean = true;
  rememberMe: boolean = false;

  user: User = {
    id: 0,
    email: '',
    password: '',
    type: '',
    faculties: [],
    facultyMembers: [],
    students: [],
    subscribers: [],
    subscribees: [],
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private profileService: ProfileService,
    private emailVerificationService: EmailVerificationService,
    private snackBar: MatSnackBar,
    private guestStateService: GuestStateService
  ) {}

  ngOnInit(): void {
    this.profileService.isDefined = false;
    this.guestStateService.disableGuard = true;
  }

  signIn() {
    this.router.navigate(['/signInUser']);
  }

  signUp() {
    this.emailVerificationService
      .verifyEmail(this.email)
      .then((isValid) => {
        if (isValid) {
          this.userService
            .signUp(this.email, this.password, this.type)
            .pipe(
              switchMap((response) => {
                if (response.status == 201) {
                  return this.userService.auth(response.body['access_token']);
                } else return throwError('Error');
              }),
              catchError((error: any) => {
                // 400 is for invalid email
                if (error.status == 400) return of(1);
                // 404 is for user already exists
                else return of(2);
              })
            )
            .subscribe((response) => {
              if (typeof response == 'number') {
                if (response == 1) {
                  this.openSnackBar('Invalid email');
                } else {
                  this.openSnackBar('User already exists. Please sign in');
                }
              } else {
                if (response.status == 200) {
                  this.user.email = this.email;
                  this.user.password = this.password;
                  this.user.type = this.type;
                  this.user.id = response.body['id'];
                  this.userService.user = this.user;

                  localStorage.setItem('userId', this.user.id.toString());
                  localStorage.setItem(
                    'rememberMe',
                    this.rememberMe.toString()
                  );

                  this.callCreateProfileForm(this.user);
                }
              }
            });
        } else {
          this.openSnackBar('Email does not exist!');
        }
      })
      .catch((error) => {
        this.openSnackBar('Error occurred while verifying email!');
      });
  }

  callCreateProfileForm(user: User) {
    if (user.type == 'student') {
      this.router.navigate(['/studentCreateProfile']);
    } else if (user.type == 'faculty') {
      this.router.navigate(['/facultyCreateProfile']);
    } else if (user.type == 'facultyMember') {
      this.router.navigate(['/facultyMemberCreateProfile']);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
