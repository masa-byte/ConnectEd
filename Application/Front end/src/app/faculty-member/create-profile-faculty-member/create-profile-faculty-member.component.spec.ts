import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfileFacultyMemberComponent } from './create-profile-faculty-member.component';

describe('CreateProfileFacultyMemberComponent', () => {
  let component: CreateProfileFacultyMemberComponent;
  let fixture: ComponentFixture<CreateProfileFacultyMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProfileFacultyMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProfileFacultyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
