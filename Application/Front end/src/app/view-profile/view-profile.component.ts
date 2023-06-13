import { Component, OnInit } from '@angular/core';
import { Student } from '../student/student.model';
import { FacultyMember } from '../faculty-member/faculty-member.model';
import { Faculty } from '../faculty/faculty.model';
import { ProfileService } from '../main-page/profile/profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
  profileToDisplay: Student | FacultyMember | Faculty | null = null;
  profileToDisplayType: string = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileToDisplay = this.profileService.profileToDisplay;
  }
}
