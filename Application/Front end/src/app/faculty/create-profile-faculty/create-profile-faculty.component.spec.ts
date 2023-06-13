import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfileFacultyComponent } from './create-profile-faculty.component';

describe('CreateProfileFacultyComponent', () => {
  let component: CreateProfileFacultyComponent;
  let fixture: ComponentFixture<CreateProfileFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProfileFacultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProfileFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
