import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestbloodComponent } from './requestblood.component';

const routes: Routes = [{ path: '', component: RequestbloodComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestbloodRoutingModule { }
