import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Claim } from '../../models/claim.model';
import { ClaimCard } from '../../components/claim-card/claim-card';
import { ClaimsService } from '../../services/claims.service';
import { CreateClaimModalComponent } from '../../components/create-claim-modal/create-claim.modal';
import { Dialog, DialogModule } from '@angular/cdk/dialog';

@Component({
  selector: 'app-claims-view',
  standalone: true,
  imports: [CommonModule, RouterLink, DialogModule, ClaimCard, CreateClaimModalComponent],
  templateUrl: './claims-view.html',
  styleUrl: './claims-view.scss',
})
export class ClaimsViewComponent implements OnInit {
  claims = signal<Claim[]>([]);
  showCreateModal = signal(false);

  private claimsService = inject(ClaimsService);
  private dialog = inject(Dialog);

  ngOnInit(): void {
    this.refreshClaims();
  }

  refreshClaims(): void {
    this.claimsService.getClaims().subscribe({
      next: (data) => this.claims.set(data),
      error: (err) => console.error('Error fetching claims:', err)
    });
  }

  openCreateClaimDialog() {
    const dialogRef = this.dialog.open(CreateClaimModalComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.closed.subscribe(output => {
      if (!output) {
        return;
      }

      this.onCreateClaim(output);
    });
  }

  onCreateClaim(claimData: any): void {
    this.claimsService.createClaim(claimData).subscribe({
      next: () => {
        this.showCreateModal.set(false);
        this.refreshClaims();
      },
      error: (err) => console.error('Error creating claim:', err)
    });
  }
}
