import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { ProfilesSearchComponent } from './profiles-search.component';
import { BackgroundCanvasModule } from '../background-canvas/background-canvas.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProfileSearchViewComponent } from './profile-search-view/profile-search-view.component';
import { MatCardModule } from '@angular/material/card';
import { DirectivesModule } from '../directives/directives.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    ProfilesSearchComponent,
    SearchBarComponent,
    ProfileSearchViewComponent,
  ],
  imports: [
    CommonModule,
    BackgroundCanvasModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    DirectivesModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
})
export class ProfilesSearchModule {}
