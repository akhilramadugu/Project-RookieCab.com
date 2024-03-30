import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private accessToken =
    'pk.eyJ1IjoicmFtYWR1Z3Vha2hpbCIsImEiOiJjbHUxcXVjOHYwaGJjMmtycGFtNzVlc25nIn0._6H2kd-il0zqsAKufnDAfg';
  private baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  private directionsUrl =
    'https://api.mapbox.com/directions/v5/mapbox/driving/';

  constructor(private http: HttpClient) {}

  searchAddress(query: string): Observable<any> {
    const url = `${this.baseUrl}${encodeURIComponent(
      query
    )}.json?access_token=${
      this.accessToken
    }&autocomplete=true&limit=5&country=us`;
    return this.http.get(url).pipe(map((response: any) => response.features));
  }
  getDistance(
    from: string,
    to: string,
    options: { units: 'miles' | 'kilometers' } = { units: 'miles' }
  ): Observable<any> {
    const url = `${this.directionsUrl}${from};${to}?access_token=${this.accessToken}&geometries=geojson`;
    return this.http.get(url).pipe(
      map((response: any) => {
        const distance = response.routes[0].distance;
        return options.units === 'miles'
          ? distance * 0.000621371
          : distance * 0.001; // Convert meters to miles or kilometers
      })
    );
  }

  extractCoordinates(address: any): string | null {
    if (address && address.geometry && address.geometry.coordinates) {
      const [longitude, latitude] = address.geometry.coordinates;
      if (
        latitude >= -90 &&
        latitude <= 90 &&
        longitude >= -180 &&
        longitude <= 180
      ) {
        return `${longitude},${latitude}`;
      }
    }
    return null;
  }

  getRoute(from: string, to: string): Observable<any> {
    const url = `${this.directionsUrl}${from};${to}?access_token=${this.accessToken}&geometries=geojson&overview=full`;
    return this.http
      .get(url)
      .pipe(map((response: any) => response.routes[0].geometry));
  }
}
