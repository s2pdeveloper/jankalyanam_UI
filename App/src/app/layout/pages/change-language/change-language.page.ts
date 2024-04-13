import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { LanguageService } from 'src/app/service/language/language.service';
@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.page.html',
  styleUrls: ['./change-language.page.scss'],
})
export class ChangeLanguagePage implements OnInit {
currentLanguage : string;
  constructor(private modalController: ModalController,
    private languageService : LanguageService
  ) { }

  ngOnInit() {
    this.currentLanguage = this.languageService.getLang();
  }
  dismiss() {
    this.modalController.dismiss();
  }
  change(language: string){
    this.currentLanguage = language; 
    this.languageService.setLang(language);
    
  }
 
  
}
