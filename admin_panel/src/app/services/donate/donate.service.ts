import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services';
@Injectable({
  providedIn: 'root',
})
export class DonateService {
  routes: any = {
    getAllDonate: `donate/all`,
    getByIdPath:(id:any)=>`donate/${id}`
  };

  constructor(private http: ApiService) {}
  getAll(payload:any) {
    return this.http.get(this.routes.getAllDonate,payload);
  }
  getById(id:any){
    return this.http.get(this.routes.getByIdPath(id))

  }
}
