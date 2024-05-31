import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class BloodDonationService {
  routes: any = {
    create: `donate`,
    getAttenderListPath: (params: any) => `donate/attender-list?pageNo=${params.pageNo}&pageSize=${params.pageSize}&sortBy=${params.sortBy}&search=${params.search}&type=${params.type}&bloodBankName=${params.bloodBankName}&bloodGroup=${params.bloodGroup}&donationDate=${params.donationDate}`,
    getAdminListPath: (params: any) => `donate/admin-list?pageNo=${params.pageNo}&pageSize=${params.pageSize}&sortBy=${params.sortBy}&search=${params.search}&type=${params.type}&bloodBankName=${params.bloodBankName}&bloodGroup=${params.bloodGroup}&donationDate=${params.donationDate}`,
    allocatePath:(id:any) => `donate/update/${id}`,
    statusUpdatePath:(id:any,status:any) => `donate/updateStatus?id=${id}&status=${status}`,
    getDonorListPath: (params: any) => `donate/blood-donor?pageNo=${params.pageNo}&pageSize=${params.pageSize}&sortBy=${params.sortBy}&group=${params.group}`,

    
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

  allocate(id:any,body:any){
    return this.http.put(this.routes.allocatePath(id),body);
  }

  statusUpdate(id:any,status:any){
    return this.http.put(this.routes.statusUpdatePath(id,status));
  }

  getDonorList(params){
    return this.http.get(this.routes.getDonorListPath(params));
  }
}
