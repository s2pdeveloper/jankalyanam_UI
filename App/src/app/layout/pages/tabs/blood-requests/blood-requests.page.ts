import { Component, OnInit } from '@angular/core';
import { ModalService } from "src/app/service/modal.service";
import { DonationDetailsComponent } from 'src/app/shared/models/donation-details/donation-details.component';
import { DonationHistoryComponent } from 'src/app/shared/models/donation-history/donation-history.component';
import{ BloodrequestMylistComponent} from 'src/app/shared/models/bloodrequest-mylist/bloodrequest-mylist.component';
@Component({
  selector: 'app-blood-requests',
  templateUrl: './blood-requests.page.html',
  styleUrls: ['./blood-requests.page.scss'],
})
export class BloodRequestsPage implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  activeSegment = 'list';
  currentTitle = 'Request';
  
  openModel(key: string) {
    let data={}
    switch (key) {
      case "history":
        this.modalService.openModal(DonationHistoryComponent, {data});
        break;
      case "details":
        this.modalService.openModal(DonationDetailsComponent, { data });
        break;
        case "list":
          this.modalService.openModal(BloodrequestMylistComponent, { data });
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
