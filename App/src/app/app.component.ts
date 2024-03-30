import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { PushNotificationService } from './core/services/push-notification.service'
import { StorageService } from './core/services/local-storage.service';
import { Router } from '@angular/router';
// register Swiper custom elements
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private pushNotificationService:PushNotificationService,
    private localStorage: StorageService,
    private router: Router) {
    this.initializeApp()
  }

  ngOnInit(): void {
    if (
      localStorage.getItem('user')
    ) {
      // if (this.jwtService.getToken() && localStorage.getItem("firstName") && localStorage.getItem('lastName')) {
      //   if (localStorage.getItem("role") === ROLES.EMPLOYEE) {
      //     console.log("ROLES.EMPLOYEE", localStorage.getItem("role") === ROLES.EMPLOYEE);
      //     return this.userService.defaultRoute = '/app/tabs/order-list';
      //     // return this.router.navigate(['/app/tabs/order-list'], { replaceUrl: true });
      //   }
      //   this.userService.defaultRoute = '/app/tabs/home';
      //   // this.router.navigate(['/app/tabs/home'], { replaceUrl: true });
      // } else {
      //   if (this.jwtService.getToken()) {
      //     this.router.navigate([/auth/signup], { replaceUrl: true });
      //     return;
      //   }
      //   this.router.navigate([/auth/login], { replaceUrl: true });
      // }
      this.router.navigate([`/layout/blood-donations`], { replaceUrl: true });
    } else {
      // this.router.navigate([/auth/onboarding]);
      this.router.navigate([`/auth/login`], { replaceUrl: true });
    }
      
  }

  initializeApp(){
    this.pushNotificationService.registerForPushNotification();
  }
}
