import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private http: HttpClient) { }

  private _userUrl = 'http://13.233.193.228:3100/user/get-user';

  getUserDetails() {
    return this.http.get<any>(this._userUrl, {
      headers: new HttpHeaders({
        authtoken: localStorage.getItem('authToken') || '[]',
      }),
      observe: 'response',
    });
  }
}
