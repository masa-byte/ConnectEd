import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTagsDialogComponent } from './edit-tags-dialog.component';

describe('EditTagsDialogComponent', () => {
  let component: EditTagsDialogComponent;
  let fixture: ComponentFixture<EditTagsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTagsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTagsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
