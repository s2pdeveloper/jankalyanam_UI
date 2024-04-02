import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/local-storage.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { ModalService } from "src/app/service/modal.service";
import { AdminRequestActiveComponent } from 'src/app/shared/models/admin-request-active/admin-request-active.component';
import { AdminRequestMylistComponent } from 'src/app/shared/models/admin-request-mylist/admin-request-mylist.component';

@Component({
  selector: 'app-admin-request',
  templateUrl: './admin-request.page.html',
  styleUrls: ['./admin-request.page.scss'],
})
export class AdminRequestPage implements OnInit {

  activeSegment = 'list';
  currentTitle = 'Request';
  constructor(  private modalService: ModalService,
    private localStorage: StorageService,
    private spinner: LoaderService,
    private toast: ToastService,) { }

  ngOnInit() {
  }

  openModel(key: string) {
    let data={}
    switch (key) {
      case "list":
        this.modalService.openModal(AdminRequestMylistComponent, {data});
        break;
      case "details":
        this.modalService.openModal(AdminRequestActiveComponent, { data });
        break;
        // case "list":
        //   this.modalService.openModal(BloodrequestMylistComponent, { data });
        //   break;
  
      default:
        break;
    }
  }

}
