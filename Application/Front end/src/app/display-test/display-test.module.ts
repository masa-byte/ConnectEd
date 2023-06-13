import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DisplayTestComponent } from './display-test.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { CountdownTimerModule } from '../countdown-timer/countdown-timer.module';

@NgModule({
  declarations: [DisplayTestComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    CountdownTimerModule,
  ],
  exports: [DisplayTestComponent],
})
export class DisplayTestModule { }
