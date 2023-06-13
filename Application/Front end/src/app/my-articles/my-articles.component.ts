import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/search/search.service';
import { BackgroundService } from '../background.service';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.scss'],
})
export class MyArticlesComponent {
  constructor(public backgroundService: BackgroundService) { }
}
