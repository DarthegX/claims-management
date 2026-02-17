import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Claim } from '../../models/claim.model';
import { ClaimCard } from '../../components/claim-card/claim-card';

@Component({
  selector: 'app-claims-view',
  standalone: true,
  imports: [CommonModule, RouterLink, ClaimCard],
  templateUrl: './claims-view.html',
  styleUrl: './claims-view.scss',
})
export class ClaimsViewComponent {
  claims: Claim[] = [
    {
      id: '0002',
      title: 'Hail Damage Request',
      description: 'Vehicle suffered damage during a recent hailstorm.',
      status: 'Pending',
      date: 'Feb 12, 2026',
      reportedDamagesCount: 2,
      totalImpact: 0,
    },
    {
      id: '0003',
      title: 'Rear End Collision',
      description: 'Customer reported a minor rear-end collision at a traffic light.',
      status: 'Finished',
      date: 'Feb 11, 2026',
      reportedDamagesCount: 1,
      totalImpact: 850,
    },
    {
      id: '0001',
      title: 'Front Bumper Collision',
      description: 'Customer reported collision with a pole in the parking lot.',
      status: 'In review',
      date: 'Feb 10, 2026',
      reportedDamagesCount: 2,
      totalImpact: 1650,
    }
  ];


}
