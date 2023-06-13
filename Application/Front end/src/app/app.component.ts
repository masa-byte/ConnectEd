import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { Subscription, map, tap } from 'rxjs';
import { ProfileService } from './main-page/profile/profile.service';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { MainPageGuard } from './guards/main-page.guard';
import { CreateProfileGuard } from './guards/create-profile.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ConnectEd';

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private mainPageGuard: MainPageGuard,
    private profileGuard: CreateProfileGuard
  ) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      this.mainPageGuard.setGuardStatus(true);
      this.profileGuard.setGuardStatus(true);

      this.router.navigate(['/mainPage/homePage']);
      this.userService
        .getUser(parseInt(storedUserId))
        .pipe(
          map((user) => user.body),
          tap((user) => {
            this.userService.user = user;
            this.assignProfile();
            this.profileService.invokeProfileAfterRefresh();
          })
        )
        .subscribe();
    }
  }

  assignProfile() {
    const tmpUser = this.userService.user;

    this.profileService.isDefined = true;
    this.profileService.profile.user = tmpUser;

    if (tmpUser.type == 'student') {
      this.profileService.typeOfProfile = 'student';
      this.profileService.profile = tmpUser['students'][0];
      this.profileService.setProfile('student');
    } else if (tmpUser.type == 'faculty') {
      this.profileService.typeOfProfile = 'faculty';
      this.profileService.profile = tmpUser['faculties'][0];
      this.profileService.setProfile('faculty');
    } else if (tmpUser.type == 'facultyMember') {
      this.profileService.typeOfProfile = 'facultyMember';
      this.profileService.profile = tmpUser['facultyMembers'][0];
      this.profileService.setProfile('facultyMember');
    }
  }
}
