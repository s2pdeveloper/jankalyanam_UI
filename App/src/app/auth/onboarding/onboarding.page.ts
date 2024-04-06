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

 

 
  Option = { 
    slidesPerView: 1, 
    loop: true ,
    autoplay: {
      delay: 5000,
    },
  
  
  }

}
