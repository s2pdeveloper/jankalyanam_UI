import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class BloodDonationService {
  routes: any = {
    create: `donate`,
    getAttenderListPath: (params: any) => `donate/attender-list?pageNo=${params.pageNo}&pageSize=${params.pageSize}&sortBy=${params.sortBy}&search=${params.search}&type=${params.type}`,
    getAdminListPath: (params: any) => `donate/admin-list?pageNo=${params.pageNo}&pageSize=${params.pageSize}&sortBy=${params.sortBy}&search=${params.search}&type=${params.type}`,

  };
  constructor(private http: ApiService) {}

  create(payload: any) {
    return this.http.post(this.routes.create, payload);
  }

  getAllAttenderList(params:any,type: any) {
    params.type = type;
    return this.http.get(this.routes.getAttenderListPath(params));
  }
  getAllAdminList(params:any,type: any) {
  params.type = type;
  return this.http.get(this.routes.getAdminListPath(params));
  }
}
