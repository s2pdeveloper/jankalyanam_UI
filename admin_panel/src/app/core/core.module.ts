import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { DragDropDirective } from './../directives';
import {
  AlertComponent,
  AlertService,
  CustomPaginationComponent,
  ValidationMessagesComponent,
  ValidationService,
} from './components/index';

import { AuthGuard } from './guards/index';

import {
  JwtInterceptorProvider,
  ErrorInterceptorProvider,
  ApiPrefixInterceptorProvider,
} from './helpers/index';

import { ApiService, StorageService, UserService } from './services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AlertComponent,
    ValidationMessagesComponent,
    CustomPaginationComponent,
    DragDropDirective,
  ],
  exports: [
    AlertComponent,
    ValidationMessagesComponent,
    CustomPaginationComponent,
    DragDropDirective,
    ToastrModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CommonModule,
    NgbModule,
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        AuthGuard,
        UserService,
        AlertService,
        ValidationService,
        ToastrService,
        ApiService,
        StorageService,
        JwtInterceptorProvider,
        ErrorInterceptorProvider,
        ApiPrefixInterceptorProvider,
      ],
    };
  }
}
