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
      cssClass: 'toast-success',
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
      cssClass: 'toast-error',
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
      cssClass: 'toast-warning',
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