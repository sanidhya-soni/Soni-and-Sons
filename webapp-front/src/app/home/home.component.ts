import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  constructor() { }

  user = {
    userFullName: '',
    user_name: ''
  }

  ngOnInit(): void {

    // this.user.user_name = localStorage.getItem('user_name') || '';
    // this.user.userFullName = localStorage.getItem('userFullName') || '';
    // this.cd.detectChanges(); // Manually trigger change detection
  }
}
