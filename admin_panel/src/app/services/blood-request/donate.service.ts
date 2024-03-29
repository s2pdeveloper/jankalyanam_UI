import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services';
@Injectable({
  providedIn: 'root',
})
export class BloodRequestService {
  routes: any = {
    getAllBloodRequest: `/blood-request/admin-list`,
  };

  constructor(private http: ApiService) {}
  getAll() {
    return this.http.get(this.routes.getAllBloodRequest);
  }
}
