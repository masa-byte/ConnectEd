import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, map, of, switchMap, tap, throwError } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { ProfileService } from 'src/app/main-page/profile/profile.service';
import { GuestStateService } from 'src/app/guest-home-page/guest-state.service';
import { BackgroundService } from 'src/app/background.service';

@Component({
  selector: 'app-sign-in-user',
  templateUrl: './sign-in-user.component.html',
  styleUrls: ['./sign-in-user.component.scss'],
})
export class SignInUserComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
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
    public backgroundService: BackgroundService,
    private snackBar: MatSnackBar,
    private guestStateService: GuestStateService
  ) {}

  ngOnInit(): void {
    this.profileService.isDefined = false;
    this.guestStateService.disableGuard = true;
  }

  ngOnDestroy(): void {
    this.userService.user.faculties = [];
    this.userService.user.facultyMembers = [];
    this.userService.user.students = [];
  }

  signUp() {
    this.router.navigate(['/signUpUser']);
  }

  signIn() {
    this.userService
      .signIn(this.email, this.password)
      .pipe(
        switchMap((response) => {
          if (response.status == 201) {
            return this.userService.auth(response.body['access_token']).pipe(
              switchMap((response) => {
                if (response.status == 200) {
                  return this.userService.getUser(response.body['id']).pipe(
                    map((user) => user.body),
                    tap((user) => {
                      this.userService.user = user;
                      this.assignProfile();

                      localStorage.setItem('userId', user.id.toString());
                      localStorage.setItem(
                        'rememberMe',
                        this.rememberMe.toString()
                      );
                    })
                  );
                } else {
                  return throwError('Error');
                }
              })
            );
          } else {
            return throwError('Error');
          }
        }),
        catchError((error: any) => {
          if (error.status == 401) {
            return of(1);
          } else {
            return of(2);
          }
        })
      )
      .subscribe((response) => {
        if (typeof response == 'number') {
          if (response == 1) {
            this.openSnackBar('Credentials are incorrect');
          } else {
            this.openSnackBar("User doesn't exist. Please sign up");
          }
        } else {
          if (response.status == 200) {
          }
        }
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  assignProfile() {
    const tmpUser = this.userService.user;
    if (tmpUser.type == 'student') {
      this.profileService.typeOfProfile = 'student';
      this.profileService.profile = tmpUser['students'][0];
    } else if (tmpUser.type == 'faculty') {
      this.profileService.typeOfProfile = 'faculty';
      this.profileService.profile = tmpUser['faculties'][0];
    } else if (tmpUser.type == 'facultyMember') {
      this.profileService.typeOfProfile = 'facultyMember';
      this.profileService.profile = tmpUser['facultyMembers'][0];
    }
    this.profileService.isDefined = true;
    this.profileService.profile.user = tmpUser;
    this.router.navigate(['/mainPage/homePage']);
  }
}
