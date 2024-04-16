import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdvertisementService } from "src/app/service/advertisement/advertisement.service";
import { ToastService } from "src/app/core/services/toast.service";
import { SessionStorageService } from "src/app/core/services/session-storage.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  data: any = null;
  advertisementArray = [];
  loader = true;
  constructor(
    private route: Router,
    private advertiseService: AdvertisementService,private toast: ToastService,
    private sessionStorage: SessionStorageService,
  ) {}

  activeSegment = "donate";
  currentTitle = "Home";
  ngOnInit() {
    
  }
  ionViewWillEnter(){
   
    setTimeout(() => {
      this.data = this.sessionStorage.get("advertisementData");
      console.log("this.data----------------",this.data) 
    }, 500);
  }



  navigateTo(url: string) {
    console.log(url);
    this.route.navigate([url]);
  }



  
}
