import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PushNotificationSchema, PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';



@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private router: Router) { }

  async addListeners() {
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
      localStorage.setItem('deviceToken', token.value);
    });

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      const randomId = Math.floor(Math.random() * 10000) + 1;
      LocalNotifications.schedule({
        notifications: [
          {
            title: notification.title || 'Notification',
            body: notification.body || '',
            id: randomId,
            smallIcon: "ic_launcher_rounded",
            // attachments: [{ id: 'image', url: notification.data.image }],
          }
        ]
      });
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      this.redirection(notification.notification);
    });
  }
  async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
    if (permStatus.receive !== 'granted') {
      this.registerNotifications();
      return;
      throw new Error('User denied permissions!');
    }
    await PushNotifications.register();
  }

  getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications();
  }

  async registerForPushNotification() {
    await this.registerNotifications();
    await this.addListeners();
  }

  redirection(notification: PushNotificationSchema) {
    let additional = JSON.parse(notification.data.additional);
  }
}
