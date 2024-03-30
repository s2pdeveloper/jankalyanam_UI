import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class ModalService {

  message = 'This modal example uses the modalController to present and dismiss modals.';
  constructor(private modalCtrl: ModalController) { }

  async openModal(component: any, props: any = {}, classes: any = '') {
    const modal = await this.modalCtrl.create({
      component: component,
      cssClass: classes,
      componentProps: props,
    });
    await modal.present();

    return await modal.onWillDismiss();
  }
  dismissAll() {
    this.modalCtrl.dismiss()
  }
}
