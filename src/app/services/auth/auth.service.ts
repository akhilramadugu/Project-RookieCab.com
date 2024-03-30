import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { Ride } from './ride';
import { userDetails } from './userDetails';
import { Rider } from './rider';
import { Rideinfo } from './rideinfo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signupOpt(credentials: User): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic NzAyZmFiMjctMzI5My00MjhjLTlhZTEtYzAxODEwNjBhYTUxOlh6OFU5MzFvS1pkSEpkcG5tQkpvT3V5b0ZCcThKWmo0aXJ6TTFxaHRmbXZWT1B6MktXd2ZTT01qNloyZUxQZDU=',
    };
    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);
    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-2b23f3b0-a695-49b5-8992-b12c6db76f03/actions/signup_otp_function',
      credentials,
      { headers, params }
    );
  }

  checkUserExists(credentials: User): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic NzAyZmFiMjctMzI5My00MjhjLTlhZTEtYzAxODEwNjBhYTUxOlh6OFU5MzFvS1pkSEpkcG5tQkpvT3V5b0ZCcThKWmo0aXJ6TTFxaHRmbXZWT1B6MktXd2ZTT01qNloyZUxQZDU=',
    };

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-2b23f3b0-a695-49b5-8992-b12c6db76f03/default/userCheck_signup',
      credentials,
      { headers }
    );
  }

  checkRiderExists(credentials: User): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic NzAyZmFiMjctMzI5My00MjhjLTlhZTEtYzAxODEwNjBhYTUxOlh6OFU5MzFvS1pkSEpkcG5tQkpvT3V5b0ZCcThKWmo0aXJ6TTFxaHRmbXZWT1B6MktXd2ZTT01qNloyZUxQZDU=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-2b23f3b0-a695-49b5-8992-b12c6db76f03/actions/riderCheck_signup',
      credentials,
      { headers, params }
    );
  }

  createUser(credentials: User): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic NzAyZmFiMjctMzI5My00MjhjLTlhZTEtYzAxODEwNjBhYTUxOlh6OFU5MzFvS1pkSEpkcG5tQkpvT3V5b0ZCcThKWmo0aXJ6TTFxaHRmbXZWT1B6MktXd2ZTT01qNloyZUxQZDU=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-2b23f3b0-a695-49b5-8992-b12c6db76f03/actions/CreateUser_Signup',
      credentials,
      { headers, params }
    );
  }

  createRider(credentials: User): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic NzAyZmFiMjctMzI5My00MjhjLTlhZTEtYzAxODEwNjBhYTUxOlh6OFU5MzFvS1pkSEpkcG5tQkpvT3V5b0ZCcThKWmo0aXJ6TTFxaHRmbXZWT1B6MktXd2ZTT01qNloyZUxQZDU=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-2b23f3b0-a695-49b5-8992-b12c6db76f03/actions/CreateRider_Signup',
      credentials,
      { headers, params }
    );
  }

  checkUserExistsLogin(credentials: User): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ZmFkZGVmMTctOTNhMi00MjE3LWEzYzUtYzhjOTExY2JkZGVjOlpKMUxUblAzeWNKOU1aZ0FHNnBaWEdUdnVBM3VnMVk4WGYwTlR0VnVsNUN2dk11RFNneXRQR3BaWEp3QU5KSzI=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-40432f69-c806-4ab0-b774-093287e685b4/actions/login_function',
      credentials,
      { headers, params }
    );
  }

  checkRiderExistsLogin(credentials: User): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ZmFkZGVmMTctOTNhMi00MjE3LWEzYzUtYzhjOTExY2JkZGVjOlpKMUxUblAzeWNKOU1aZ0FHNnBaWEdUdnVBM3VnMVk4WGYwTlR0VnVsNUN2dk11RFNneXRQR3BaWEp3QU5KSzI=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-40432f69-c806-4ab0-b774-093287e685b4/actions/loginFunction_rider',
      credentials,
      { headers, params }
    );
  }

  passwordUpdate(credentials: User): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ZmFkZGVmMTctOTNhMi00MjE3LWEzYzUtYzhjOTExY2JkZGVjOlpKMUxUblAzeWNKOU1aZ0FHNnBaWEdUdnVBM3VnMVk4WGYwTlR0VnVsNUN2dk11RFNneXRQR3BaWEp3QU5KSzI=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-40432f69-c806-4ab0-b774-093287e685b4/actions/changePassword_login',
      credentials,
      { headers, params }
    );
  }

  passwordUpdateRider(credentials: User): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ZmFkZGVmMTctOTNhMi00MjE3LWEzYzUtYzhjOTExY2JkZGVjOlpKMUxUblAzeWNKOU1aZ0FHNnBaWEdUdnVBM3VnMVk4WGYwTlR0VnVsNUN2dk11RFNneXRQR3BaWEp3QU5KSzI=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-40432f69-c806-4ab0-b774-093287e685b4/actions/changePasssword_login_rider',
      credentials,
      { headers, params }
    );
  }

  bookRide(Details: Ride): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic MGE1ZmY5MGYtMDNkNC00ZWYyLTg4ODYtMTBmNWRkMmZhMWQ1OlJvRDBnb0ZNbWRFSHJVb1RpY3dzSXBocU14ZVdad0NqRFlZeEk0azNxN2YzR1ZUd2xoSjR6akZpRmFtVnFjRHU=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    /*  console.log('in request'); */

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-1ad024ab-ceb8-49e5-83de-14ab2709f106/actions/bookRide_User',
      Details,
      { headers, params }
    );
  }

  resolveRide(Details: Ride): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic MGE1ZmY5MGYtMDNkNC00ZWYyLTg4ODYtMTBmNWRkMmZhMWQ1OlJvRDBnb0ZNbWRFSHJVb1RpY3dzSXBocU14ZVdad0NqRFlZeEk0azNxN2YzR1ZUd2xoSjR6akZpRmFtVnFjRHU=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    console.log('in request');

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-1ad024ab-ceb8-49e5-83de-14ab2709f106/actions/ResolveRide_User',
      Details,
      { headers, params }
    );
  }

  getRideHistory(Details: Ride): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic MGE1ZmY5MGYtMDNkNC00ZWYyLTg4ODYtMTBmNWRkMmZhMWQ1OlJvRDBnb0ZNbWRFSHJVb1RpY3dzSXBocU14ZVdad0NqRFlZeEk0azNxN2YzR1ZUd2xoSjR6akZpRmFtVnFjRHU=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    console.log('in request');

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-1ad024ab-ceb8-49e5-83de-14ab2709f106/actions/displayRides_User',
      Details,
      { headers, params }
    );
  }

  updateDetails(userDetails: userDetails): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic NzkxNzk0MzEtNjA4Zi00YWM2LWFmZWMtMmIxYTRhMTI0MDcwOlNoOE9JTU1nbHdNc3hPTXp2dkt4VWN3WUdrWWRvZ0dOWEdIWWozekNtdXRIbzJaUENQa0hFV3FuV3BFOGRobEE=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    console.log('in request');

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-3fd2f67c-d7e9-47ac-81a9-98b0885db9ff/actions/details_user',
      userDetails,
      { headers, params }
    );
  }

  fetchDetails(userDetails: userDetails): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic NzkxNzk0MzEtNjA4Zi00YWM2LWFmZWMtMmIxYTRhMTI0MDcwOlNoOE9JTU1nbHdNc3hPTXp2dkt4VWN3WUdrWWRvZ0dOWEdIWWozekNtdXRIbzJaUENQa0hFV3FuV3BFOGRobEE=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    console.log('in request');

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-3fd2f67c-d7e9-47ac-81a9-98b0885db9ff/actions/fetch_userdetails',
      userDetails,
      { headers, params }
    );
  }

  updateDetailsRider(userDetails: userDetails): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic NzkxNzk0MzEtNjA4Zi00YWM2LWFmZWMtMmIxYTRhMTI0MDcwOlNoOE9JTU1nbHdNc3hPTXp2dkt4VWN3WUdrWWRvZ0dOWEdIWWozekNtdXRIbzJaUENQa0hFV3FuV3BFOGRobEE=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    console.log('in request');

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-3fd2f67c-d7e9-47ac-81a9-98b0885db9ff/actions/riderDetails_Update',
      userDetails,
      { headers, params }
    );
  }

  fetchDetailsRider(userDetails: userDetails): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic NzkxNzk0MzEtNjA4Zi00YWM2LWFmZWMtMmIxYTRhMTI0MDcwOlNoOE9JTU1nbHdNc3hPTXp2dkt4VWN3WUdrWWRvZ0dOWEdIWWozekNtdXRIbzJaUENQa0hFV3FuV3BFOGRobEE=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    console.log('in request');

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-3fd2f67c-d7e9-47ac-81a9-98b0885db9ff/actions/fetch_riderDetails',
      userDetails,
      { headers, params }
    );
  }

  /* fetchRides(): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic NzkxNzk0MzEtNjA4Zi00YWM2LWFmZWMtMmIxYTRhMTI0MDcwOlNoOE9JTU1nbHdNc3hPTXp2dkt4VWN3WUdrWWRvZ0dOWEdIWWozekNtdXRIbzJaUENQa0hFV3FuV3BFOGRobEE=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    console.log('in request');

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-3fd2f67c-d7e9-47ac-81a9-98b0885db9ff/actions/fetch_rides',
      { headers, params }
    );
  } */

  addRider(rider: Rider): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic OTRkN2MyODItYmQwZC00NzljLTkxYWUtZTc1OWJhZDVlYzBkOjcybHVSVmFPazdIcHZNN0Q4dUhlNUlVNDNwOHhLdWl1RUFVQldMM3B6YU5lVGJlMU05UUIyR0RzcEZsUXJpbEw=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    console.log('in request');

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-8e54cc1f-9220-49ec-98ca-ce1f62cc8568/actions/addto_available',
      rider,
      { headers, params }
    );
  }

  removeRider(rider: Rider): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic OTRkN2MyODItYmQwZC00NzljLTkxYWUtZTc1OWJhZDVlYzBkOjcybHVSVmFPazdIcHZNN0Q4dUhlNUlVNDNwOHhLdWl1RUFVQldMM3B6YU5lVGJlMU05UUIyR0RzcEZsUXJpbEw=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    console.log('in request');

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-8e54cc1f-9220-49ec-98ca-ce1f62cc8568/actions/removefrom_available',
      rider,
      { headers, params }
    );
  }

  checkRider(rider: Rider): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic OTRkN2MyODItYmQwZC00NzljLTkxYWUtZTc1OWJhZDVlYzBkOjcybHVSVmFPazdIcHZNN0Q4dUhlNUlVNDNwOHhLdWl1RUFVQldMM3B6YU5lVGJlMU05UUIyR0RzcEZsUXJpbEw=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    console.log('in request');

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-8e54cc1f-9220-49ec-98ca-ce1f62cc8568/actions/check_available',
      rider,
      { headers, params }
    );
  }

  trailRider(rider: Rider): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic OTRkN2MyODItYmQwZC00NzljLTkxYWUtZTc1OWJhZDVlYzBkOjcybHVSVmFPazdIcHZNN0Q4dUhlNUlVNDNwOHhLdWl1RUFVQldMM3B6YU5lVGJlMU05UUIyR0RzcEZsUXJpbEw=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    console.log('in request');

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-8e54cc1f-9220-49ec-98ca-ce1f62cc8568/actions/rides_retrieve',
      rider,
      { headers, params }
    );
  }

  getLockedRides(rideinfo: Rideinfo): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ZTFkYjRmYTQtYzM4NS00YmU0LWJlZGItY2YyNzNiMzY3YjgyOlBWQlBBRmcxSkZ6VG5sN0R5c1lRVGJJUGh5TzV1MlZRRnUxV0thVWZvQ1dqNXRiTjlKU3VhNGtoNmE5WWNXemM=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    console.log('in request');

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-01c64837-965a-4ddc-a2b0-76826ff97f02/actions/give_lockedRides',
      rideinfo,
      { headers, params }
    );
  }

  lockRide(rideinfo: Rideinfo): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ZTFkYjRmYTQtYzM4NS00YmU0LWJlZGItY2YyNzNiMzY3YjgyOlBWQlBBRmcxSkZ6VG5sN0R5c1lRVGJJUGh5TzV1MlZRRnUxV0thVWZvQ1dqNXRiTjlKU3VhNGtoNmE5WWNXemM=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    console.log('in request');

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-01c64837-965a-4ddc-a2b0-76826ff97f02/actions/lock_rides',
      rideinfo,
      { headers, params }
    );
  }

  fetchUserDetails(rideinfo: Rideinfo): Observable<object> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ZTFkYjRmYTQtYzM4NS00YmU0LWJlZGItY2YyNzNiMzY3YjgyOlBWQlBBRmcxSkZ6VG5sN0R5c1lRVGJJUGh5TzV1MlZRRnUxV0thVWZvQ1dqNXRiTjlKU3VhNGtoNmE5WWNXemM=',
    };

    let params = new HttpParams();
    // Add any query parameters you need
    params = params.append('blocking', true);
    params = params.append('result', true);

    console.log('in request');

    return this.http.post(
      'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/namespaces/fn-01c64837-965a-4ddc-a2b0-76826ff97f02/actions/getUserDetails',
      rideinfo,
      { headers, params }
    );
  }
}
