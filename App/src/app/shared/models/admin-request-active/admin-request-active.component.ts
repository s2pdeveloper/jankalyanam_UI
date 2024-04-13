import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-admin-request-active',
  templateUrl: './admin-request-active.component.html',
  styleUrls: ['./admin-request-active.component.scss'],
})
export class AdminRequestActiveComponent  implements OnInit {
  @Input() data :any;
  providedBy:string = null;
  constructor(
    private modalController: ModalController,
    private router: Router,
  ) {}

  ngOnInit() {
    console.log("data----------------",this.data);
    
    this.providedBy = !!this.data.provided ? this.data.provided : null;
  }
  goBack() {
    this.modalController.dismiss();
  }
  // goBack(){
  //   //  this.location.back()
  //     this.router.navigate(['/layout/blood-requests']);
  //   }
}
