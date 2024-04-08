import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'; 
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnInit {
  @Input() date: any
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log('1111111', this.date);
    
  }

  async closeModal() {
    await this.modalController.dismiss({
      dismissed: false,
      date: this.date.split('T')[0],
    });
  }

  dismiss() {
     this.modalController.dismiss();
  }
}
