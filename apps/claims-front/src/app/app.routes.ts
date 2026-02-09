import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimListComponent } from './pages/claim-list/claim-list.component';

export const routes: Routes = [
    {
        path: 'claims-list',
        component: ClaimListComponent,
    },
    {
        path: '',
        redirectTo: 'claims-list',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'claims-list',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
