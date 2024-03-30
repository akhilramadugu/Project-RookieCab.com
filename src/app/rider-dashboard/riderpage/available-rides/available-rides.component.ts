import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Rider } from '../../../services/auth/rider';
import { Rideinfo } from '../../../services/auth/rideinfo';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-available-rides',
  templateUrl: './available-rides.component.html',
  styleUrl: './available-rides.component.css',
  providers: [DatePipe],
})
export class AvailableRidesComponent {
  email = sessionStorage.getItem('rider-email');
  rides = [];
  lockedRides = [];
  actualRides: any;
  zeroRides: boolean;
  keyvalueRides: any;
  displayMessage: boolean;
  messageDisplay: { [key: number]: boolean } = {};
  userDetails: any;
  displayMessageText: string;

  constructor(private authService: AuthService, private datePipe: DatePipe) {}

  ngOnInit() {
    const rideinfo: Rideinfo = {
      rider_email: this.email,
      ride_id: 0,
    };
    this.authService.getLockedRides(rideinfo).subscribe((response: any) => {
      const responseBody = JSON.parse(response.body);
      this.lockedRides = responseBody.lockedRides;
      this.lockedRides = responseBody.lockedRides.map(
        (ride: any) => ride.rideid
      );
      this.keyvalueRides = responseBody.lockedRides.reduce(
        (acc: any, ride: any) => {
          acc[ride.rideid] = ride.rider_email;
          return acc;
        },
        {}
      );
      console.log(this.keyvalueRides);
    });
    const rider: Rider = {
      user_email: this.email,
    };
    this.authService.trailRider(rider).subscribe((response: any) => {
      const responseBody = JSON.parse(response.body);
      console.log(responseBody);
      this.rides = responseBody.rideHistory;
      if (this.rides.length === 0) {
        this.zeroRides = true;
      } else {
        this.zeroRides = false;
        this.rides.sort(
          (a, b) =>
            new Date(b.dateAndTime).getTime() -
            new Date(a.dateAndTime).getTime()
        );
        this.actualRides = this.rides.map((ride) => {
          ride.dateAndTime =
            this.datePipe.transform(ride.dateAndTime, 'fullDate') +
            ' at ' +
            this.datePipe.transform(ride.dateAndTime, 'shortTime');
          return ride;
        });
      }
    });
  }

  lockRide(rideid: any) {
    const rideinfo: Rideinfo = {
      rider_email: this.email,
      ride_id: rideid,
    };
    this.authService.lockRide(rideinfo).subscribe((response: any) => {
      const responseBody = JSON.parse(response.body);
      if (
        responseBody.message === 'Ride already locked.' &&
        this.keyvalueRides[rideid] === this.email
      ) {
        this.messageDisplay[rideid] = true;
        this.authService
          .fetchUserDetails(rideinfo)
          .subscribe((response: any) => {
            const responseBody = JSON.parse(response.body);
            this.userDetails = responseBody.userDetails;
            this.displayMessageText = `Ride requested by ${this.userDetails.firstname} ${this.userDetails.lastname} with ${this.userDetails.email} as email and ${this.userDetails.phoneNumber} as phone number. This lock will get released soon so contact the user and make sure they resolve the ride.`;
          });
      } else if (responseBody.message === 'Ride locked successfully.') {
        this.messageDisplay[rideid] = true;
        this.authService
          .fetchUserDetails(rideinfo)
          .subscribe((response: any) => {
            const responseBody = JSON.parse(response.body);
            this.userDetails = responseBody.userDetails;
            this.displayMessageText = `Ride requested by ${this.userDetails.firstname} ${this.userDetails.lastname} with ${this.userDetails.email} as email and ${this.userDetails.phoneNumber} as phone number. This lock will get released soon so contact the user and make sure they resolve the ride.`;
          });
      } else {
        this.messageDisplay[rideid] = false;
      }
    });
  }
}
