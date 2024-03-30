import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Ride } from '../../services/auth/ride';

@Component({
  selector: 'app-ridehistory',
  templateUrl: './ridehistory.component.html',
  styleUrl: './ridehistory.component.css',
})
export class RidehistoryComponent {
  currentUser = sessionStorage.getItem('email');
  rideHistory: any;

  constructor(private authService: AuthService) {
    if (this.currentUser !== null) {
      //const tempid = 0;
      const Details: Ride = {
        user_email: this.currentUser,
        toAddress: '',
        fromAddress: '',
        resolved: '',
        dateandtime: '',
        rideid: '',
      };
      this.authService.getRideHistory(Details).subscribe((response: any) => {
        // First, parse the 'body' string into an object
        const responseBody = JSON.parse(response.body);

        /* console.log(response);
        console.log(responseBody.rideHistory); */
        this.rideHistory = responseBody.rideHistory;
      });
    }
  }
}
