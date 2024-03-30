import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../services/auth/user';
import { Router } from '@angular/router';
import { RedirectService } from '../services/redirect/redirect.service';

@Component({
  selector: 'app-login-rider',
  templateUrl: './login-rider.component.html',
  styleUrl: './login-rider.component.css',
})
export class LoginRiderComponent {
  responseMessage: any;
  creationDone: boolean;
  userCreation: boolean;
  responseOtp: any;
  emailSend: boolean;
  verificationDone: boolean;
  otpMatch: boolean;
  changedPass: boolean = false;
  samePassword: boolean;
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

  getValue(email: string, password: string, event: any) {
    event.preventDefault();
    const credentials: User = { user_email: email, user_password: password };

    console.log(credentials);

    this.authService
      .checkRiderExistsLogin(credentials)
      .subscribe((response: any) => {
        const responseBody = JSON.parse(response.body);

        console.log(response);
        this.responseMessage = responseBody.message;
        console.log(this.responseMessage);
        if (this.responseMessage === 'Login successful') {
          this.userCreation = true;
          this.redirect.setData(email);
          sessionStorage.setItem('rider-email', email);
          //console.log(this.user_email);
          //console.log(email);
          this.router.navigate(['/rider-dashboard']);
        } else {
          this.userCreation = false;
        }
      });
  }

  forgotPassword(email: string, event: any) {
    const password = '';
    event.preventDefault();
    this.disableVerify = true;
    this.userCreation = true;
    const credentials: User = { user_email: email, user_password: password };
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
  onClickTick(userCode: number, event: any) {
    event.preventDefault();
    if (userCode == this.responseOtp) {
      this.verificationDone = true;
      this.otpMatch = true;
      this.emailSend = false;
      console.log('verfication done');
    } else {
      this.otpMatch = false;
      console.log('undone');
    }
  }

  changePass(
    email: string,
    password: string,
    rretypepassword: string,
    event: any
  ) {
    event.preventDefault();
    if (password !== rretypepassword) {
      this.samePassword = false;
      return;
    } else {
      this.samePassword = true;
    }

    const credentials: User = { user_email: email, user_password: password };

    this.authService
      .passwordUpdateRider(credentials)
      .subscribe((response: any) => {
        // First, parse the 'body' string into an object
        const responseBody = JSON.parse(response.body);

        this.responseMessage = responseBody.message;
        console.log(this.responseMessage);
        if (this.responseMessage === 'Password Updated') {
          this.changedPass = true;
        }
      });
  }
}
