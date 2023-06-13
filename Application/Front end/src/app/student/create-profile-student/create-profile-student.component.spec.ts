import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfileStudentComponent } from './create-profile-student.component';

describe('CreateProfileStudentComponent', () => {
  let component: CreateProfileStudentComponent;
  let fixture: ComponentFixture<CreateProfileStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProfileStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProfileStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
