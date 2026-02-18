import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Damage } from '../../models/damage.model';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-create-damage-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-damage.modal.html',
  styleUrl: './create-damage.modal.scss'
})
export class CreateDamageModalComponent {
  damage: Partial<Damage> = {
    part: '',
    severity: 'low',
    price: 0,
    imageURL: ''
  };

  public data = inject(DIALOG_DATA);
  public dialogRef = inject(DialogRef);

  isValid(): boolean {
    return !!(
      this.damage.part?.trim() &&
      this.damage.severity &&
      this.damage.price && this.damage.price > 0 &&
      this.damage.imageURL?.trim()
    );
  }

  submit(): void {
    if (this.isValid()) {
      this.dialogRef.close(this.damage as Damage);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
