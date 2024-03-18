import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '@services/customer/customer.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
})
export class Page1Component implements OnInit {
 
  billData: any = [];
  conditionArray : any =  ['saving opportunity', 'contact MSEDCL']
  constructor(
    private service: CustomerService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.actRoute.queryParams.subscribe((params) => {
      console.log('params data-----',params);
      
      this.getAll(params.month, params.id);
    });
  }

  getAll(month:any, id:any) {
    let payload = {
      month: month,
      id: id,
    };

    this.service.getPdfDataPath(payload).subscribe((success) => {
      console.log('succc', success);
      this.billData = success;
    });
  }
}
