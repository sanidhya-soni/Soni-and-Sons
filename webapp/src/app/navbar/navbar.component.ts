import { Component } from '@angular/core';
import { UserDetailsService } from '../services/user-details.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  user = {
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    contact_no: ''
  }

  constructor(private _getUserDetails: UserDetailsService) { }

  ngOnInit() {

    this._getUserDetails.getUserDetails().subscribe(
      (response) => {
        // Handle the API response
        this.user = response.body;
        localStorage.setItem('user_name', this.user.user_name);
        localStorage.setItem('userFullName', `${this.user.first_name} ${this.user.last_name}`);
        console.log(this.user);
      },
      (error) => {
        // Handle any errors
        // console.error(error);
        // this.error = error.message;
        console.log(error.message);
        console.log(error.status);
      }
    );
    // console.log(details);
  }
}
