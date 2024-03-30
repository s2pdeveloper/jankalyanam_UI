
import { Injectable } from '@angular/core';
import { App as CapacitorApp } from '@capacitor/app';


@Injectable({
    providedIn: 'root',
})
export class AppBackBtnService {

    constructor() {
        CapacitorApp.addListener('backButton', ({ canGoBack }) => {
            if (!canGoBack) {
                CapacitorApp.exitApp();
            } else {
                window.history.back();
            }
        });
        CapacitorApp.addListener('appStateChange', ({ isActive }) => {
            console.log('App state changed. Is active?', isActive);
        });
    }

}
