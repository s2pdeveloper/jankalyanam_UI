import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';
import { StorageService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
    routes: any = {
    createPath: `organization/signUp`,
    getAllPath: `organization/getAll`,
    createEmpPath:`organization/empSignUp`,
    getAllCustomerPath:`customerBill/getAll`,
    // getquestions :(payload) => `questions/getquestions?type=${payload.billType}&consumerType=${payload.consumerType}`,
    getquestions :`questions/getquestions`,

    getPdfDataPath:`customerBill/pdfDownload`,
    getEmpByOrgId:(id) =>`organization/getEmpByOrgId/${id}`,
    getCustomersDetailsByIdPath: (id) =>`customerBill/getById/${id}`,
    updatePath: (id) => `customer/update/${id}`,
    getByIdPath: (id) => `customer/getById/${id}`,
    deletePath: (id) => `customer/delete/${id}`,
  };
  constructor(private http: ApiService ,private storageService:StorageService) {}

  create(payload) {
    return this.http
      .post(this.routes.createPath, payload)
      .pipe(map((res: any) => res));
  }

  createEmp(payload) {
    return this.http
      .post(this.routes.createEmpPath, payload)
      .pipe(map((res: any) => res));
  }

  getEmpByOrgId(id){
    return this.http
    .get(this.routes.getEmpByOrgId(id))
    .pipe(map((res: any) => res));

  }

  getAllCustomers(params){
    return this.http
      .post(this.routes.getAllCustomerPath, params)
      .pipe(map((res: any) => res));
  }
  getPdfDataPath(payload:any) {
    return this.http
      .post(this.routes.getPdfDataPath,payload)
      .pipe(map((res: any) => res));
  }

  // getAllQuestions(payload:any) {
  //   return this.http.get(this.routes.getquestions,payload)
  //   .pipe(map((res: any) => res));   
  // }

  getAllQuestions(payload: any) {
    const params = new HttpParams()
      .set('billType', payload.billType)
      .set('consumerType', payload.consumerType);
  
    return this.http.get(this.routes.getquestions,  params )
      .pipe(map((res: any) => res));
  }


 
  

  getCustomersDetailsById(id){
    return this.http
    .get(this.routes.getCustomersDetailsByIdPath(id))
    .pipe(map((res: any) => res));

  }
  
  getAll(params) {
    return this.http
      .get(this.routes.getAllPath, params)
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
