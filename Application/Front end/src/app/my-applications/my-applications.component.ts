import { Component } from '@angular/core';
import { BackgroundService } from '../background.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss'],
})
export class MyApplicationsComponent {
  constructor(public backgroundService: BackgroundService) { }
}
