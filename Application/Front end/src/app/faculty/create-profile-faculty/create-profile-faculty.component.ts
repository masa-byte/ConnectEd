import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Faculty } from '../faculty.model';
import { UserService } from 'src/app/user/user.service';
import { FacultyService } from '../faculty.service';
import { ProfileService } from 'src/app/main-page/profile/profile.service';

@Component({
  selector: 'app-create-profile-faculty',
  templateUrl: './create-profile-faculty.component.html',
  styleUrls: ['./create-profile-faculty.component.scss'],
})
export class CreateProfileFacultyComponent implements OnInit {
  faculty: Faculty = {
    id: 0,
    name: '',
    address: '',
    phoneNumber: '',
    university: '',
    description: '',
    user: undefined,
  };

  isEditing = false;

  constructor(
    private userService: UserService,
    private facultyService: FacultyService,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.profileService.isDefined == true) {
      this.isEditing = true;
      this.faculty = { ...(this.profileService.profile as Faculty) };
    }

    this.faculty.user = this.userService.user;
  }

  createProfile() {
    if (this.isEditing) {
      this.facultyService.updateFaculty(this.faculty).subscribe((faculty) => {
        this.faculty = faculty.body;
        this.profileService.profile = this.faculty;
        this.router.navigate(['mainPage/profile']);
      });
    } else {
      this.facultyService.createFaculty(this.faculty).subscribe((faculty) => {
        this.faculty = faculty.body;
        this.profileService.typeOfProfile = 'faculty';
        this.profileService.isDefined = true;
        this.profileService.profile = this.faculty;
        this.profileService.profile.user = this.userService.user;
        this.router.navigate(['/mainPage/homePage']);
      });
    }
  }

  back() {
    if (!this.isEditing) {
      this.userService.deleteUser(this.userService.user.id).subscribe();
    }
    window.history.back();
  }
}
