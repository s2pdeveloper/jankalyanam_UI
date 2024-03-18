import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/core/services';
import { CustomerService } from '../../../services/customer/customer.service';

 

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  organizationId: any = [];
  collection: number = 0;
  Employee: any =[];
  page = 1;
  pageSize = 25;



  constructor( 
    private router: Router,
    private storageService: StorageService,
    private customerService: CustomerService,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private actRoutes: ActivatedRoute,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
     this.actRoutes.queryParams.subscribe((params) => {
    console.log(params);
    if(params.id){
      this.organizationId = params.id;
      
      console.log("this.organizationId",this.organizationId);
      this.customerService.getEmpByOrgId(params.id).subscribe((success) => {
              console.log("success",success);
      
              this.Employee = success.rows;
              this.collection = success.count;
              console.log("this.Employee------>",this.Employee);
      
              this.spinner.hide();
   
    
    
    });
  }
})
  }
  

  
  navigateTo(path, id) {
    if (id) {
      this.router.navigate([path], { queryParams: { id:id } });
    } else {
      this.router.navigate([path]);
    }
  }

  

}
