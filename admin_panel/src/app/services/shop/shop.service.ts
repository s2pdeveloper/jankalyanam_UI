import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/httpApi.service';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  routes: any = {
    createPath: `shop/create`,
    getByIdPath: (id) => `shop/getById/${id}`,
    getAllPath: `shop/getAll`,
    updatePath: (id) => `shop/update/${id}`,
    deletePath: (id) => `shop/delete/${id}`,
  };
  constructor(private http: ApiService) {}

  create(payload) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }
  getAll(payload) {
    return this.http
      .get(this.routes.getAllPath, payload)
      .pipe(map((res: any) => res));
  }
  update(id, payload) {
    return this.http
      .put(this.routes.updatePath(id), payload)
      .pipe(map((res: any) => res));
  }
  getById(id) {
    return this.http
      .get(this.routes.getByIdPath(id))
      .pipe(map((res: any) => res));
  }
  delete(id) {
    return this.http
      .delete(this.routes.deletePath(id))
      .pipe(map((res: any) => res));
  }
}
