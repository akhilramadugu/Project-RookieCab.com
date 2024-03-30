import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const email = sessionStorage.getItem('email');
    const riderEmail = sessionStorage.getItem('rider-email');

    // Check if the user is trying to access the rider dashboard
    if (route.routeConfig.path === 'rider-dashboard') {
      if (riderEmail) {
        return true; // Rider is signed in
      } else {
        this.router.navigate(['']); // Navigate to the sign-in page
        return false; // Rider is not signed in
      }
    } else {
      // For other routes, check if the user is signed in
      if (email) {
        return true; // User is signed in
      } else {
        this.router.navigate(['']); // Navigate to the sign-in page
        return false; // User is not signed in
      }
    }
  }
}
