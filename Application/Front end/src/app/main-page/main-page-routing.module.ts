import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MainPageComponent } from './main-page.component';
import { BookFormComponent } from '../book/book-form/book-form.component';
import { PaperFormComponent } from '../paper/paper-form/paper-form.component';
import { ProjectFormComponent } from '../project/project-form/project-form.component';
import { TestComponent } from '../project/test/test.component';
import { SearchComponent } from '../search/search.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { ArticleComponent } from '../article/article.component';
import { MyArticlesComponent } from '../my-articles/my-articles.component';
import { MyApplicationsComponent } from '../my-applications/my-applications.component';
import { MainPageGuard } from '../guards/main-page.guard';
import { ViewProfileComponent } from '../view-profile/view-profile.component';
import { MySubscriptionsComponent } from '../my-subscriptions/my-subscriptions.component';
import { ProfilesSearchComponent } from '../profiles-search/profiles-search.component';
import { ScheduleMeetingComponent } from '../schedule-meeting/schedule-meeting.component';
import { GradeColleaguesComponent } from '../grade-colleagues/grade-colleagues.component';

const routes: Routes = [
    {
        path: 'mainPage',
        component: MainPageComponent,
        canActivateChild: [MainPageGuard],
        children: [
            {
                path: '',
                redirectTo: 'homePage',
                pathMatch: 'full',
            },
            {
                path: 'profile',
                component: ProfileComponent,
                pathMatch: 'full',
            },
            {
                path: 'projectForm/:action',
                component: ProjectFormComponent,
            },
            {
                path: 'testForm',
                component: TestComponent,
                pathMatch: 'full',
            },
            {
                path: 'paperForm/:action',
                component: PaperFormComponent,
            },
            {
                path: 'bookForm/:action',
                component: BookFormComponent,
            },
            {
                path: 'article',
                component: ArticleComponent,
                pathMatch: 'full',
            },
            {
                path: 'search',
                component: SearchComponent,
                pathMatch: 'full',
            },
            {
                path: 'myArticles',
                component: MyArticlesComponent,
                pathMatch: 'full',
            },
            {
                path: 'homePage',
                component: HomePageComponent,
                pathMatch: 'full',
            },
            {
                path: 'myApplications',
                component: MyApplicationsComponent,
                pathMatch: 'full',
            },
            {
                path: 'mySubscriptions',
                component: MySubscriptionsComponent,
                pathMatch: 'full',
            },
            {
                path: 'viewProfile',
                component: ViewProfileComponent,
                pathMatch: 'full',
            },
            {
                path: 'searchProfiles',
                component: ProfilesSearchComponent,
                pathMatch: 'full',
            },
            {
                path: 'scheduleMeeting',
                component: ScheduleMeetingComponent,
                pathMatch: 'full',
            },
            {
                path: 'gradeColleagues',
                component: GradeColleaguesComponent,
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainPageRoutingModule { }
