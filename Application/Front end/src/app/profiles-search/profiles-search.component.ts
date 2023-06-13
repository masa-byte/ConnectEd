import { Component } from '@angular/core';
import { ProfilesSearchService } from './profiles-search.service';
import { BackgroundService } from '../background.service';

@Component({
  selector: 'app-profiles-search',
  templateUrl: './profiles-search.component.html',
  styleUrls: ['./profiles-search.component.scss'],
  providers: [ProfilesSearchService],
})
export class ProfilesSearchComponent {
  profilesToDisplay: any[] = [];

  constructor(
    private profileSearchService: ProfilesSearchService,
    public backgroundService: BackgroundService
  ) {}

  ngOnInit(): void {
    this.profileSearchService.invokeSearch.subscribe(() => {
      this.profilesToDisplay = this.profileSearchService.filteredProfiles;
    });
  }
}
