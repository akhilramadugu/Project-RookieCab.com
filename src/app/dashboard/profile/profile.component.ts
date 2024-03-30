import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { userDetails } from '../../services/auth/userDetails';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'], // Changed from 'styleUrl' to 'styleUrls'
})
export class ProfileComponent implements OnInit {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email = sessionStorage.getItem('email');
  updateDone: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const userDetails: userDetails = {
      user_email: this.email,
      firstname: this.firstName,
      lastname: this.lastName,
      phonenumber: this.phoneNumber,
    };
    this.authService.fetchDetails(userDetails).subscribe((response: any) => {
      const responseBody = JSON.parse(response.body);
      if (responseBody.message === 'User details retrieved') {
        this.firstName = responseBody.firstname;
        this.lastName = responseBody.lastname;
        this.phoneNumber = responseBody.phoneNumber;
      }
    });
  }

  onSubmit(event: any) {
    event.preventDefault();
    const userDetails: userDetails = {
      user_email: this.email,
      firstname: this.firstName,
      lastname: this.lastName,
      phonenumber: this.phoneNumber,
    };
    this.authService.updateDetails(userDetails).subscribe((response: any) => {
      const responseBody = JSON.parse(response.body);
      console.log(response);
      console.log(responseBody.message);
      this.updateDone = responseBody.message === 'Details Updated';
    });
  }
}
