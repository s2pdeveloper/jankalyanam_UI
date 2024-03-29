import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services';
@Injectable({
  providedIn: 'root',
})
export class DonateService {
  routes: any = {
    getAllDonate: `/donate/admin-list`,
  };

  constructor(private http: ApiService) {}
  getAll() {
    return this.http.get(this.routes.getAllDonate);
  }
}