import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
@Injectable({
  providedIn: "root",
})
export class LoaderService {
  constructor(public loadingController: LoadingController) {}

  // Simple loader
 async show() {
   let response=await this.loadingController.create({
        message: "Loading...",
      })
     await response.present();
  }
  // Dismiss loader
 async hide() {
  await this.loadingController.dismiss()
  }
}
