import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.page.html',
  styleUrls: ['./change-language.page.scss'],
})
export class ChangeLanguagePage implements OnInit {

  constructor(private modalController: ModalController,) { }

  ngOnInit() {
  }
  dismiss() {
    this.modalController.dismiss();
  }
}
