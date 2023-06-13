import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTestComponent } from './display-test.component';

describe('DisplayTestComponent', () => {
  let component: DisplayTestComponent;
  let fixture: ComponentFixture<DisplayTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
