import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class BloodRequestService {
  routes: any = {
    create: `blood-request`,
    getAttenderListPath: (type: any) => `blood-request/attender-list/${type}`,
  };
  constructor(private http: ApiService) {}

  create(payload: any) {
    return this.http.post(this.routes.create, payload);
  }
  getAllAttenderList(type: any) {
    return this.http.get(this.routes.getAttenderListPath(type));
  }
}
