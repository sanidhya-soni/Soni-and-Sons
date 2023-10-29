import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor(private cd: ChangeDetectorRef) { }

  user = {
    userFullName: '',
    user_name: ''
  }

  async ngOnInit() {
    this.user.user_name = localStorage.getItem('user_name') || '';
    this.user.userFullName = localStorage.getItem('userFullName') || '';
    this.cd.detectChanges(); // Manually trigger change detection
  }
}
