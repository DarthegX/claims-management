import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from '../models/claim.model';
import { Damage } from '../models/damage.model';

export const API_BASE_RUL = "http://localhost:3000"

@Injectable({
  providedIn: 'root',
})
export class ClaimsService {
  private http = inject(HttpClient);

  getClaims(): Observable<Claim[]> {
    return this.http.get<Claim[]>(API_BASE_RUL + '/claims');
  }

  getClaimDetails(claimId: string): Observable<Claim> {
    return this.http.get<Claim>(API_BASE_RUL + '/claims/' + claimId)
  }

  createClaim(claim: { title: string; description: string }): Observable<Claim> {
    return this.http.post<Claim>(API_BASE_RUL + '/claims', claim);
  }

  addDamage(claimId: string, damage: Damage): Observable<Claim> {
    return this.http.post<Claim>(API_BASE_RUL + `/claims/${claimId}/damages`, damage);
  }

  updateClaimStatus(claimId: string, status: string): Observable<void> {
    return this.http.patch<void>(API_BASE_RUL + `/claims/${claimId}/status`, { status });
  }
}
