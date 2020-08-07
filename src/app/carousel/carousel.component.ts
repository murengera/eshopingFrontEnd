import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  images = ["../../assets/gallery-image-1.jpg"];
  current_image = this.images[0];
  i = 0;

  constructor() { }

  ngOnInit(): void {
    this.changeBackgroundImage();
  }
  changeBackgroundImage() {
    setTimeout(() => {
      this.current_image = this.images[this.i];
      this.i++;
      if (this.i >= this.images.length) {
        this.i = 0;
      }
      this.changeBackgroundImage();
    }, 5000);
  }



}
