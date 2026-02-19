import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Claim } from '../../models/claim.model';
import { ClaimsService } from '../../services/claims.service';
import { FormsModule } from '@angular/forms';
import { CreateDamageModalComponent } from '../../components/create-damage-modal/create-damage-modal';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-claims-details',
  standalone: true,
  imports: [CommonModule, RouterLink, CreateDamageModalComponent, FormsModule],
  templateUrl: './claims-details.html',
  styleUrl: './claims-details.scss',
})
export class ClaimsDetailsComponent implements OnInit {
  claimId: string | null = null;
  claim = signal<Claim | undefined>(undefined);
  showCreateModal = signal(false);
  availableStatuses = ['pending', 'in-review', 'finished'];

  hasHighSeverityDamage = computed(() => {
    return this.claim()?.damages?.some(d => d.severity === 'high') ?? false;
  });

  private claimsService = inject(ClaimsService);
  private route = inject(ActivatedRoute)
  private dialog = inject(Dialog);

  ngOnInit(): void {
    this.claimId = this.route.snapshot.paramMap.get('claimId');

    if (this.claimId) {
      this.getClaimDetails();
    }
  }

  getStatusClass(status: string | undefined): string {
    if (!status) return '';
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'finished': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'in-review': return 'bg-blue-50 text-blue-600 border-blue-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  }

  getStatusTag(status: string) {
    switch (status) {
      case 'pending': return 'Pending';
      case 'finished': return 'Finished';
      case 'in-review': return 'In review';
      default: return ''
    }
  }

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'high': return 'bg-rose-50 text-rose-600 border-rose-200';
      case 'mid': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'low': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  }

  getClaimDetails() {
    if (!this.claimId) return;

    this.claimsService.getClaimDetails(this.claimId).subscribe({
      next: (data) => {
        const creationDate = new Date(data.createdAt);
        data.createdAt = creationDate.toDateString();
        this.claim.set(data);
        console.log(data)
      },
      error: (err) => console.log(err)
    })
  }

  openCreateDamageDialog() {
    const dialogRef = this.dialog.open(CreateDamageModalComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.closed.subscribe(output => {
      if (!output) {
        return;
      }

      this.onCreateDamage(output);
    });
  }

  onCreateDamage(damageData: any) {
    if (!this.claimId) return;

    const claim = this.claim();

    if (this.hasHighSeverityDamage() && (claim?.description?.length ?? 0) < 100) {
      console.log('To add high severity damages description must be at least 100 characters long');
      return;
    }

    this.claimsService.addDamage(this.claimId, damageData).subscribe({
      next: () => {
        this.showCreateModal.set(false);
        this.getClaimDetails();
      },
      error: (err) => console.error('Error creating damage:', err)
    });
  }

  onStatusChange(newStatus: string): void {
    if (!this.claimId) return;

    if (newStatus === 'finished' && this.hasHighSeverityDamage()) {
      console.log('high severity damage on course')
      return;
    }

    this.claimsService.updateClaimStatus(this.claimId, newStatus).subscribe({
      next: () => this.getClaimDetails(),
      error: (err) => console.error('Error updating status:', err)
    });
  }
}
