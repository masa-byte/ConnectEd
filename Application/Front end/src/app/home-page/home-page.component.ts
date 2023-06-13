import { Component } from '@angular/core';
import { BackgroundService } from '../background.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  constructor(public backgroundService: BackgroundService) { }
}
