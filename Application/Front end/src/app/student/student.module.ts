import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProfileStudentComponent } from './create-profile-student/create-profile-student.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BackgroundCanvasModule } from '../background-canvas/background-canvas.module';

@NgModule({
  declarations: [CreateProfileStudentComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    BackgroundCanvasModule,
  ],
})
export class StudentModule {}
