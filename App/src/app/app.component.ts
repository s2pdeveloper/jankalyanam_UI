import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { PushNotificationService } from './core/services/push-notification.service'
// register Swiper custom elements
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  constructor(private pushNotificationService:PushNotificationService) {
    this.initializeApp()
  }

  ngOnInit(): void {
      
  }

  initializeApp(){
    this.pushNotificationService.registerForPushNotification();
  }
}
