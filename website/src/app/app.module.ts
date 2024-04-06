import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { LandingLayoutModule } from './features/landing-layout/landing-layout.module';
import { DonatebloodModule } from './features/donateblood/donateblood.module';
import { RequestbloodModule } from './features/requestblood/requestblood.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,LandingLayoutModule,DonatebloodModule, RequestbloodModule
  ], 
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
