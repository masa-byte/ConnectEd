import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackgroundService } from '../background.service';
import { GradeColleaguesService } from './grade-colleagues.service';
import { BookApplication } from '../book/book-application.model';
import { PaperApplication } from '../paper/paper-application.model';
import { ProjectApplication } from '../project/project-application.model';
import { ProfileService } from '../main-page/profile/profile.service';
import { Subject, merge, takeUntil } from 'rxjs';

@Component({
  selector: 'app-grade-colleagues',
  templateUrl: './grade-colleagues.component.html',
  styleUrls: ['./grade-colleagues.component.scss'],
})
export class GradeColleaguesComponent implements OnInit, OnDestroy {
  myUngradedApplications: (
    | BookApplication
    | PaperApplication
    | ProjectApplication
  )[] = [];

  unsubscriber: Subject<void> = new Subject();

  constructor(
    public backgroundService: BackgroundService,
    private gradeColleaguesService: GradeColleaguesService,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.getUngradedApplications();
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  getUngradedApplications(dummy: void): void {
    const typeOfProfile = this.profileService.getProfileType();
    const profileId = this.profileService.profile.id;

    this.myUngradedApplications = [];

    if (typeOfProfile === 'faculty') {
      this.gradeColleaguesService
        .getUngradedProjectApplications(profileId, typeOfProfile)
        .pipe(takeUntil(this.unsubscriber))
        .subscribe((response) => {
          this.myUngradedApplications.push(...response);
        });
    } else if (typeOfProfile === 'student') {
      merge(
        this.gradeColleaguesService.getUngradedProjectApplications(
          profileId,
          typeOfProfile
        ),
        this.gradeColleaguesService.getUngradedPaperApplications(
          profileId,
          typeOfProfile
        )
      )
        .pipe(takeUntil(this.unsubscriber))
        .subscribe((response) => {
          this.myUngradedApplications.push(...response);
        });
    } else if (typeOfProfile === 'facultyMember') {
      merge(
        this.gradeColleaguesService.getUngradedProjectApplications(
          profileId,
          typeOfProfile
        ),
        this.gradeColleaguesService.getUngradedBookApplications(profileId),
        this.gradeColleaguesService.getUngradedPaperApplications(
          profileId,
          typeOfProfile
        )
      )
        .pipe(takeUntil(this.unsubscriber))
        .subscribe((response) => {
          this.myUngradedApplications.push(...response);
        });
    }
  }

  bookTypeGuard(
    application: BookApplication | PaperApplication | ProjectApplication
  ): application is BookApplication {
    return 'book' in application;
  }

  paperTypeGuard(
    application: BookApplication | PaperApplication | ProjectApplication
  ): application is PaperApplication {
    return 'paper' in application;
  }

  projectTypeGuard(
    application: BookApplication | PaperApplication | ProjectApplication
  ): application is ProjectApplication {
    return 'project' in application;
  }
}
