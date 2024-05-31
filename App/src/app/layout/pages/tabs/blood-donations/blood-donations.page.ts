import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalService } from "src/app/service/modal.service";
import { DonationDetailsComponent } from "src/app/shared/models/donation-details/donation-details.component";
import { StorageService, ToastService } from "src/app/core/services";
import { DonationHistoryComponent } from "src/app/shared/models/donation-history/donation-history.component";
import { BloodDonationService } from "src/app/service/donation/donation.service";
import { DATE_PIPE_DEFAULT_OPTIONS } from "@angular/common";
import { LoaderService } from "src/app/service/loader.service";
import { IonModal, ModalController } from "@ionic/angular";
import { OverlayEventDetail } from '@ionic/core/components';
import { CalenderComponent } from 'src/app/shared/models/calender/calender.component';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-blood-donations",
  templateUrl: "./blood-donations.page.html",
  styleUrls: ["./blood-donations.page.scss"],
})
export class BloodDonationsPage implements OnInit, OnDestroy {
  activeSegment = "latest";
  currentTitle = "history";
  historyTabDetails: any = [];
  latestTabDetails: any = [];
  user: any = {};
  historyPage: number = 0;
  latestPage: number = 0;
  pageSize: number = 10;
  search: any = "";
  type: any = "";
  sortBy: any = "";
  historyCount: number = 0;
  latestCount: number = 0;
  loader = true;
  loaderDisabled = false;
  bloodGroup: any = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  selectedBloodGroups: string[] = [];
  bloodBankName: any = "";
  donationDate: any = "";
  constructor(
    private router: Router,
    private modalService: ModalService,
    private service: BloodDonationService,
    private localStorage: StorageService,
    private spinner: LoaderService,
    private toast: ToastService,
    private modalController: ModalController,

  ) {}

  ngOnInit() {}


  ionViewWillEnter() {
    this.historyPage = 0;
    this.latestPage = 0;
    this.bloodBankName ='';
    this.selectedBloodGroups = [];
    this.donationDate = '';
    this.user = this.localStorage.get("user");
    if (this.user.role == "ATTENDER") {
      this.getAllAttenderList("ACTIVE");
      this.getAllAttenderList("HISTORY");
    } else if (this.user.role == "ADMIN") {
      this.getAllAdminList("ACTIVE");
      this.getAllAdminList("HISTORY");
    }
  }
  navigateTo(url: string) {
    console.log(url);
    this.router.navigate([url]);
  }
  ngOnDestroy(): void {
   
  }

  async getAllAttenderList(status: any, event = null) {

      if(!event){
        this.loader = true;
      }
      const transformedBloodGroups = this.selectedBloodGroups.map(bloodGroup => 
        bloodGroup
            .trim()
            .replace(/\+/g, "%2B")
            .replace(/-/g, "%2D")
    );
      let params = {
        pageNo: status === "HISTORY" ? this.historyPage : this.latestPage,
        pageSize: this.pageSize,
        search: this.search,
        sortBy: this.sortBy,
        bloodGroup:transformedBloodGroups,
        bloodBankName:this.bloodBankName,
        donationDate:this.donationDate
      };

      this.service.getAllAttenderList(params, status).subscribe(
        
        async (res) => {
          if (status === "HISTORY") {
            if (event) {
              this.historyTabDetails = [...this.historyTabDetails, ...res.data];
            } else {
              this.historyTabDetails = res.data;
              console.log("-------", this.historyTabDetails)
            }
            this.historyCount = res.count;
            this.historyPage++;
          } else {
            if (event) {
              this.latestTabDetails = [...this.latestTabDetails, ...res.data];
            } else {
              this.latestTabDetails = res.data;
              console.log("this.latestTabDetails", this.latestTabDetails);
            }
            this.latestCount = res.count;
            this.latestPage++;
          }
       
       
          if (res?.data.length === 0 && event) {
            event.target.disabled = true;
          }
          if(event){
            event.target.complete();
            }else{
              this.loader = false;
            }
          
        },
        
        async (error) => {
          if(event){
            event.target.complete();
            }else{
              this.loader = false;
            }
          // this.toast.errorToast("Something went wrong!");
          this.toast.errorToast(error.message);
        }
        
      );
     
    
  }

