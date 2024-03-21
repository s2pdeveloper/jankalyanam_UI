import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiPrefixInterceptorProvider } from './interceptors';
import { StorageService } from './services';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    ApiPrefixInterceptorProvider,StorageService
  ]
})
export class CoreModule { }
