import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSearchViewComponent } from './profile-search-view.component';

describe('ProfileSearchViewComponent', () => {
  let component: ProfileSearchViewComponent;
  let fixture: ComponentFixture<ProfileSearchViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSearchViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
