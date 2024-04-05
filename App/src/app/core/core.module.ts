import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiPrefixInterceptorProvider } from './interceptors';
import { StorageService } from './services';
import { SessionStorageService } from './services/session-storage.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    ApiPrefixInterceptorProvider,StorageService,SessionStorageService
  ]
})
export class CoreModule { }
