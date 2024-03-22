
import { Injectable } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';


@Injectable({
    providedIn: 'root',
})
export class StatusBarService {

    constructor() {
        // iOS only
        // window.addEventListener('statusTap', function () {
        //     console.log('statusbar tapped');
        // });

        // // Display content under transparent status bar (Android only)
        // StatusBar.setOverlaysWebView({ overlay: true });
    }
    // setStatusBarStyleDark = async (color: Style = Style.Dark) => {
    //     await StatusBar.setStyle({ style: color });
    // };
    // setStatusBarColor = async (color: string) => {
    //     await StatusBar.setBackgroundColor({ color: color });
    // };

    // setStatusBarStyleLight = async () => {
    //     await StatusBar.setStyle({ style: Style.Light });
    // };

    hideStatusBar = async () => {
        await StatusBar.hide();
    };

    showStatusBar = async () => {
        await StatusBar.show();
    };
    async changeColor(color: string) {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color });
        await StatusBar.show();
    }
}
