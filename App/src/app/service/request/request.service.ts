
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class BloodRequestService {
  routes: any = {
    create: 'blood-request',
    getAttenderListPath: (params: any) => `blood-request/attender-list?pageNo=${params.pageNo}&pageSize=${params.pageSize}&sortBy=${params.sortBy}&search=${params.search}&type=${params.type}&bloodGroup=${params.bloodGroup}&bloodType=${params.bloodType}&hospitalName=${params.hospitalName}`,
    getAdminListPath: (params: any) => `blood-request/admin-list?pageNo=${params.pageNo}&pageSize=${params.pageSize}&sortBy=${params.sortBy}&search=${params.search}&type=${params.type}&bloodGroup=${params.bloodGroup}&bloodType=${params.bloodType}&hospitalName=${params.hospitalName}`,
    statusUpdatePath:(id:any,status:any) => `blood-request/update?id=${id}&status=${status}`,
    allocatePath:(id:any) => `blood-request/update/${id}`,
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

  statusUpdate(id:any,status:any){
  return this.http.put(this.routes.statusUpdatePath(id,status));
}
allocate(id:any,body:any){
  return this.http.put(this.routes.allocatePath(id),body);
}
}
