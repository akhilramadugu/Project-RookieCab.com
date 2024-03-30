import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BookrideComponent } from './bookride/bookride.component';
import { RidehistoryComponent } from './ridehistory/ridehistory.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BookrideComponent,
    RidehistoryComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, FormsModule],
})
export class DashboardModule {}
