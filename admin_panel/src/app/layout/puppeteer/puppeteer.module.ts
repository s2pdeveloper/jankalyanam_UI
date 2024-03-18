import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page1Component } from './page1/page1.component';
import { CoreModule } from 'src/app/core/core.module';
import { PuppeteerRoutingModule } from './puppeteer-routing.module';


@NgModule({
  declarations: [
    Page1Component
  ],
  imports: [
    PuppeteerRoutingModule,
    CoreModule.forRoot(),CommonModule
  ]
})
export class PuppeteerModule { }
