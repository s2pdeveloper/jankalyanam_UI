import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-admin-request-mylist',
  templateUrl: './admin-request-mylist.component.html',
  styleUrls: ['./admin-request-mylist.component.scss'],
})
export class AdminRequestMylistComponent  implements OnInit {

  constructor(
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {}
  navigate(){
    console.log('in naviatge');
    this.modalController.dismiss()
    
    this.router.navigate(['/layout/donate'])
  }
  dismiss() {
    this.modalController.dismiss();
  }
}
