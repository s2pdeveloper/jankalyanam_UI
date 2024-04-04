import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services';
@Injectable({
  providedIn: 'root',
})
export class BloodRequestService {
  routes: any = {
    getAllBloodRequest: `blood-request/all`,
    getByIdPath:(id:any)=> `blood-request/${id}`,
  };

  constructor(private http: ApiService) {}
  getAll(payload:any) {
    return this.http.get(this.routes.getAllBloodRequest,payload);
  }

  getById(id:any){
    return this.http.get(this.routes.getByIdPath(id))

  }

}

