import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestHomePageComponent } from './guest-home-page.component';
import { GuestNavComponent } from './guest-nav/guest-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DirectivesModule } from '../directives/directives.module';
import { AppRoutingModule } from '../app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { DisplayArticlesModule } from '../display-articles/display-articles.module';
import { BackgroundCanvasModule } from '../background-canvas/background-canvas.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [GuestHomePageComponent, GuestNavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    DirectivesModule,
    AppRoutingModule,
    MatButtonModule,
    DisplayArticlesModule,
    BackgroundCanvasModule,
    MatSnackBarModule,
  ],
})
export class GuestHomePageModule { }
