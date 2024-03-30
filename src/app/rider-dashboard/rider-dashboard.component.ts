import { Component } from '@angular/core';
import { RedirectService } from '../services/redirect/redirect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rider-dashboard',
  templateUrl: './rider-dashboard.component.html',
  styleUrl: './rider-dashboard.component.css',
})
export class RiderDashboardComponent {
  isUser: boolean;
  value: string;
  profileClick: boolean;
  riderClick: boolean = true;
  constructor(private redirect: RedirectService, private router: Router) {}

  ngOnInit() {
    this.value = sessionStorage.getItem('rider-email');
    console.log(this.value);
    const data = this.redirect.getData();
    if (this.value === null) {
      this.isUser = false;
    } else {
      this.isUser = true;
    }
  }

  onClickProfile() {
    this.profileClick = true;
  }

  onClickRider() {
    this.riderClick = true;
  }

  onClickSignout() {
    sessionStorage.removeItem('rider-email');
    //sessionStorage.removeItem('available');
    // Use removeItem instead of setting it to null
    /*  sessionStorage.removeItem('toAddr');
    sessionStorage.removeItem('fromAddr');
    sessionStorage.removeItem('rideId');
    sessionStorage.removeItem('estimatedCost');
    sessionStorage.removeItem('distance');
    sessionStorage.removeItem('clickedBook'); */
    this.router.navigate(['']); // Navigate to the sign-in page
  }
}
