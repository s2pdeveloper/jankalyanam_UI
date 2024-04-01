import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loader: any = null;
  hide: any = null;
  constructor(public loadingController: LoadingController) {}

  // This will show then autohide the loader
  showHideAutoLoader() {
    this.loadingController
      .create({
        message: 'This Loader Will Auto Hide in 2 Seconds',
        duration: 1000,
      })
      .then((res) => {
        res.present();
        res.onDidDismiss().then((dis) => {
          console.log('Loading dismissed! after 2 Seconds', dis);
        });
      });
  }



  async showLoader() {
    if (!this.loader) {
      this.loader = await this.loadingController.create({ message: 'Loading' });
      await this.loader.present();
      console.log('showLoader');
    }
  }

  async hideLoader() {
    if (this.loader) {
      await this.loader.dismiss();
      this.loader = null;
      console.log('hideLoader');
    }
  }
}
