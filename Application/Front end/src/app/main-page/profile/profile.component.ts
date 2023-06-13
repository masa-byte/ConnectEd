import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { lorelei } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { ProfileService } from './profile.service';
import { EditTagsDialogComponent } from './edit-tags-dialog/edit-tags-dialog.component';
import { UserService } from 'src/app/user/user.service';
import { DeleteProfileDialogComponent } from './delete-profile-dialog/delete-profile-dialog.component';
import { SignInUpGuard } from 'src/app/guards/sign-in-up.guard';
import { ArticleStateService } from 'src/app/article/article-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackgroundService } from 'src/app/background.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Input() profileToDisplay: any;
  isViewProfile: boolean = false;
  typeOfProfile: string = '';
  averageRating: number = 0;
  amSubscribed: boolean = false;
  isMe: boolean = false;

  avatar: any;
  svg: SafeResourceUrl = '';

  constructor(
    private profileService: ProfileService,
    private articleStateService: ArticleStateService,
    private userService: UserService,
    public backgroundService: BackgroundService,
    private routeGuard: SignInUpGuard,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.profileService.profileToDisplay === null) {
      this.profileToDisplay = this.profileService.profile;
    } else {
      this.isViewProfile = true;
    }
    this.userService
      .checkIfSubscribed(
        this.userService.user!.id,
        this.profileToDisplay.user!.id
      )
      .subscribe((response) => {
        if (response.status === 200 && response.body === true) {
          this.amSubscribed = true;
        }
      });
    if (this.profileToDisplay.user!.id === this.userService.user!.id) {
      this.isMe = true;
    }
    this.determineProfileType();
    this.calculateAverageGrade();
    this.createProfilePicture();
  }

  ngOnDestroy(): void {
    this.profileService.profileToDisplay = null;
  }

  setProfile() {
    if (this.typeOfProfile === 'student')
      this.profileService.setProfile('student');
    else if (this.typeOfProfile === 'faculty')
      this.profileService.setProfile('faculty');
    else if (this.typeOfProfile === 'facultyMember')
      this.profileService.setProfile('facultyMember');

    this.profileToDisplay = this.profileService.profile;
  }

  calculateAverageGrade() {
    if (this.typeOfProfile !== 'faculty')
      this.averageRating =
        this.profileToDisplay.gradeSum / this.profileToDisplay.gradeCount == 0
          ? 1
          : this.profileToDisplay.gradeCount;
  }

  determineProfileType() {
    if ('degreeLevel' in this.profileToDisplay) {
      this.typeOfProfile = 'student';
    } else if ('academicTitle' in this.profileToDisplay) {
      this.typeOfProfile = 'facultyMember';
    } else {
      this.typeOfProfile = 'faculty';
    }
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

  editProfile() {
    if (this.typeOfProfile === 'student')
      this.router.navigate(['/studentCreateProfile']);
    else if (this.typeOfProfile === 'facultyMember')
      this.router.navigate(['/facultyMemberCreateProfile']);
    else if (this.typeOfProfile === 'faculty')
      this.router.navigate(['/facultyCreateProfile']);
  }

  editTags() {
    const dialogRef = this.dialog.open(EditTagsDialogComponent, {
      data: {
        tags: this.profileToDisplay.tags,
        typeOfProfile: this.typeOfProfile,
        profileId: this.profileToDisplay.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.setProfile();
    });
  }

  deleteProfile() {
    const dialogRef = this.dialog.open(DeleteProfileDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService
          .deleteUser(this.profileToDisplay.user.id)
          .subscribe(() => {
            this.routeGuard.setGuardStatus(true);
            this.router.navigate(['/signUpUser']);
          });
      } else {
        // User canceled deletion
      }
    });
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
        this.amSubscribed = true;
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
        this.amSubscribed = false;
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
