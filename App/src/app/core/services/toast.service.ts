import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(public toastController: ToastController) {}

  async successToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      position: 'bottom',
      cssClass: 'custom-success',
      color:'dark',
      buttons: [
        {
          icon: 'close-outline',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    toast.present();
  }
  async errorToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      position: 'bottom',
      cssClass: 'custom-error',
      color:'dark',
      buttons: [
        {
          icon: 'close-outline',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    toast.present();
  }
  async warningToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      position: 'bottom',
      cssClass: 'custom-warning',
      // buttons: [
      //   {
      //     icon: 'close-outline',
      //     role: 'cancel',
      //     handler: () => {
      //       console.log('Cancel clicked');
      //     },
      //   },
      // ],
    });
    toast.present();
  }
}
