import { Component } from '@angular/core';
import { RedirectService } from '../services/redirect/redirect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isUser: boolean;
  value: string;
  btnsClicked = [true, false, false, false];
  constructor(private redirect: RedirectService, private router: Router) {}

  onClickBookRide() {
    this.btnsClicked[0] = true;
    for (let i = 0; i < 4; i++) {
      if (i === 0) {
        continue;
      } else {
        this.btnsClicked[i] = false;
      }
    }
  }

  onClickRideHistory() {
    this.btnsClicked[2] = true;
    for (let i = 0; i < 4; i++) {
      if (i === 2) {
        continue;
      } else {
        this.btnsClicked[i] = false;
      }
    }
  }

  onClickProfile() {
    this.btnsClicked[1] = true;
    for (let i = 0; i < 4; i++) {
      if (i === 1) {
        continue;
      } else {
        this.btnsClicked[i] = false;
      }
    }
  }

  onClickSignout() {
    sessionStorage.removeItem('email'); // Use removeItem instead of setting it to null
    sessionStorage.removeItem('toAddr');
    sessionStorage.removeItem('fromAddr');
    sessionStorage.removeItem('rideId');
    sessionStorage.removeItem('estimatedCost');
    sessionStorage.removeItem('distance');
    sessionStorage.removeItem('clickedBook');
    this.router.navigate(['']); // Navigate to the sign-in page
  }

  ngOnInit() {
    this.value = sessionStorage.getItem('email');
    console.log(this.value);
    const data = this.redirect.getData();
    if (this.value === null) {
      this.isUser = false;
    } else {
      this.isUser = true;
    }
  }
}
