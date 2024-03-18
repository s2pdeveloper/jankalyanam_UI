import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
 
import { QuestionsService } from '@services/questions/questions.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-question-list',
  templateUrl: './sub-question-list.component.html',
  styleUrls: ['./sub-question-list.component.scss']
})
export class SubQuestionListComponent implements OnInit {
  Questions: any = [];
  collection: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  selectedRow: any = {};
  subQuestion: any = [];
  parentId:string;


  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastService: ToastrService,
    private questionService: QuestionsService,
    private modalService: NgbModal,
    private location: Location,



  ) { }

  ngOnInit(): void {
    this.actRoute.queryParams.subscribe(params=>{
      console.log("params-----------",params)
      if (params.id) {
        this.childByParentId(params.id);
        console.log(params.id);
         this.parentId = params.id;
      }
    })
  
  }
  navigateTo(path: any, id: string) {
    if (id) {
      this.router.navigate([path], { queryParams: { id: id } });
    } else {
      this.router.navigate([path]);
    }
  }

  refreshList(title) {
    this.search = title == 'clear' ? '' : this.search;
    this.childByParentId(this.parentId);
  }

  onChangePage(pageNo) {
    if (pageNo > 0) {
      this.page = pageNo;
    }
    this.childByParentId(this.parentId);
  }

  open(u, content) {
    this.selectedRow = u;
    this.modalService.open(content, { centered: true });
  }
  
   

  childByParentId(id:any) {
     
    let payload = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
      parentId: id ,
    };
    this.questionService.getChildByParentId(payload).subscribe((success) => {
      console.log("success",success);
      this.subQuestion = success.rows;
      
    });

  }
  // getAll() {
  //   this.spinner.show();
  //   let payload = {
  //     page: this.page,
  //     pageSize: this.pageSize,
  //     search: this.search,
  //   };
  //   this.questionService.getAllQuestions
  //     (payload).subscribe((success) => {
  //       this.Questions = success.rows;
  //       this.collection = success.count;
  //       console.log(this.Questions);
  //       this.spinner.hide();
  //     });
  // }
  update(id:string){
    this.router.navigate(['/questions/sub-question-form'], { queryParams: { childId: id } });
  }
  deleteQuestion(id:string) {
    this.questionService.deleteQuestion(id).subscribe(
      (success) => {
        this.childByParentId(this.parentId);
         
        this.toastService.success(success.message);
      
        
      },

       
    );
  }

  goBack() {
    this.location.back();
  }


}
