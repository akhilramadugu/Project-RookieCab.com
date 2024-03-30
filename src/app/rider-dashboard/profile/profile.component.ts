import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { userDetails } from '../../services/auth/userDetails';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email = sessionStorage.getItem('rider-email');
  updateDone: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const userDetails: userDetails = {
      user_email: this.email,
      firstname: this.firstName,
      lastname: this.lastName,
      phonenumber: this.phoneNumber,
    };
    this.authService
      .fetchDetailsRider(userDetails)
      .subscribe((response: any) => {
        const responseBody = JSON.parse(response.body);
        if (responseBody.message === 'Rider details retrieved') {
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
    this.authService
      .updateDetailsRider(userDetails)
      .subscribe((response: any) => {
        const responseBody = JSON.parse(response.body);
        console.log(response);
        console.log(responseBody.message);
        this.updateDone = responseBody.message === 'Details Updated';
      });
  }
}
