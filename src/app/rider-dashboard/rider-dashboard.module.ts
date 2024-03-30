import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RiderDashboardRoutingModule } from './rider-dashboard-routing.module';
import { RiderDashboardComponent } from './rider-dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RiderpageComponent } from './riderpage/riderpage.component';
import { AvailableRidesComponent } from './riderpage/available-rides/available-rides.component';

@NgModule({
  declarations: [RiderDashboardComponent, ProfileComponent, RiderpageComponent, AvailableRidesComponent],
  imports: [CommonModule, RiderDashboardRoutingModule, FormsModule],
})
export class RiderDashboardModule {}
