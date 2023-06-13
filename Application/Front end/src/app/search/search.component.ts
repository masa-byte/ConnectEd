import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { SearchService } from './search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchText: string = '';
  @Input() isViewProfile: boolean = false;
  @Input() isGuest: boolean = false;

  filters = {
    sortByApplicantsAsc: false,
    sortByApplicantsDesc: false,
    sortByCreatorRating: false,
    uploadToday: false,
    uploadThisWeek: false,
    uploadThisMonth: false,
    articleBook: false,
    articlePaper: false,
    articleProject: false
  }
  selectedOption: string = '4';

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.search();
  }

  search() {

    this.searchService.searchText = this.searchText;

    switch (this.selectedOption) {
      case '1': this.filters.sortByApplicantsAsc = true; break;
      case '2': this.filters.sortByApplicantsDesc = true; break;
      case '3': this.filters.sortByCreatorRating = true; break;
    }

    this.searchService.filters = this.filters;
    this.refresh();
  }

  // this method will be called to refresh the search results in search service
  // concrete articles to show will be in the seach service, which components will use to display articles
  refresh() {
    this.searchService.fetchFilteredArticles();
  }

}
