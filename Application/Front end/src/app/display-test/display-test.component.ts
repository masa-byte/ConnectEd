import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { Test } from '../project/test/test.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountdownTimerService } from '../countdown-timer/countdown-timer.service';
import { Subscription, count } from 'rxjs';

@Component({
  selector: 'app-display-test',
  templateUrl: './display-test.component.html',
  styleUrls: ['./display-test.component.scss'],
})
export class DisplayTestComponent implements OnDestroy {
  questionFormGroup!: FormGroup;
  submited: boolean = true;
  @Output() testSuccess = new EventEmitter<boolean>();
  timerSubscription!: Subscription;

  get questions() {
    return this.questionFormGroup.get('questions') as FormArray;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private countdownTimerService: CountdownTimerService,
    private matDialogRef: MatDialogRef<DisplayTestComponent>,
    @Inject(MAT_DIALOG_DATA) public test: Test
  ) {
    this.questionFormGroup = this._formBuilder.group({
      questions: this._formBuilder.array([]),
    });
    for (let qu of this.test.questions) {
      this.addQuestion(qu.text);
    }
    this.timerSubscription = this.countdownTimerService.countSubject.subscribe(
      (secondsLeft) => {
        if (secondsLeft == 0) {
          this.openSnackBar('Time is up, you failed the test.');
          this.testSuccess.emit(false);
          this.matDialogRef.close();
        }
      }
    );
  }

  addQuestion(text: string) {
    this.questions.push(
      this._formBuilder.group({
        text: [text],
        answer: ['', Validators.required],
      })
    );
  }

  submitTest() {
    let points = 0;
    for (let i = 0; i < this.questions.length; i++) {
      let question = this.questions.at(i);
      if (
        question.get('answer')?.value ==
        this.test.questions[i].correctAnswerIndex
      ) {
        points += this.test.questions[i].points;
      }
    }
    let ptsToPass = this.test.questions.reduce((a, b) => a + b.points, 0) / 2;
    if (points >= ptsToPass) {
      this.testSuccess.emit(true);
    } else {
      this.openSnackBar('Test failed, application unsuccesfull.');
      this.testSuccess.emit(false);
    }
    this.submited = true;
  }

  cancel() {
    this.openSnackBar('Test canceled, you can try again later.');
    this.testSuccess.emit(false);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
    });
  }

  ngOnDestroy(): void {
    if (!this.submited) this.cancel();
    this.timerSubscription.unsubscribe();
  }
}
