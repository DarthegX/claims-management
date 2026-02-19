import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-create-claim-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-claim.modal.html',
  styleUrl: './create-claim.modal.scss'
})
export class CreateClaimModalComponent {
  title = '';
  description = '';

  public data = inject(DIALOG_DATA);
  public dialogRef = inject(DialogRef);

  isValid(): boolean {
    return this.title.trim().length > 0 && this.description.trim().length > 0;
  }

  submit(): void {
    console.log(this.title)
    if (this.isValid()) {
      this.dialogRef.close({ title: this.title, description: this.description })
    }
  }
}
