import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { StorageService } from "src/app/core/services";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"],
})
export class MenuPage implements OnInit {
  public appPages = [
    { title: "Profile", url: "/auth/profile", icon: "person-circle" },
    { title: "Change Language", url: "/layout/change-language", icon: "language" },
    { title: "Change Password", url: "/auth/change-password", icon: "key" },
    { title: "About", url: "/folder/outbox", icon: "information-circle" },
    // { title: 'Logout', url: '/auth/login', icon: 'log-out' },
  ];
  public labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

  constructor(
    private alertController: AlertController,
    private storageService: StorageService,
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
    // this.router.navigate(["/auth/login"]);
    this.router.navigate(["/auth/login"]);

  }
}
