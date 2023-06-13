import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProfileFacultyComponent } from './faculty/create-profile-faculty/create-profile-faculty.component';
import { CreateProfileStudentComponent } from './student/create-profile-student/create-profile-student.component';
import { CreateProfileFacultyMemberComponent } from './faculty-member/create-profile-faculty-member/create-profile-faculty-member.component';
import { SignUpUserComponent } from './user/sign-up-user/sign-up-user.component';
import { SignInUserComponent } from './user/sign-in-user/sign-in-user.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MainPageGuard } from './guards/main-page.guard';
import { CreateProfileGuard } from './guards/create-profile.guard';
import { SignInUpGuard } from './guards/sign-in-up.guard';
import { GuestHomePageComponent } from './guest-home-page/guest-home-page.component';
import { GuestHomePageGuard } from './guards/guest-home-page.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'guestHomePage',
    pathMatch: 'full',
  },
  {
    path: 'guestHomePage',
    component: GuestHomePageComponent,
    pathMatch: 'full',
  },
  {
    path: 'mainPage',
    component: MainPageComponent,
    pathMatch: 'full',
    canActivate: [MainPageGuard],
  },
  {
    path: 'facultyCreateProfile',
    component: CreateProfileFacultyComponent,
    pathMatch: 'full',
  },
  {
    path: 'studentCreateProfile',
    component: CreateProfileStudentComponent,
    pathMatch: 'full',
  },
  {
    path: 'facultyMemberCreateProfile',
    component: CreateProfileFacultyMemberComponent,
    pathMatch: 'full',
  },
  {
    path: 'signInUser',
    component: SignInUserComponent,
    pathMatch: 'full',
  },
  {
    path: 'signUpUser',
    component: SignUpUserComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
