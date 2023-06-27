import { Component } from '@angular/core';
import { SignupService } from '../services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  newUserData = {
    user_name: '',
    first_name: '',
    last_name: '',
    contact_no: '',
    email: '',
    password: '',
    sec_ques: '',
    sec_ans: ''
  }

  confirm_password: string = '';

  questions: string[] = [
    'What is the first name of your best friend in high school?',
    'What was the first thing you leared to cook?',
    'What was the first movie you saw in threater?',
    'What was the name of your favourite teacher in high school?',
    'What was the first city you travelled via flight?',
  ];


  error: string = '';

  ngOnInit() { }

  constructor(
    private _signup: SignupService,
    private _router: Router
  ) { }

  async signupUser() {
    if (this.newUserData.password != this.confirm_password) {
      console.log("Password didn't Matched.");
      return;
    }

    await this._signup.signupUser(this.newUserData).subscribe(
      (response) => {
        // Handle the API response
        console.log(response);
        // localStorage.setItem('authToken', response.authToken);
        // console.log(localStorage.getItem('authToken') || '[]');
        this._router.navigate(['/login']);
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
