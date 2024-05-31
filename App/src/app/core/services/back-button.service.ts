import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ModalController,
  Platform,
} from '@ionic/angular';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';


@Injectable({
  providedIn: 'root',
})
export class AppBackButtonService {

  urlPath: any = [];
  constructor(
    private router: Router,
    private location: Location,
    private alertController: AlertController,
    private modalController: ModalController,
    public loadingController: LoadingController,
    private ngZone: NgZone,
    private platform: Platform,
  ) { }


  async backButtonFunc() {
    this.platform.backButton.subscribeWithPriority(0, async (data) => {
      let isLoading = await this.loadingController.getTop();
      if (isLoading) {
        await isLoading.dismiss();
      }
      let isAlert = await this.alertController.getTop();
      if (isAlert) {
        await isAlert.dismiss();
      }
      let isModal = await this.modalController.getTop();
      if (isModal) {
        await isModal.dismiss();
      }
      this.urlPath = ['/layout/home', '/auth/login', '/auth/register'];

    //   if (this.router.url.includes('/order-view')) {
    //     console.log("true ! navigate to list");
    //     this.router.navigate(['/app/tabs/order-list']);
    //     return;
    //   }
      console.log(this.router.url);
      if (this.urlPath.some((x) => this.router.url == x)) {
        const alert = await this.alertController.create({
          header: 'App termination',
          message: 'Do you want to exit from App ?',
          backdropDismiss: true,
          cssClass: 'my-custom-alert',
          mode: 'ios',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              cssClass: 'primary',
            },
            {
              text: 'Yes',
              cssClass: 'secondary',
              handler: () => {
                App.exitApp();
              },
            },
          ],
        });
        await alert.dismiss();
        return await alert.present();
      } else {
        this.ngZone.run(() => {
          this.location.back();
        });
      }
    });
  }
}
