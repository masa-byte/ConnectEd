import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SignInUserComponent } from './sign-in-user/sign-in-user.component';
import { MatIconModule } from '@angular/material/icon';
import { BackgroundCanvasModule } from '../background-canvas/background-canvas.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [SignUpUserComponent, SignInUserComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    BackgroundCanvasModule,
    MatCheckboxModule,
  ],
})
export class UserModule {}
