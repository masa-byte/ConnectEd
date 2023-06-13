import { Component } from '@angular/core';
import { BackgroundService } from '../background.service';

@Component({
  selector: 'app-guest-home-page',
  templateUrl: './guest-home-page.component.html',
  styleUrls: ['./guest-home-page.component.scss'],
})
export class GuestHomePageComponent {
  constructor(public backgroundService: BackgroundService) { }
}
