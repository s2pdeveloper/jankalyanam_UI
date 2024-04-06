import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonatebloodComponent } from './donateblood.component';
import { FormGroup } from '@angular/forms';

const routes: Routes = [{ path: '', component: DonatebloodComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonatebloodRoutingModule { }
