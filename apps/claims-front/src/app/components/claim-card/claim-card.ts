import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Claim } from '../../models/claim.model';

@Component({
  selector: 'app-claim-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './claim-card.html',
  styleUrl: './claim-card.scss',
})
export class ClaimCard {
  @Input({ required: true }) claim!: Claim;

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Finished': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'In review': return 'bg-blue-50 text-blue-600 border-blue-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  }
}

