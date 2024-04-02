import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';
import { IUser } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  routes: any = {
    createPath: `user/register`,
    getByIdPath: (id) => `user/${id}`,
    getAllPath :(params) =>`user/admins?pageNo=${params.page}&pageSize=${params.pageSize}&search=${params.search}`,
    updatePath: (id) => `user/${id}`,
    deletePath: (id) => `user/${id}`, 
    getAttenderPath :(params) =>`user/attenders?pageNo=${params.page}&pageSize=${params.pageSize}&search=${params.search}`,
   
  };
  constructor(private http: ApiService) {}

  createUser(payload) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }
  getAllUsers(params) {
    return this.http
      .get(this.routes.getAllPath(params))
      .pipe(map((res: any) => res));
  }
  updateUser(id, payload: IUser) {
    return this.http
      .put(this.routes.updatePath(id), payload)
      .pipe(map((res: any) => res));
  }
  profile(id) {
    return this.http
      .get(this.routes.getByIdPath(id))
      .pipe(map((res: any) => res));
  }
  deleteUser(id) {
    return this.http
      .delete(this.routes.deletePath(id))
      .pipe(map((res: any) => res));
  }
  getAllAttenderUsers(params) {
    return this.http
      .get(this.routes.getAttenderPath(params))
      .pipe(map((res: any) => res));
  }
}
