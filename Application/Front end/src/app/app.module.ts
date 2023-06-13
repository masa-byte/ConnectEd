import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentModule } from './student/student.module';
import { FacultyModule } from './faculty/faculty.module';
import { FacultyMemberModule } from './faculty-member/faculty-member.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { PaperModule } from './paper/paper.module';
import { ProjectModule } from './project/project.module';
import { MainPageModule } from './main-page/main-page.module';
import { ArticleModule } from './article/article.module';
import { SearchModule } from './search/search.module';
import { ViewProfileModule } from './view-profile/view-profile.module';
import { ProfilesSearchModule } from './profiles-search/profiles-search.module';
import { ReviewArticleModule } from './review-article/review-article.module';
import { MatTableModule } from '@angular/material/table';
import { ScheduleMeetingModule } from './schedule-meeting/schedule-meeting.module';
import { GuestHomePageModule } from './guest-home-page/guest-home-page.module';
import { GradeColleaguesModule } from './grade-colleagues/grade-colleagues.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StudentModule,
    FacultyModule,
    StudentModule,
    FacultyMemberModule,
    UserModule,
    HttpClientModule,
    BookModule,
    PaperModule,
    ProjectModule,
    MainPageModule,
    ArticleModule,
    SearchModule,
    ViewProfileModule,
    ProfilesSearchModule,
    ReviewArticleModule,
    MatTableModule,
    ScheduleMeetingModule,
    GuestHomePageModule,
    GradeColleaguesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
