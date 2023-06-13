import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BackgroundService } from 'src/app/background.service';

@Component({
  selector: 'app-guest-nav',
  templateUrl: './guest-nav.component.html',
  styleUrls: ['./guest-nav.component.scss'],
})
export class GuestNavComponent implements OnInit {
  timeoutId: any;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    public backgroundService: BackgroundService
  ) { }

  ngOnInit(): void {
    this.timeoutId = setTimeout(() => {
      this.openSnackBar(
        'You are not logged in. Please sign in or sign up to continue!'
      );
      this.router.navigate(['/signUpUser']);
    }, 60000);
  }

  signIn() {
    clearTimeout(this.timeoutId);
    this.router.navigate(['/signInUser']);
  }

  signUp() {
    clearTimeout(this.timeoutId);
    this.router.navigate(['/signUpUser']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Okay', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
