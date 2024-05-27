import { Component, OnInit } from "@angular/core";
import { register } from "swiper/element/bundle";
import { PushNotificationService } from "./core/services/push-notification.service";
import { Router } from "@angular/router";
import { StorageService } from "./core/services/local-storage.service";
import { StatusBarService } from "./core/services/status-bar-service.service";
import { CameraService } from "./service/camera.service";
import { AuthService } from "./service/auth/auth.service";
import { AdvertisementService } from "./service/advertisement/advertisement.service";
import { ToastService } from "./core/services";
import { SessionStorageService } from "./core/services/session-storage.service";

// register Swiper custom elements
register();

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})


export class AppComponent implements OnInit {
  advertisementArray = [];
loader = true;
  constructor(
    private pushNotificationService: PushNotificationService,
    private storageService: StorageService,
    private statusBarService: StatusBarService,
    private cameraService: CameraService,
    private authService : AuthService,
    private router: Router,
    private sessionStorage: SessionStorageService,
    private advertiseService: AdvertisementService,private toast: ToastService,
  ) {
   
    this.initializeApp();
  }

  ngOnInit(): void {
    console.log("Call NGONIT-------");
    
    this.getAllAdvertisement()

    if (localStorage.getItem("user")) {
      // if (this.jwtService.getToken() && localStorage.getItem("firstName") && localStorage.getItem('lastName')) {
      //   if (localStorage.getItem("role") === ROLES.EMPLOYEE) {
      //     console.log("ROLES.EMPLOYEE", localStorage.getItem("role") === ROLES.EMPLOYEE);
      //     return this.userService.defaultRoute = '/app/tabs/order-list';
      //     // return this.router.navigate(['/app/tabs/order-list'], { replaceUrl: true });
      //   }
      //   this.userService.defaultRoute = '/app/tabs/home';
      //   // this.router.navigate(['/app/tabs/home'], { replaceUrl: true });
      // } else {
      //   if (this.jwtService.getToken()) {
      //     this.router.navigate([/auth/signup], { replaceUrl: true });
      //     return;
      //   }
      //   this.router.navigate([/auth/login], { replaceUrl: true });
      // }
      this.router.navigate([`/layout/home`], { replaceUrl: true });
    } else {
      // this.router.navigate([/auth/onboarding]);
      this.router.navigate([`/auth/login`], { replaceUrl: true });
    }
  }
  
  async getAllAdvertisement() {
    this.advertiseService.getAllAdvertisemnt().subscribe((res) => {
      console.log("advertisement DONE", res);
      this.sessionStorage.set("advertisementData", res);
      console.log("GET DATA ---", this.sessionStorage.get("advertisementData"));
    
    },
    (err) => {
    
      this.toast.errorToast(err.message);
    })
  }
  

  initializeApp() {
    if(!localStorage.getItem('language')){
      localStorage.setItem('language','en');
    }
    this.statusBarService.changeColor("#7e2212");
    this.pushNotificationService.registerForPushNotification();
    this.cameraService.requestPermission();
  
  
}
}