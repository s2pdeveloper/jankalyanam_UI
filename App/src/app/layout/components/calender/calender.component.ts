import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'; 
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnInit {
  @Input() date: string=''; 
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async closeModal() {
    await this.modalController.dismiss({
      dismissed: false,
      date: this.date,
    });
  }

  dismiss() {
     this.modalController.dismiss();
  }
}
