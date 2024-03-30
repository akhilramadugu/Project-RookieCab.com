import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  private user_name: string = '';

  setData(data: string) {
    this.user_name = data;
  }

  getData() {
    return this.user_name;
  }

  constructor() {}
}
