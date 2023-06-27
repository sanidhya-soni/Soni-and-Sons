import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user = {
    userFullName: '',
    user_name: ''
  }

  ngOnInit() {
    this.user.user_name = localStorage.getItem('user_name') || '';
    this.user.userFullName = localStorage.getItem('userFullName') || '';
  }
}
