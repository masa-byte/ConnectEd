import { Component, OnInit } from '@angular/core';
import { BackgroundService } from '../background.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(public backgroundService: BackgroundService) { }

  ngOnInit(): void {
    const rememberMe = localStorage.getItem('rememberMe');

    if (rememberMe == 'false') {
      setTimeout(() => {
        localStorage.removeItem('userId');
      }, 3600000);
    }
  }
}
