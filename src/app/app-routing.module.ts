// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: HeaderComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'rider-dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./rider-dashboard/rider-dashboard.module').then(
        (m) => m.RiderDashboardModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
