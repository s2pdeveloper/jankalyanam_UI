import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AdvertisementService } from "src/app/service/advertisement/advertisement.service";
import { ToastService } from "src/app/core/services/toast.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {

  advertisementArray = [];
  loader = true;
  constructor(
    private route: Router,
    private advertiseService: AdvertisementService,private toast: ToastService,
  ) {}


  ngOnInit() {
    console.log("render home page");
    this.getAllAdvertisement();
  }

  activeSegment = "donate";
  currentTitle = "Home";

  navigateTo(url: string) {
    console.log(url);
    this.route.navigate([url]);
  }

  Option = {
    slidesPerView: 1,
    loop: true, 
    autoplay: {
      delay: 1000,
    },
  };

  async getAllAdvertisement() {
    this.advertiseService.getAllAdvertisemnt().subscribe((res) => {
      console.log("-------", res);
      this.loader = true;
      this.advertisementArray = res;
      this.loader = false;
    },
  (err) =>{
    this.loader = false;
    this.toast.errorToast("Advertisement not found!");
  })
  }
  
  
}
