import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Claim, Damage } from '../../models/claim.model';

@Component({
  selector: 'app-claims-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './claims-details.html',
  styleUrl: './claims-details.scss',
})
export class ClaimsDetailsComponent implements OnInit {
  claimId: string | null = null;
  claim: Claim | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.claimId = this.route.snapshot.paramMap.get('claimId');
    // Mocking finding the claim, normally this would be a service call
    if (this.claimId) {
      this.claim = {
        id: this.claimId,
        title: 'Front Bumper Collision',
        description: 'Customer reported collision with a pole in the parking lot.',
        status: 'In review',
        date: 'Feb 10, 2026',
        reportedDamagesCount: 2,
        totalImpact: 1650,
        damages: [
          {
            part: 'Front Bumper',
            severity: 'HIGH',
            evidenceUrl: '#',
            estimatedCost: 1200
          },
          {
            part: 'Headlight (Left)',
            severity: 'MID',
            evidenceUrl: '#',
            estimatedCost: 450
          }
        ]
      };
    }
  }

  getStatusClass(status: string | undefined): string {
    if (!status) return '';
    switch (status) {
      case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Finished': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'In review': return 'bg-blue-50 text-blue-600 border-blue-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  }

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'HIGH': return 'bg-rose-50 text-rose-600 border-rose-200';
      case 'MID': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'LOW': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  }
}
