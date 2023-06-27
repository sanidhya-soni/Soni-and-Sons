import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private _loginUrl = "http://localhost:3100/auth/login";

  loginUser(user: { user_name: string, password: string; }) {
    return this.http.post<any>(this._loginUrl, user);
  }
}
