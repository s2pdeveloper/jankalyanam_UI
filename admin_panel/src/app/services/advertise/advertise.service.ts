import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';
@Injectable({
  providedIn: 'root',
})
export class AdvertiseService {

  routes: any = {

    createPath: `user/register`,
    getByIdPath: (id) => `user/profile/${id}`,
    getAllPath: (params) => `user/admins?pageNo=${params.page}&pageSize=${params.pageSize}&search=${params.search}`,
    updatePath: (id) => `user/update/${id}`,
    deletePath: (id) => `user/delete/${id}`,
  };

  constructor(private http: ApiService) { }

  create(payload) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }
  getAll(params) {
    return this.http
      .get(this.routes.getAllPath(params))
      .pipe(map((res: any) => res));
  }
  getById(id) {
    return this.http
      .get(this.routes.getByIdPath(id))
      .pipe(map((res: any) => res));
  }
  update(id, payload) {
    return this.http
      .put(this.routes.updatePath(id), payload)
      .pipe(map((res: any) => res));
  }

  delete(id) {
    return this.http
      .delete(this.routes.deletePath(id))
      .pipe(map((res: any) => res));
  }
}