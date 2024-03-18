import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService } from '@services/questions/questions.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';




@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  Questions: any = [];
  collection: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  selectedRow: any = {};


  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastService: ToastrService,
    private questionService: QuestionsService,
    private modalService: NgbModal,
    private location: Location,



  ) { }

  ngOnInit(): void {
    this.getAll();
  }
  navigateTo(path: any, _id: string) {
    if (_id) {
      this.router.navigate([path], { queryParams: { id: _id } });
    } else {
      this.router.navigate([path]);
    }
  }

  refreshList(title) {
    this.search = title == 'clear' ? '' : this.search;
    this.getAll();
  }

  onChangePage(pageNo) {
    if (pageNo > 0) {
      this.page = pageNo;
    }
    this.getAll();
  }

  open(u, content) {
    this.selectedRow = u;
    this.modalService.open(content, { centered: true });
  }


  getAll() {
    this.spinner.show();
    let payload = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
    };
    this.questionService.getAllQuestions
      (payload).subscribe((success) => {
        this.Questions = success.rows;
        this.collection = success.count;
        console.log(this.Questions);
        this.spinner.hide();
      });
  }

  deleteQuestion(_id:string) {
    this.questionService.deleteQuestion(_id).subscribe(
      (success) => {
        this.getAll();
        this.modalService.dismissAll()
        this.toastService.success(success.message);
      },
       
    );
  }

  goBack() {
    this.location.back();
  }

  // openModel(u,content){
  //   this.modalService.open(content,{
  //     centered:true,
  //     size:'lg'
  //   })
  // }


}
