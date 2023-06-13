import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaperFormComponent } from './paper-form/paper-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BackgroundCanvasModule } from '../background-canvas/background-canvas.module';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [PaperFormComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    BackgroundCanvasModule,
    MatSnackBarModule,
  ],
})
export class PaperModule { }
