import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginUserData = { 
    user_name: '',
    password: ''
  };

  error: String = ''

  ngOnInit() { }

  constructor(
    private _login: LoginService,
    private _router: Router
  ) { }

  async loginUser() {
    await this._login.loginUser(this.loginUserData).subscribe(
      (response) => {
        // Handle the API response
        // console.log(response);
        localStorage.setItem('authToken', response.authToken);
        console.log(localStorage.getItem('authToken') || '[]');
        this._router.navigate(['/home']);
      },
      (error) => {
        // Handle any errors
        // console.error(error);
        this.error = error.message;
        console.log(error.message);
        console.log(error.status);
      }
    );
  }
}
