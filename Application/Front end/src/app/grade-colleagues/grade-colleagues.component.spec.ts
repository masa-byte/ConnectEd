import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeColleaguesComponent } from './grade-colleagues.component';

describe('GradeColleaguesComponent', () => {
  let component: GradeColleaguesComponent;
  let fixture: ComponentFixture<GradeColleaguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeColleaguesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeColleaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
