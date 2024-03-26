import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-bloodrequest-mylist',
  templateUrl: './bloodrequest-mylist.component.html',
  styleUrls: ['./bloodrequest-mylist.component.scss'],
})
export class BloodrequestMylistComponent  implements OnInit {

  @Input() data :any;
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
