import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';
import { NavComponent } from './nav/nav.component';
import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { EditTagsDialogComponent } from './profile/edit-tags-dialog/edit-tags-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ArticleModule } from '../article/article.module';
import { DeleteProfileDialogComponent } from './profile/delete-profile-dialog/delete-profile-dialog.component';
import { SearchModule } from '../search/search.module';
import { HomePageModule } from '../home-page/home-page.module';
import { MyArticlesModule } from '../my-articles/my-articles.module';
import { MyApplicationsModule } from '../my-applications/my-applications.module';
import { BackgroundCanvasModule } from '../background-canvas/background-canvas.module';
import { MySubscriptionsModule } from '../my-subscriptions/my-subscriptions.module';
import { DirectivesModule } from '../directives/directives.module';
import { ProfilesSearchModule } from '../profiles-search/profiles-search.module';
import { ReviewArticleModule } from '../review-article/review-article.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GradeColleaguesModule } from '../grade-colleagues/grade-colleagues.module';

@NgModule({
  declarations: [
    ProfileComponent,
    NavComponent,
    MainPageComponent,
    EditTagsDialogComponent,
    DeleteProfileDialogComponent,
  ],
  imports: [
    MainPageRoutingModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatChipsModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    ArticleModule,
    SearchModule,
    MyArticlesModule,
    HomePageModule,
    MyApplicationsModule,
    BackgroundCanvasModule,
    MySubscriptionsModule,
    DirectivesModule,
    ProfilesSearchModule,
    ReviewArticleModule,
    GradeColleaguesModule,
  ],
  exports: [ProfileComponent],
})
export class MainPageModule { }
