import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../../student/student.model';
import { Faculty } from '../../faculty/faculty.model';
import { FacultyMember } from '../../faculty-member/faculty-member.model';
import { ProfileService } from '../../main-page/profile/profile.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { lorelei } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { UserService } from '../../user/user.service';
import { ArticleStateService } from '../../article/article-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-profile-search-view',
  templateUrl: './profile-search-view.component.html',
  styleUrls: ['./profile-search-view.component.scss'],
})
export class ProfileSearchViewComponent implements OnInit {
  @Input() profileToDisplay: (Student & Faculty & FacultyMember) | null = null;

  tags: Tag[] = [];

  typeOfProfileToDisplay: string = '';
  isSubscribed: boolean = false;
  averageRating: number = 0;
  isMe: boolean = false;
  avatar: any;
  svg: SafeResourceUrl = '';

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private articleStateService: ArticleStateService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (
      this.profileToDisplay?.gradeCount !== 0 &&
      this.profileToDisplay?.gradeSum !== 0 &&
      this.profileToDisplay?.gradeCount !== undefined &&
      this.profileToDisplay?.gradeSum !== undefined
    ) {
      this.averageRating =
        this.profileToDisplay.gradeSum / this.profileToDisplay.gradeCount;
    }

    if (this.profileToDisplay?.tags !== undefined) {
      this.tags = ((<unknown>this.profileToDisplay.tags) as Tag[]) ?? [];
    }

    if (
      this.profileToDisplay?.user !== undefined &&
      this.userService.user !== undefined
    ) {
      if (this.profileToDisplay.user.id === this.userService.user.id) {
        this.isMe = true;
      }
    }

    if (
      this.userService.user !== undefined &&
      this.profileToDisplay?.user !== undefined
    ) {
      this.userService
        .checkIfSubscribed(
          this.userService.user.id,
          this.profileToDisplay?.user.id
        )
        .subscribe((response) => {
          if (response.status === 200 && response.body === true) {
            this.isSubscribed = true;
          }
        });
    }

    this.createProfilePicture();
    this.determineProfileType();
  }

  viewProfile() {
    if (this.profileToDisplay === null)
      throw new Error('Passed profile is null, something went wrong.');

    this.profileService.profileToDisplay = this.profileToDisplay;
    this.profileService.typeOfProfileToDisplay = this.typeOfProfileToDisplay;
    this.router.navigate(['/mainPage/viewProfile']);
  }

  determineProfileType() {
    if (this.profileToDisplay === null)
      throw new Error('Passed profile is null, something went wrong.');
    if ('degreeLevel' in this.profileToDisplay)
      this.typeOfProfileToDisplay = 'student';
    else if ('academicTitle' in this.profileToDisplay)
      this.typeOfProfileToDisplay = 'faculty member';
    else if ('university' in this.profileToDisplay)
      this.typeOfProfileToDisplay = 'faculty';
    else
      throw new Error(
        'Passed profile is neither student, faculty member or faculty, something went wrong.'
      );
  }

  createProfilePicture() {
    this.avatar = createAvatar(lorelei, {
      seed: this.determineSeed(),
      earringsProbability: 20,
      earrings: ['variant01', 'variant02', 'variant03'],
      frecklesProbability: 12,
      glassesProbability: 30,
    });
    const svgData = this.avatar.toString();
    this.svg = this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/svg+xml;base64,' + btoa(svgData)
    );
  }

  determineSeed(): string {
    const seedList = [
      'Cleo',
      'Gizmo',
      'Willow',
      'Oreo',
      'Charlie',
      'Tigger',
      'Coco',
      'Sassy',
      'Salem',
      'Bandit',
      'Leo',
      'Pumpkin',
      'Sammy',
    ];
    const seed = seedList[Math.floor((Math.random() * 100) % seedList.length)];
    return seed;
  }

  subscribeToUser() {
    if (this.profileToDisplay === null)
      throw new Error('Passed profile is null, something went wrong.');
    this.userService
      .subscribeTo(
        this.profileService.profile.user!.id,
        this.profileToDisplay.user!.id
      )
      .subscribe(() => {
        if (this.profileToDisplay === null)
          throw new Error('Passed profile is null, something went wrong.');
        this.articleStateService.updateSubscriptionStatus(
          this.profileToDisplay.user!.id,
          true
        );
        this.isSubscribed = true;
        this.openSnackBar('Successful subscription!');
      });
  }

  unsubscribeFromUser() {
    if (this.profileToDisplay === null)
      throw new Error('Passed profile is null, something went wrong.');
    this.userService
      .unsubscribeFrom(
        this.profileService.profile.user!.id,
        this.profileToDisplay.user!.id
      )
      .subscribe(() => {
        if (this.profileToDisplay === null)
          throw new Error('Passed profile is null, something went wrong.');
        this.articleStateService.updateSubscriptionStatus(
          this.profileToDisplay.user!.id,
          false
        );
        this.isSubscribed = false;
        this.openSnackBar('Successful unsubscription!');
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
