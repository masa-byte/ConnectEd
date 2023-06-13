import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-profile-dialog',
  templateUrl: './delete-profile-dialog.component.html',
  styleUrls: ['./delete-profile-dialog.component.scss'],
})
export class DeleteProfileDialogComponent {
  constructor(private dialogRef: MatDialogRef<DeleteProfileDialogComponent>) { }

  cancelDeletion(): void {
    this.dialogRef.close(false);
  }

  confirmDeletion(): void {
    this.dialogRef.close(true);
  }
}
