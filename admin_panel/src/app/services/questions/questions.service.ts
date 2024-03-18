import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services';


@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  routes: any = {
    create:'questions/',
    parentPath:'questions/parentList',
    getAllMasterDataPath:'questions/getAllMasterData',
    getAll:'questions',
    childByParentId:'questions/child',
    update:( id:string)=>`questions/${id}`,
    getById:( id:string)=>`questions/${id}`,
    deletePath: (id:string) => `questions/parents/${id}`,

  };
  constructor(private http: ApiService) {}

  createQuestion(payload:any) {
    return this.http
      .post(this.routes.create, payload)
      .pipe(map((res: any) => res));
  }
  getParentQ(payload:any) {
    return this.http
      .get(this.routes.parentPath, payload)
      .pipe(map((res: any) => res));
  }
  getChildByParentId(params:any) {
    return this.http
      .get(this.routes.childByParentId, params)
      .pipe(map((res: any) => res));
  }
  getAllQuestions(params:any) {
    return this.http
      .get(this.routes.getAll, params)
      .pipe(map((res: any) => res));
  }
  updateQuestion(id:any, payload:any) {
    return this.http
      .put(this.routes.update(id), payload)
      .pipe(map((res: any) => res));
  }
  getByQuestionId(id) {
    return this.http
      .get(this.routes.getById(id))
      .pipe(map((res: any) => res));
  }

  deleteQuestion(id) {
    return this.http
      .delete(this.routes.deletePath(id))
      .pipe(map((res: any) => res));
  }

  getAllMasterData(){
    return this.http.get(this.routes.getAllMasterDataPath)
    .pipe(map((res:any)=>res))
  }
  // deleteCollege(id) {
  //   return this.http
  //     .delete(this.routes.deletePath(id))
  //     .pipe(map((res: any) => res));
  // }
}
