import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../student.model';
import { UserService } from 'src/app/user/user.service';
import { StudentService } from '../student.service';
import { ProfileService } from 'src/app/main-page/profile/profile.service';

@Component({
  selector: 'app-create-profile-student',
  templateUrl: './create-profile-student.component.html',
  styleUrls: ['./create-profile-student.component.scss'],
})
export class CreateProfileStudentComponent implements OnInit {
  student: Student = {
    name: '',
    surname: '',
    address: '',
    username: '',
    phoneNumber: '',
    faculty: '',
    degreeLevel: '',
    experience: '',
    description: '',
    id: 0,
    gradeCount: 0,
    gradeSum: 0,
    user: undefined,
  };

  isEditing = false;

  constructor(
    private userService: UserService,
    private studentService: StudentService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isEditing = false;
    if (this.profileService.isDefined == true) {
      this.isEditing = true;
      this.student = { ...(this.profileService.profile as Student) };
    }
    this.student.user = this.userService.user;
  }

  saveProfile() {
    if (this.isEditing) {
      this.studentService.updateStudent(this.student).subscribe((student) => {
        this.student = student.body;
        this.profileService.profile = this.student;
        this.router.navigate(['mainPage/profile']);
      });
    } else {
      this.studentService.createStudent(this.student).subscribe((student) => {
        this.student = student.body;
        this.profileService.typeOfProfile = 'student';
        this.profileService.isDefined = true;
        this.profileService.profile = this.student;
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
