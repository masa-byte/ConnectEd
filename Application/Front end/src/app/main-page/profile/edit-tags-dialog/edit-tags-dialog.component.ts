import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { TagService } from '../tags/tag.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-tags-dialog',
  templateUrl: './edit-tags-dialog.component.html',
  styleUrls: ['./edit-tags-dialog.component.scss'],
})
export class EditTagsDialogComponent implements OnInit {
  tags: any[] = [];
  addedTags: any[] = [];
  deletedTags: any[] = [];

  typeOfProfile: string = '';
  profileId: number = 0;

  formControl = new FormControl(['angular']);

  constructor(
    private tagService: TagService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditTagsDialogComponent>
  ) { }

  ngOnInit(): void {
    this.tags = this.data.tags;
    this.typeOfProfile = this.data.typeOfProfile;
    this.profileId = this.data.profileId;
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (
      value &&
      !this.tags.map((tags) => tags.text).includes(value) &&
      !this.addedTags.includes(value)
    ) {
      this.tags.push(value);
      this.addedTags.push(value);
    }

    event.chipInput!.clear();
  }

  deleteTag(tag: any) {
    const index1 = this.tags.indexOf(tag);
    if (index1 >= 0) {
      this.tags.splice(index1, 1);
      if (this.addedTags.includes(tag.text != undefined ? tag.text : tag)) {
        const index2 = this.addedTags.indexOf(tag);
        if (index2 >= 0) this.addedTags.splice(index2, 1);
      } else this.deletedTags.push(tag);
    }
  }

  onSaveTags() {
    this.addedTags.forEach((tag) => {
      this.tagService
        .addTag(tag, this.typeOfProfile, this.profileId)
        .subscribe();
    });

    this.deletedTags.forEach((tag) => {
      this.tagService.removeTag(tag.id).subscribe();
    });

    this.addedTags = [];
    this.deletedTags = [];
    this.dialogRef.close();
  }

  onCancel() {
    this.addedTags = [];
    this.deletedTags = [];
    this.dialogRef.close();
  }
}
