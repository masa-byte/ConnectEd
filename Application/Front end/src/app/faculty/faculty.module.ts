import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProfileFacultyComponent } from './create-profile-faculty/create-profile-faculty.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BackgroundCanvasModule } from '../background-canvas/background-canvas.module';

@NgModule({
  declarations: [CreateProfileFacultyComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    BackgroundCanvasModule,
  ],
})
export class FacultyModule { }
