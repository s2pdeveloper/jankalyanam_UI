import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalenderComponent } from '../calender/calender.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';

@NgModule({
  declarations: [CalenderComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, IonicModule,IonicSelectableComponent],
  exports: [CalenderComponent,IonicSelectableComponent],
})
export class SharedModule {}
