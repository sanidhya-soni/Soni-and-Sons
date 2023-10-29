import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  slides = [
    {
      imageUrl: 'assets/01.jpg',
      caption: 'Slide 1'
    },
    {
      imageUrl: 'assets/02.jpg',
      caption: 'Slide 2'
    },
    {
      imageUrl: 'assets/03.jpg',
      caption: 'Slide 3'
    },
    {
      imageUrl: 'assets/04.jpg',
      caption: 'Slide 4'
    },
    {
      imageUrl: 'assets/05.jpg',
      caption: 'Slide 5'
    }
  ];

  currentIndex = 0;

  ngOnInit(): void {
    this.showSlides();
  }

  showSlides() {
    setInterval(() => {
      this.changeSlide(1); // Automatically change to the next slide
    }, 7000); // Change slide every 3 seconds (adjust as needed)
  }

  changeSlide(step: number) {
    this.currentIndex = (this.currentIndex + step) % this.slides.length;
    if (this.currentIndex < 0) {
      this.currentIndex = this.slides.length - 1;
    }
  }
}
