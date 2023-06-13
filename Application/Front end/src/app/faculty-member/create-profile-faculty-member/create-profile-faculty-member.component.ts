import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacultyMember } from '../faculty-member.model';
import { UserService } from 'src/app/user/user.service';
import { FacultyMemberService } from '../faculty-member.service';
import { ProfileService } from 'src/app/main-page/profile/profile.service';

@Component({
  selector: 'app-create-profile-faculty-member',
  templateUrl: './create-profile-faculty-member.component.html',
  styleUrls: ['./create-profile-faculty-member.component.scss'],
})
export class CreateProfileFacultyMemberComponent implements OnInit {
  facultyMember: FacultyMember = {
    id: 0,
    name: '',
    surname: '',
    address: '',
    username: '',
    phoneNumber: '',
    faculty: '',
    academicTitle: '',
    experience: '',
    description: '',
    gradeCount: 0,
    gradeSum: 0,
    user: undefined,
  };

  isEditing = false;

  constructor(
    private userService: UserService,
    private facultyMemberService: FacultyMemberService,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.profileService.isDefined == true) {
      this.isEditing = true;
      this.facultyMember = {
        ...(this.profileService.profile as FacultyMember),
      };
    }
    this.facultyMember.user = this.userService.user;
  }

  createProfile() {
    if (this.isEditing) {
      this.facultyMemberService
        .updateFacultyMember(this.facultyMember)
        .subscribe((facultyMember) => {
          this.facultyMember = facultyMember.body;
          this.profileService.profile = this.facultyMember;
          this.router.navigate(['mainPage/profile']);
        });
    } else {
      this.facultyMemberService
        .createProfileFacultyMember(this.facultyMember)
        .subscribe((facultyMember) => {
          this.facultyMember = facultyMember.body;
          this.profileService.typeOfProfile = 'facultyMember';
          this.profileService.isDefined = true;
          this.profileService.profile = this.facultyMember;
          this.profileService.profile.user = this.userService.user;
          this.router.navigate(['/mainPage/homePage']);
        });
    }
    this.profileService.isDefined = true;
  }

  back() {
    if (!this.isEditing) {
      this.userService.deleteUser(this.userService.user.id).subscribe();
    }
    window.history.back();
  }
}
