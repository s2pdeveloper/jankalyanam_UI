import { Injectable } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';


@Injectable({
	providedIn: 'root'
})
export class StatusBarService {

	async hideStatusBar() {
		await StatusBar.hide();
	}

	async showStatusBar() {
		await StatusBar.show();
	}

	async changeColor(color: string) {
		// await StatusBar.setStyle({ style: Style.Default });
		await StatusBar.setStyle({ style: Style.Dark });
		await StatusBar.setBackgroundColor({ color });
		this.showStatusBar();
	}
}

