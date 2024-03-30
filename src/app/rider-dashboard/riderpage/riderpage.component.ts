import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Ride } from '../../services/auth/ride';
import { Rider } from '../../services/auth/rider';

@Component({
  selector: 'app-riderpage',
  templateUrl: './riderpage.component.html',
  styleUrl: './riderpage.component.css',
})
export class RiderpageComponent {
  clickedAvailable: boolean = false;
  clickedDone: boolean = true;
  rides: Ride[] = [];
  email = sessionStorage.getItem('rider-email');
  verfiedRider: boolean;

  ngOnInit() {
    const rider: Rider = {
      user_email: this.email,
    };
    this.authService.checkRider(rider).subscribe((response: any) => {
      const responseBody = JSON.parse(response.body);
      console.log(responseBody.message);
      if (responseBody.message === 'Rider already available') {
        this.clickedAvailable = true;
        this.verfiedRider = true;
      } else {
        this.clickedAvailable = false;
        this.verfiedRider = false;
      }
    });
  }

  constructor(private authService: AuthService) {}

  onClickAvailable() {
    this.clickedAvailable = true;
    const rider: Rider = {
      user_email: this.email,
    };
    this.authService.addRider(rider).subscribe((response: any) => {
      const responseBody = JSON.parse(response.body);
      console.log(responseBody.message);
      this.verfiedRider = true;
    });
  }

  onClickDone() {
    this.clickedAvailable = false;
    const rider: Rider = {
      user_email: this.email,
    };
    this.authService.removeRider(rider).subscribe((response: any) => {
      const responseBody = JSON.parse(response.body);
      console.log(responseBody.message);
      this.verfiedRider = false;
    });
  }

  /* lockRide(rideId: number): void {
    console.log('Locking ride with ID:', rideId);
    
  } */
}
