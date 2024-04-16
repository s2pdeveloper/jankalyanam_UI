import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { StorageService } from 'src/app/core/services';
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.page.html',
  styleUrls: ['./change-language.page.scss'],
})
export class ChangeLanguagePage implements OnInit {
currentLanguage : string;
  constructor(private modalController: ModalController,
    private storageService:StorageService,
    private translate : TranslateService
  ) { }

  ngOnInit() {
    this.currentLanguage=localStorage.getItem('language')
    if(!this.currentLanguage){
      localStorage.setItem('language','en');
      this.currentLanguage='en'
    }

  }
  dismiss() {
    this.modalController.dismiss();
  }
  change(language: string){
    this.currentLanguage = language; 
    localStorage.setItem('language',language);
    this.translate.use(language); 
  }
 
  
}
