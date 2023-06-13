import { Injectable } from '@angular/core';
import { Student } from '../../student/student.model';
import { Faculty } from '../../faculty/faculty.model';
import { FacultyMember } from '../../faculty-member/faculty-member.model';
import { StudentService } from 'src/app/student/student.service';
import { FacultyService } from 'src/app/faculty/faculty.service';
import { FacultyMemberService } from 'src/app/faculty-member/faculty-member.service';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profile: Student | Faculty | FacultyMember = {} as
    | Student
    | Faculty
    | FacultyMember;
  profileToDisplay: Student | FacultyMember | Faculty | null = null;
  typeOfProfileToDisplay: string = '';
  invokeProfile: Subject<any> = new Subject();
  typeOfProfile: string = '';
  isDefined: boolean = false;

  constructor(
    private studentService: StudentService,
    private facultyService: FacultyService,
    private facultyMemberService: FacultyMemberService,
    private userService: UserService
  ) { }

  setProfile(profile: string) {
    if (profile == 'student') {
      this.studentService.getStudent(this.profile.id).subscribe((response) => {
        this.profile.tags = response.body['tags'];
      });
    } else if (profile == 'faculty') {
      this.facultyService.getFaculty(this.profile.id).subscribe((response) => {
        this.profile.tags = response.body['tags'];
      });
    } else if (profile == 'facultyMember') {
      this.facultyMemberService
        .getFacultyMember(this.profile.id)
        .subscribe((response) => {
          this.profile.tags = response.body['tags'];
        });
    }
  }

  getProfileType() {
    return this.userService.user.type;
  }

  invokeProfileAfterRefresh() {
    this.invokeProfile.next(this.profile);
  }
}