  async getAllAdminList(status: any, event = null) {
   console.log("event-----",event);
   
    if(!event){
      this.loader = true;
    }
    // this.data.bloodGroup
    //     .trim()
    //     .replace(/\+/g, "%2B")
    //     .replace(/-/g, "%20-"),
    // }
    const transformedBloodGroups = this.selectedBloodGroups.map(bloodGroup => 
      bloodGroup
          .trim()
          .replace(/\+/g, "%2B")
          .replace(/-/g, "%2D")
  );
  console.log(this.selectedBloodGroups,transformedBloodGroups,this.bloodBankName,this.donationDate);
  
    let params = {
      pageNo: status === "HISTORY" ? this.historyPage : this.latestPage,
      pageSize: this.pageSize,
      search: this.search,
      sortBy: this.sortBy,
      bloodGroup:transformedBloodGroups,
      bloodBankName:this.bloodBankName,
      donationDate:this.donationDate
    };
    this.service.getAllAdminList(params, status).subscribe(
      async (res) => {
        if (status == "HISTORY") {
          if (event) {
            this.historyTabDetails = [...this.historyTabDetails, ...res.data];
          } else {
            this.historyTabDetails = res.data;
            console.log("Admin", this.historyTabDetails)
          }
          this.historyCount = res.count;
          this.historyPage++;
        } else {
          if (event) {
            this.latestTabDetails = [...this.latestTabDetails, ...res.data];
          } else {
            this.latestTabDetails = res.data;
            console.log("this.latestTabDetails", this.latestTabDetails);
          }
          this.latestCount = res.count;
          this.latestPage++;
        }
       

        if (res?.data.length === 0 && event) {
          event.target.disabled = true;
        }

       
        if(event){
          event.target.complete();
          }else{
            this.loader = false;
          }
      },
      async (error) => {
       
        if(event){
          event.target.complete();
          }else{
            this.loader = false;
          }
        // this.toast.errorToast("Something went wrong!");
        this.toast.errorToast(error.message);
      }
    );
  }
 
  async refreshData() {
    this.bloodBankName ='';
    this.donationDate ='';
    this.selectedBloodGroups = [];
     switch (this.activeSegment) {
      case "history":
        this.historyPage = 0;
        if(this.user.role == "ADMIN"){
          this.getAllAdminList("HISTORY");
        }else{
          this.getAllAttenderList("HISTORY");
        }
        break;
      case "latest":
         this.latestPage = 0;
         if(this.user.role == "ADMIN"){
          this.getAllAdminList("ACTIVE");
        }else{
          this.getAllAttenderList("ACTIVE");
        }
        break;
     
      default:
        return;
    }

  }

  openModel(key: string, data: any) {
    switch (key) {
      case "history":
        this.modalService.openModal(DonationHistoryComponent, { data: data });
        break;
      case "latest":
        this.modalService.openModal(DonationDetailsComponent, { data: data });
        break;
      default:
        break;
    }
  }

  doInfinite(event) {
    console.log("doInfinite", event);
  

    if (this.activeSegment == "latest") {
      if (this.latestCount == this.latestTabDetails.length) {
        event.target.complete();
        return;
      }
      if (this.user.role == "ADMIN") {
        this.getAllAdminList("ACTIVE", event);
      } else {
        this.getAllAttenderList("ACTIVE", event);
      }
    } else {
      if (this.historyCount == this.historyTabDetails.length) {
        event.target.complete();
        return;
      }

      if (this.user.role == "ADMIN") {
        this.getAllAdminList("HISTORY", event);
      } else {
        this.getAllAttenderList("HISTORY", event);
      }
    }

    // event.target.complete();
  }
  
  close(event:any,id : any,index : number){
    this.spinner.show();
    event.stopPropagation();
    this.service.statusUpdate(id, 'CLOSE').subscribe(
      async (success) => {
        this.toast.successToast(success.message);

       let data =  this.latestTabDetails[index];
       this.latestTabDetails.splice(index,1);
       this.historyTabDetails.unshift(data);
       this.spinner.hide()
      },
      async (error: any) => {
        // this.loader = false;
        this.toast.errorToast(error.message);
       this.spinner.hide()

      }
    );
  
  }

  // search model
  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  cancel() {
  //  this.clearSelections();
    this.modal.dismiss(null, 'cancel');
  }

  getData(){
    this.historyPage = 0;
    this.latestPage = 0;
    if (this.user.role == "ADMIN") {
      this.getAllAdminList("ACTIVE", null);
      this.getAllAdminList("HISTORY", null);
    }
   else {
      this.getAllAttenderList("ACTIVE", null);
      this.getAllAttenderList("HISTORY", null);
    }
  }

  confirm() {
    console.log("  bloodBankName",this.bloodBankName,
    "donationDate:",this.donationDate , "bloodGroup ",this.selectedBloodGroups)
    this.modal.dismiss(this.name, 'confirm');
    this.getData();
   
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }


 
  //for multiple select of filter tabs
  toggleBloodGroup(group: string) {
    if (this.selectedBloodGroups.includes(group)) {
      this.selectedBloodGroups = this.selectedBloodGroups.filter(g => g !== group);
    } else {
      this.selectedBloodGroups.push(group);
    }
  };


  clearSelections() {
    this.selectedBloodGroups = [];
    this.bloodBankName = '';
    this.donationDate = '';

  }

  //calender
  async openCalender(field: any) {
    let date = field.value
      ? new Date(field.value).toISOString()
      : new Date().toISOString();
    const modal: any = await this.modalController.create({
      component: CalenderComponent,
      cssClass: 'calender-model',
      componentProps: {
        date,
      },
    });

    await modal.present();
    await modal.onWillDismiss().then((data: any) => {
      console.log('data---', data);

      if (data.data && data.data.date) {
        // this.f[field].setValue(data.data.date);
        this.donationDate = data.data.date;
      }
    });
  }
  
}
