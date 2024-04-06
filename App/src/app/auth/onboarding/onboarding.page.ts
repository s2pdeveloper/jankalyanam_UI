import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  dataList=[
    {
      
    }
  ]

  eventSlideOpts = {
    slidesPerView: 1,
    slideShadows: true,
    initialSlide: 0,
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
    },
    spaceBetween: 3,
  }

}
