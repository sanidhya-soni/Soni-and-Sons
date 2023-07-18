import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  private _signupUrl = "http://13.233.193.228:3100/auth/signup";

  signupUser(
    user: {
      user_name: string,
      first_name: string,
      last_name: string,
      contact_no: string,
      email: string,
      password: string,
      sec_ques: string,
      sec_ans: string
    }) {
    return this.http.post<any>(this._signupUrl, user);
  }
}
