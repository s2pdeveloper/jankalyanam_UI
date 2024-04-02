import { Component, OnInit } from '@angular/core';
import { ModalService } from "src/app/service/modal.service";
import { DonationDetailsComponent } from 'src/app/shared/models/donation-details/donation-details.component';
import { DonationHistoryComponent } from 'src/app/shared/models/donation-history/donation-history.component';
import{ BloodrequestMylistComponent} from 'src/app/shared/models/bloodrequest-mylist/bloodrequest-mylist.component';
import { Router } from '@angular/router';
import { BloodRequestService } from 'src/app/service/request/request.service';
import { StorageService } from 'src/app/core/services/local-storage.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { AdminRequestMylistComponent } from 'src/app/shared/models/admin-request-mylist/admin-request-mylist.component';
import { AdminRequestActiveComponent } from 'src/app/shared/models/admin-request-active/admin-request-active.component';
@Component({
  selector: 'app-blood-requests',
  templateUrl: './blood-requests.page.html',
  styleUrls: ['./blood-requests.page.scss'],
})
export class BloodRequestsPage implements OnInit {

  user: any = {};
  page:number = 0;
  pageSize:number =10;
  search:any=''
  type:any='';
  sortBy:any='';
  activeSegment = 'list';
  currentTitle = 'Request';
  historyTabDetails: any = [];
  latestTabDetails: any = [];
  myListTabDetails: any = [];

  constructor(  private router: Router,
    private modalService: ModalService,
    private service: BloodRequestService,
    private localStorage: StorageService,
    private spinner: LoaderService,
    private toast: ToastService,) { }

  ngOnInit() {
  }



  async getAllAttenderList() {
    await this.spinner.showLoader();
    let params ={
      pageNo:this.page,
      pageSize:this.pageSize,
      search: this.search,
      sortBy: this.sortBy
    }
    forkJoin([
      this.service.getAllAttenderList(params,"HISTORY"),
      this.service.getAllAttenderList(params,"ACTIVE"),
    ]).subscribe(async (res) => {
      this.historyTabDetails = res[0];
      this.latestTabDetails = res[1];
      await this.spinner.hideLoader();
    },async (error) =>{
      await this.spinner.hideLoader();
      this.toast.errorToast("Something went wrong!");
    });
  }

  async getAllAdminList() {
    await this.spinner.showLoader();
    let params ={
      pageNo:this.page,
      pageSize:this.pageSize,
      search: this.search,
      sortBy: this.sortBy
    }
    forkJoin([
      this.service.getAllAdminList(params,"HISTORY"),
      this.service.getAllAdminList(params,"ACTIVE"),
      this.service.getAllAdminList(params,"MYLIST")
    ]).subscribe(async (res) => {
      this.historyTabDetails = res[0];
      this.latestTabDetails = res[1];
      this.myListTabDetails = res[1];
      await this.spinner.hideLoader();
    },async (error) =>{
      await this.spinner.hideLoader();
      this.toast.errorToast("Something went wrong!");
    });
  }
  
  openModel(key: string) {
    let data={}
    switch (key) {
      case "history":
        this.modalService.openModal(DonationHistoryComponent, {data});
        break;
      // case "details":
      //   this.modalService.openModal(DonationDetailsComponent, { data });
      //   break;
      //   case "list":
      //     this.modalService.openModal(BloodrequestMylistComponent, { data });
      //     break;
          case "list":
            this.modalService.openModal(AdminRequestMylistComponent, {data});
            break;
          case "details":
            this.modalService.openModal(AdminRequestActiveComponent, { data });
            break;
  
      default:
        break;
    }
  }

  //{
    //   "age": 0,
    //   "bloodGroup": "string",
    //   "bloodRequireDate": "2024-03-21T07:15:41.087Z",
    //   "city": "string",
    //   "hemoglobin": 0,
    //   "illness": "string",
    //   "location": "string",
    //   "mobileNo": 0,
    //   "name": "string",
    //   "state": "string",
    //   "units": 1
    // }

}
