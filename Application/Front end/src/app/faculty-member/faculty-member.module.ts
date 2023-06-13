import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProfileFacultyMemberComponent } from './create-profile-faculty-member/create-profile-faculty-member.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BackgroundCanvasModule } from '../background-canvas/background-canvas.module';

@NgModule({
  declarations: [CreateProfileFacultyMemberComponent],
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
export class FacultyMemberModule { }
