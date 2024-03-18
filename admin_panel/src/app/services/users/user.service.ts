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
    getByIdPath: (id) => `user/profile/${id}`,
    getAllPath: `user/getAll`,
    updatePath: (id) => `user/update/${id}`,
    deletePath: (id) => `user/delete/${id}`,
  };
  constructor(private http: ApiService) {}

  createUser(payload) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }
  getAllUsers(payload) {
    return this.http
      .get(this.routes.getAllPath, payload)
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
}
