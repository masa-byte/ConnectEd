import { Component } from '@angular/core';
import { BackgroundService } from '../background.service';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.scss'],
})
export class MySubscriptionsComponent {
  constructor(public backgroundService: BackgroundService) { }
}
