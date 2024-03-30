import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../services/auth/user';
import { Router } from '@angular/router';
import { RedirectService } from '../services/redirect/redirect.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  user_email = '';
  user_password = '';
  responseMessage: string;
  responseCode: number;
  samePassword: boolean = true;
  userExists: boolean = false;
  emailSend: boolean = false;
  otpMatch: boolean;
  responseMessageExists: string;
  verificationDone: boolean = false;
  creationDone: boolean = false;
  responseOtp: number;
  disableVerify: boolean;
  showPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private redirect: RedirectService
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onClickVerify(
    email: string,
    password: string,
    retypepassword: string,
    event: any
  ) {
    event.preventDefault();
    this.disableVerify = true;
    if (password !== retypepassword) {
      this.samePassword = false;
      this.disableVerify = false;
      return;
    } else {
      this.samePassword = true;
    }
    const credentials: User = { user_email: email, user_password: password };

    this.authService.checkUserExists(credentials).subscribe((response: any) => {
      this.responseMessageExists = response.message;
      if (
        this.responseMessageExists === 'User already exists with this username'
      ) {
        //console.log('here in if block');
        this.userExists = true;
        this.disableVerify = false;
        return;
      } else {
        this.userExists = false;
        this.anotherFunction(credentials);
      }
      //console.log(this.userExists);
    });
    //const credential: User = { user_email: email, user_password: password };
  }

  anotherFunction(credentials: User) {
    if (this.userExists === false) {
      //console.log('here');
      //console.log(this.userExists);
      this.authService.signupOpt(credentials).subscribe(
        (response: any) => {
          try {
            // First, parse the 'body' string into an object
            const responseBody = JSON.parse(response.body);

            this.responseOtp = responseBody.code;
            console.log(this.responseOtp);

            if ((responseBody.message = 'Email sent successfully!')) {
              this.emailSend = true;
            }
          } catch (e) {
            console.error('Error parsing the response body:', e);
          }
        },
        (error) => {
          console.error('API error:', error);
        }
      );
    }
  }

  onClickTick(userCode: number, event: any) {
    event.preventDefault();
    if (userCode == this.responseOtp) {
      this.verificationDone = true;
      this.otpMatch = true;
      console.log('verfication done');
    } else {
      this.otpMatch = false;
      console.log('undone');
    }
  }

  getValue(
    email: string,
    password: string,
    retypepassword: string,
    event: Event
  ) {
    event.preventDefault();

    const credentials: User = { user_email: email, user_password: password };

    this.authService.createUser(credentials).subscribe((response: any) => {
      const responseBody = JSON.parse(response.body);

      this.responseMessage = responseBody.message;
      console.log(this.responseMessage);
      if (this.responseMessage === 'User Created') {
        this.creationDone = true;
        sessionStorage.setItem('email', email);
        this.redirect.setData(email);
        //console.log(this.user_email);
        //console.log(email);
        this.router.navigate(['/dashboard']);
      }
    });
  }
}
