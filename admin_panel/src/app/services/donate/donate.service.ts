import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services';
@Injectable({
  providedIn: 'root',
})
export class DonateService {
  routes: any = {
    getAllDonate: `donate/all`,
  };

  constructor(private http: ApiService) {}
  getAll(payload:any) {
    return this.http.get(this.routes.getAllDonate,payload);
  }
}
