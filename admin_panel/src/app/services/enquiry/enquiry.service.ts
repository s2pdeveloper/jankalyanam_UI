import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class EnquiryService {
  routes: any = {
    enquiryGetAllPath: ({ page, pageSize, search }) =>
      `enquiry/getAll?page=${page}&pageSize=${pageSize}&search=${search}`,

    collaborateGetAllPath: ({ page, pageSize, search }) =>
      `collaborate/getAll?page=${page}&pageSize=${pageSize}&search=${search}`,
  };
  constructor(private http: ApiService) {}

  enquiryGetAll(params) {
    return this.http
      .get(this.routes.enquiryGetAllPath(params))
      .pipe(map((res: any) => res));
  }

  collaborateGetAll(params) {
    return this.http
      .get(this.routes.collaborateGetAllPath(params))
      .pipe(map((res: any) => res));
  }
}
