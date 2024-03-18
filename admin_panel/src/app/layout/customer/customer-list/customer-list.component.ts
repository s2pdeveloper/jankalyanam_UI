import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '@services/customer/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customer: any = [];
  questionList: any = [];
  ansArr: any = [];
  search: any = '';
  name: any = '';
  page = 1;
  pageSize = 25;
  collection: number = 0;
  dropdowns: any[] = [];

  billType: any = [
    { label: 'LT', value: 'LT' },
    { label: 'HT', value: 'HT' },
  ];
  selectedBillType: string = '';

  flag: boolean = false;
  consumerType: any = [
    { label: 'Industrial', value: 'Industrial' },
    { label: 'Commercial', value: 'Commercial' },
    { label: 'Residential', value: 'Residential' },
    { label: 'Others', value: 'Others' },
  ];

  selectedConsumerType: string = '';
  selectedAnswer: any = '';

  constructor(
    private actroute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAll();
    // this.getQue();
  }

  getAll() {
    this.spinner.show();
    let payload = {
      page: this.page,
      pageSize: this.pageSize,
      name: this.name,
      queList: this.questionList,
      billType: this.selectedBillType,
      consumerType: this.selectedConsumerType,
    };


    this.customerService.getAllCustomers(payload).subscribe((success) => {
      this.customer = success.rows;
      this.collection = success.count;
      this.spinner.hide();
    });
  }

  getQue() {
    // console.log('IN+++++++');
    let payload = {
      billType: this.selectedBillType,
      consumerType: this.selectedConsumerType,
    };

    if (this.selectedBillType && this.selectedConsumerType) {
      this.customerService
        .getAllQuestions(payload)
        .subscribe((success: any) => {
          // this.questionList = success.existing;
          success.existing.forEach((item: any) => {
            const dropdown = {
              label: item.displayName,
              options: item.options || [],
              questionId: item._id,
              answer: '',
            };
            this.dropdowns.push(dropdown);
            this.flag = true;
          });
           
        });
    }
  }

  selectedQue(event: any, que) {
    // console.log('Event', event, event.target.value, que);

    let ans = event.target.value;
    let findIndex = null;
    findIndex = this.questionList.findIndex((x) => x.questionId == que.questionId);
    if (findIndex === -1 || this.questionList.length == 0) {
      this.questionList.push({
        questionId: que.questionId,
        answer: ans,
      });
    } else {
      this.questionList[findIndex].answer = ans;
    }


  
    console.log('this.questionList',this.questionList);
    
  }

   clearAll() {
    for (let dropdown of this.dropdowns) {
      dropdown.answer = null; // Clear the answer of each dropdown
    }
    this.name = null;
    
  }


}
