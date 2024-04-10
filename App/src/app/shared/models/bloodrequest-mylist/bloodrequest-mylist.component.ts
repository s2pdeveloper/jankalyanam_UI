import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { StorageService } from 'src/app/core/services/local-storage.service';
import { ToastService } from "src/app/core/services/toast.service";
import { BloodRequestService } from "src/app/service/request/request.service";
@Component({
  selector: 'app-bloodrequest-mylist',
  templateUrl: './bloodrequest-mylist.component.html',
  styleUrls: ['./bloodrequest-mylist.component.scss'],
})
export class BloodrequestMylistComponent  implements OnInit {

  @Input() data :any;
  user : any = {};
  loader = false;
  providedBy: any = "";
  constructor(
    private router: Router,
    private modalController: ModalController,
    private localStorage: StorageService,
    private service: BloodRequestService,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.user = this.localStorage.get("user");
    this.providedBy = this.data.provided ? this.data.provided : null;
    console.log("data----", this.data, this.data.bloodBankName);
  }
  
  navigate(){
    console.log('in naviatge');
    this.modalController.dismiss()
    
    this.router.navigate(['/layout/donate'])
  }
  dismiss() {
    this.modalController.dismiss();
  }

  async receive(){
    this.loader = true;
    this.service.statusUpdate(this.data.id, 'RECEIVED').subscribe(  (res) => {
      this.data.status = 'RECEIVED';
    
      this.loader = false;
    }, (error) =>{
      this.loader = false;
      this.toast.errorToast("Something went wrong!");
    });
  }
}
