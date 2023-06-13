import { Component } from '@angular/core';
import { ProfilesSearchService } from '../profiles-search.service';
import { Observable, map, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { TagService } from 'src/app/main-page/profile/tags/tag.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchText: string = '';
  tags: string[] = [];
  myControl = new FormControl('');
  filteredTags: Observable<string[]> = new Observable<string[]>();

  filters = {
    sortByArticlesAsc: false,
    sortByArticlesDesc: false,
    sortByRating: false,
    student: false,
    facultyMember: false,
    faculty: false,
  };
  selectedOption: string = '4';

  constructor(
    private profilesSearchService: ProfilesSearchService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.tagService
      .getAllTags()
      .pipe(map((tags) => tags.body))
      .subscribe((tag) => {
        tag.map((t: any) => {
          this.tags.push(t.text);
        });
        this.filteredTags = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value || ''))
        );
      });

    this.search();
  }

  search() {
    this.profilesSearchService.searchText = this.searchText;

    switch (this.selectedOption) {
      case '1':
        this.filters.sortByArticlesAsc = true;
        break;
      case '2':
        this.filters.sortByArticlesDesc = true;
        break;
      case '3':
        this.filters.sortByRating = true;
        break;
    }

    this.profilesSearchService.selectedTag = this.myControl.value;
    this.profilesSearchService.filters = this.filters;
    this.refresh();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tags.filter((tag) => tag.toLowerCase().startsWith(filterValue));
  }

  // this method will be called to refresh the search results in search service
  // concrete profiles to show will be in the search service, which components will use to display profiles
  refresh() {
    this.profilesSearchService.fetchFilteredProfiles();
  }
}
