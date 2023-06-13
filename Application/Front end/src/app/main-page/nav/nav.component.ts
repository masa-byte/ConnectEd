import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile/profile.service';
import { FacultyMember } from 'src/app/faculty-member/faculty-member.model';
import { Faculty } from 'src/app/faculty/faculty.model';
import { Student } from 'src/app/student/student.model';
import { MainPageGuard } from 'src/app/guards/main-page.guard';
import { CreateProfileGuard } from 'src/app/guards/create-profile.guard';
import { BackgroundService } from 'src/app/background.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  profile: Student | Faculty | FacultyMember = {} as
    | Student
    | Faculty
    | FacultyMember;
  typeOfProfile: string = '';
  backgroundStatus: boolean = false;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private backgroundService: BackgroundService,
    private mainPageGuard: MainPageGuard,
    private profileGuard: CreateProfileGuard
  ) { }

  changeBackgroundStatus() {
    this.backgroundService.setBackgroundStatus(
      !this.backgroundService.getBackgroundStatus()
    );
  }

  openProfile() {
    this.router.navigate(['mainPage/profile']);
  }

  openProjectForm() {
    this.router.navigate(['mainPage/projectForm', 'create']);
  }

  openPaperForm() {
    this.router.navigate(['mainPage/paperForm/', 'create']);
  }

  openBookForm() {
    this.router.navigate(['mainPage/bookForm', 'create']);
  }

  openMyArticles() {
    this.router.navigate(['mainPage/myArticles']);
  }

  openMyApplications() {
    this.router.navigate(['mainPage/myApplications']);
  }

  openMySubscriptions() {
    this.router.navigate(['mainPage/mySubscriptions']);
  }

  openGradeColleagues() {
    this.router.navigate(['mainPage/gradeColleagues']);
  }

  openHomePage() {
    this.router.navigate(['mainPage/homePage']);
  }

  signOut() {
    localStorage.removeItem('userId');
    localStorage.removeItem('rememberMe');
    this.mainPageGuard.setGuardStatus(false);
    this.profileGuard.setGuardStatus(false);
    this.profileService.isDefined = false;

    this.router.navigate(['/signInUser']);
  }

  ngOnInit(): void {
    this.profile = this.profileService.profile;

    if (this.profile.name == undefined) {
      this.profileService.invokeProfile.subscribe(() => {
        this.profile = this.profileService.profile;
        this.ngOnInit();
      });
    }

    if ('degreeLevel' in this.profile) {
      this.typeOfProfile = 'student';
    } else if ('academicTitle' in this.profile) {
      this.typeOfProfile = 'facultyMember';
    } else {
      this.typeOfProfile = 'faculty';
    }
  }
}
