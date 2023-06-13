import { Component, Input } from '@angular/core';
import { SearchService } from 'src/app/search/search.service';

@Component({
  selector: 'app-display-articles',
  templateUrl: './display-articles.component.html',
  styleUrls: ['./display-articles.component.scss'],
  providers: [SearchService],
})
export class DisplayArticlesComponent {
  articlesToDisplay: any[] = [];
  @Input() isMyArticles: boolean = false;
  @Input() isMyApplications: boolean = false;
  @Input() isMySubscriptions: boolean = false;
  @Input() isViewProfile: boolean = false;
  @Input() isGuest: boolean = false;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.myArticles = this.isMyArticles;
    this.searchService.myApplications = this.isMyApplications;
    this.searchService.viewProfile = this.isViewProfile;
    this.searchService.mySubscriptions = this.isMySubscriptions;

    this.searchService.invokeSearch.subscribe(() => {
      this.articlesToDisplay = this.searchService.filteredArticles;
    });
  }
}
