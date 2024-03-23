
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Injectable({
    providedIn: 'root',
})
export class AlertService {


    constructor(public alertController: AlertController) { }
    //prepare and call function to use
    async simpleAlert(message:string, header = '', subHeader = '', cssClass: string = '' ) {
        const alert = await this.alertController.create({
            header: header,
            subHeader: subHeader,
            message: message,
            cssClass: [cssClass],
        });

        await alert.present();
    }

    async promoCodeAlert(callback: Function) {
        const alert = await this.alertController.create({
            header: 'Enter Your Promo Code',
            subHeader: '',
            mode: 'ios',
            inputs: [
                { placeholder: 'Promo Code' }
            ],

            buttons: [{
                text: 'Apply',
                role: 'ok',
                cssClass: 'secondary',
                handler: (data) => {
                    callback(data['0'])

                }
            }]
        });

        await alert.present();
    }

}
