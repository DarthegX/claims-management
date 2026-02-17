import { Routes } from '@angular/router';
import { ClaimsViewComponent } from './pages/claims-view/claims-view';
import { ClaimsDetailsComponent } from './pages/claims-details/claims-details';

export const routes: Routes = [
    { path: '', redirectTo: 'claims', pathMatch: 'full' },
    { path: 'claims', component: ClaimsViewComponent },
    { path: 'claims/:claimId', component: ClaimsDetailsComponent },
    { path: '**', redirectTo: 'claims' }
];
