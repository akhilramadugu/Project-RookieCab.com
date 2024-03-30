import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  arrButtons = [true, false, false, false, false, false];

  onClickAbout(){
    this.arrButtons[0] = true;
    for (let i = 0; i < 6; i++){
      if (i == 0){
        continue;
      } else{
        this.arrButtons[i] = false;
      }
    }
  }

  onClickContact(){
    this.arrButtons[1] = true;
    for (let i = 0; i < 6; i++){
      if (i == 1){
        continue;
      } else{
        this.arrButtons[i] = false;
      }
    }
  }

  onClickLoginUser(){
    this.arrButtons[2] = true;
    for (let i = 0; i < 6; i++){
      if (i == 2){
        continue;
      } else{
        this.arrButtons[i] = false;
      }
    }
  }

  onClickSignupUser(){
    this.arrButtons[3] = true;
    for (let i = 0; i < 6; i++){
      if (i == 3){
        continue;
      } else{
        this.arrButtons[i] = false;
      }
    }
  }

  onClickLoginRider(){
    this.arrButtons[4] = true;
    for (let i = 0; i < 6; i++){
      if (i == 4){
        continue;
      } else{
        this.arrButtons[i] = false;
      }
    }
  }

  onClickSignupRider(){
    this.arrButtons[5] = true;
    for (let i = 0; i < 6; i++){
      if (i == 5){
        continue;
      } else{
        this.arrButtons[i] = false;
      }
    }
  }


  /* clickLogin = false;

  onClickLogin(){
    this.clickLogin = true;
  } */

}
