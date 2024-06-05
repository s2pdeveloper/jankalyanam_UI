import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { ChangeLanguagePageRoutingModule } from './change-language-routing.module';

import { ChangeLanguagePage } from './change-language.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeLanguagePageRoutingModule,SharedModule
  ],
  declarations: [ChangeLanguagePage]
})
export class ChangeLanguagePageModule {}
