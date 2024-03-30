import { Component, AfterViewInit } from '@angular/core';
import { MapService } from '../../services/map/map.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import * as mapboxgl from 'mapbox-gl';
import { RedirectService } from '../../services/redirect/redirect.service';
import { AuthService } from '../../services/auth/auth.service';
import { Ride } from '../../services/auth/ride';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-bookride',
  templateUrl: './bookride.component.html',
  styleUrls: ['./bookride.component.css'], // Corrected from 'styleUrl' to 'styleUrls'
})
export class BookrideComponent {
  clickAddress: string = '';
  addressInput = new Subject<string>();
  toAddressInput = new Subject<string>();
  addresses: any[] = [];
  toAddress: string = '';
  toAddresses: any[] = [];
  invalidAddress: boolean;
  distance: any;
  estimatedCost: any;
  calculationDone: boolean;
  selectedFromAddress: any = null;
  selectedToAddress: any = null;
  bookRide: boolean = false;
  reason: string = 'Choose Reason';
  map: mapboxgl.Map;
  clickResolve: boolean;
  unSelected: boolean;
  isLogged: boolean;
  rideCreated: boolean;

  user_email = sessionStorage.getItem('email');
  rideId: any;

  ngOnInit() {
    // Check if the user has previously clicked on "Book Ride"
    const clickedBook = sessionStorage.getItem('clickedBook');
    if (clickedBook === 'true') {
      // Retrieve and set the saved details
      console.log(clickedBook);
      const toAddr = sessionStorage.getItem('toAddr');
      const fromAddr = sessionStorage.getItem('fromAddr');

      this.clickAddress = fromAddr;
      this.toAddress = toAddr;
      this.estimatedCost = sessionStorage.getItem('estimatedCost');
      this.distance = sessionStorage.getItem('distance');

      this.bookRide = true;
      this.calculationDone = true;
    }
  }

  initializeMap(fromCoordinates: string, toCoordinates: string) {
    if (this.map) {
      this.map.remove();
      this.map = null; // Set the map variable to null to indicate that there is no longer a map instance
    }

    if (!this.map) {
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: fromCoordinates.split(',').map(Number),
        zoom: 12,
        accessToken:
          'pk.eyJ1IjoicmFtYWR1Z3Vha2hpbCIsImEiOiJjbHUxcXVjOHYwaGJjMmtycGFtNzVlc25nIn0._6H2kd-il0zqsAKufnDAfg',
      });

      const fromCoords = fromCoordinates.split(',').map(Number);
      const toCoords = toCoordinates.split(',').map(Number);

