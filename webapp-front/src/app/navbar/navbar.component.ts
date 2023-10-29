import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
// import { UserDetailsService } from '../services/user-details.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {

  @ViewChild("textElement")
  textElement!: ElementRef;
  @ViewChild("blinkElement")
  blinkElement!: ElementRef;

  user = {
    user_name: '',
    first_name: '',
    last_name: '',
    email: '',
    contact_no: ''
  }

  wordArray: string[] = [
    "Love",
    "Soni and Sons"
  ];

  @Input() textColor = "black";
  @Input() fontSize = "20px";
  @Input() blinkWidth = "2px";
  @Input() typingSpeedMilliseconds = 100;
  @Input() deleteSpeedMilliseconds = 100;

  private i = 0;

  constructor(
    // private _getUserDetails: UserDetailsService,
    private renderer: Renderer2) { }


    ngAfterViewInit(): void {
      this.typingEffect();
    }

  ngOnInit() {

    // this._getUserDetails.getUserDetails().subscribe(
    //   (response) => {
    //     // Handle the API response
    //     this.user = response.body;
    //     localStorage.setItem('user_name', this.user.user_name);
    //     localStorage.setItem('userFullName', `${this.user.first_name} ${this.user.last_name}`);
    //     console.log(this.user);
    //   },
    //   (error) => {
    //     // Handle any errors
    //     // console.error(error);
    //     // this.error = error.message;
    //     console.log(error.message);
    //     console.log(error.status);
    //   }
    // );
    // console.log(details);
  }

  private typingEffect(): void {
    if(this.i == 0) {
      this.typingSpeedMilliseconds = 200
    } else {
      this.typingSpeedMilliseconds = 100;
    }
    const word = this.wordArray[this.i].split("");
    const loopTyping = () => {
      if (word.length > 0) {
        this.textElement.nativeElement.innerHTML += word.shift();
      } else {
        this.deletingEffect();
        return;
      }
      setTimeout(loopTyping, this.typingSpeedMilliseconds);
    };
    loopTyping();
  }

  private deletingEffect(): void {
    if(this.i == 0) {
      this.deleteSpeedMilliseconds = 200;
    } else {
      this.deleteSpeedMilliseconds = 100;
    }
    const word = this.wordArray[this.i].split("");
    const loopDeleting = () => {
      if (word.length > 0) {
        word.pop();
        this.textElement.nativeElement.innerHTML = word.join("");
      } else {
        this.i = this.i == 0? 1: 0;

        this.typingEffect();
        return false;
      }
      setTimeout(loopDeleting, this.deleteSpeedMilliseconds);
      return;
    };
    loopDeleting();
  }
}
