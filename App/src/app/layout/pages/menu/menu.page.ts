import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { StorageService } from "src/app/core/services";
import { SessionStorageService } from "src/app/core/services/session-storage.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"],
})
export class MenuPage implements OnInit {
  public appPages = [
    { title: "profile", url: "/auth/profile", icon: "person-circle" },
    { title: "changeLanguage", url: "/layout/change-language", icon: "language" },
    { title: "changePassword", url: "/auth/change-password", icon: "key" },
    { title: "about", url: "/folder/outbox", icon: "information-circle" },
    // { title: 'Logout', url: '/auth/login', icon: 'log-out' },
  ];
  public labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

  constructor(
    private alertController: AlertController,
    private storageService: StorageService,
    private sessionService: SessionStorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  async logoutAlert() {
    const alert = await this.alertController.create({
      header: "Logout",
      message: "Are you sure to logout",
      mode: "ios",
      buttons: [
        {
          text: "Cancel",
          handler: () => {},
        },
        {
          text: "OK",
          handler: () => {
            this.logout();
          },
        },
      ],
    });
    await alert.present();
  }

  logout() {
    // this.loca
    console.log("remove logout");
    this.storageService.remove("user");
    this.sessionService.remove('advertisementData')
    // this.router.navigate(["/auth/login"]);
    this.router.navigate(["/auth/login"]);

  }
}