      this.mapboxService
        .getRoute(fromCoordinates, toCoordinates)
        .subscribe((route) => {
          this.map.on('load', () => {
            if (this.map.getSource('route')) {
              this.map.removeLayer('route');
              this.map.removeSource('route');
            }
            this.map.addSource('route', {
              type: 'geojson',
              data: route,
            });
            this.map.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#1db7dd',
                'line-width': 5,
              },
            });
            const bounds = new mapboxgl.LngLatBounds(
              fromCoordinates.split(',').map(Number),
              toCoordinates.split(',').map(Number)
            );
            this.map.fitBounds(bounds, {
              padding: {
                top: this.map._container.clientHeight * 0.1,
                bottom: this.map._container.clientHeight * 0.1,
                left: this.map._container.clientWidth * 0.1,
                right: this.map._container.clientWidth * 0.1,
              },
            });
          });
        });
    }
  }

  constructor(
    private mapboxService: MapService,
    private authService: AuthService,
    private redirect: RedirectService
  ) {
    this.addressInput
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.mapboxService.searchAddress(query))
      )
      .subscribe((features: any[]) => {
        this.addresses = features;
      });

    this.toAddressInput
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.mapboxService.searchAddress(query))
      )
      .subscribe((features: any[]) => {
        this.toAddresses = features;
      });
  }

  onAddressChange(query: string) {
    this.clickAddress = query;
    this.addressInput.next(query);
  }

  onToAddressChange(query: string) {
    this.toAddress = query;
    this.toAddressInput.next(query);
  }

  onClickAddress(address: any) {
    this.selectedFromAddress = address;
    this.clickAddress = address.place_name;
    this.addresses = [];
  }

  onToAddressSelect(address: any) {
    this.selectedToAddress = address;
    this.toAddress = address.place_name;
    this.toAddresses = [];
  }

  swapAddresses() {
    let temp;
    temp = this.clickAddress;
    this.clickAddress = this.toAddress;
    this.toAddress = temp;
  }

  onClickCalculate() {
    if (this.selectedFromAddress && this.selectedToAddress) {
      const fromCoordinates = this.mapboxService.extractCoordinates(
        this.selectedFromAddress
      );
      const toCoordinates = this.mapboxService.extractCoordinates(
        this.selectedToAddress
      );
      this.mapboxService
        .getDistance(fromCoordinates, toCoordinates)
        .subscribe((distance) => {
          this.distance = parseFloat(distance.toFixed(2));
          this.estimatedCost = parseFloat((this.distance * 1.3).toFixed(0));
          sessionStorage.setItem('distance', this.distance);
          sessionStorage.setItem('estimatedCost', this.estimatedCost);
          this.calculationDone = true;
          this.initializeMap(fromCoordinates, toCoordinates);
        });
    } else {
      this.invalidAddress = true;
    }
  }

  onClickBookRide() {
    this.bookRide = true;
    const currentDate: Date = new Date();
    currentDate.setHours(currentDate.getHours() - 4);
    const isoDateTime = currentDate.toISOString();
    const mysqlDateTime = isoDateTime.replace('T', ' ').split('.')[0];
    const toAddr = this.selectedToAddress.place_name;
    sessionStorage.setItem('toAddr', toAddr);
    const fromAddr = this.selectedFromAddress.place_name;
    sessionStorage.setItem('fromAddr', fromAddr);
    sessionStorage.setItem('clickedBook', 'true');
    const tempid = 0;
    const Details: Ride = {
      user_email: this.user_email,
      toAddress: toAddr,
      fromAddress: fromAddr,
      resolved: this.reason,
      dateandtime: mysqlDateTime,
      rideid: tempid,
    };
    this.authService.bookRide(Details).subscribe((response: any) => {
      // First, parse the 'body' string into an object
      const responseBody = JSON.parse(response.body);

      /* console.log(response);
      console.log(responseBody); */

      if (responseBody.message === 'Ride Requested') {
        this.rideCreated = true;
        this.rideId = responseBody.rideid;
        sessionStorage.setItem('rideId', this.rideId);
      }
    });
  }

  selectOption(reason: string) {
    this.reason = reason;
    this.rideCreated = false;
  }

  onClickResolve() {
    this.clickResolve = true;
    this.rideCreated = false;

    if (this.reason === 'Choose Reason') {
      this.unSelected = true;
      this.clickResolve = false;
      return;
    } else {
      this.calculationDone = false;
      this.bookRide = false;
      this.unSelected = false;
      this.clickResolve = true;
      const currentDate: Date = new Date();
      const isoDateTime = currentDate.toISOString();
      const mysqlDateTime = isoDateTime.replace('T', ' ').split('.')[0];
      const toAddr = this.toAddress;
      const fromAddr = this.clickAddress;
      const sessionride = sessionStorage.getItem('rideId');
      if (sessionride) {
        this.rideId = sessionride;
        /* console.log(sessionride); */
        sessionStorage.removeItem('rideId');
        sessionStorage.removeItem('clickedBook');
        sessionStorage.removeItem('toAddr');
        sessionStorage.removeItem('fromAddr');
        sessionStorage.removeItem('distance');
        sessionStorage.removeItem('estimatedCost');
      }
      //const tempid = 0;
      const Details: Ride = {
        user_email: this.user_email,
        toAddress: toAddr,
        fromAddress: fromAddr,
        resolved: this.reason,
        dateandtime: mysqlDateTime,
        rideid: this.rideId,
      };
      /* console.log(Details); */
      this.authService.resolveRide(Details).subscribe((response: any) => {
        // First, parse the 'body' string into an object
        const responseBody = JSON.parse(response.body);

        /*  console.log(response);
        console.log(responseBody); */

        /*  if (responseBody.message === 'Ride Requested') {
          this.rideCreated = true;
          this.rideId = responseBody.rideid;
        } */
      });
    }
  }
}
