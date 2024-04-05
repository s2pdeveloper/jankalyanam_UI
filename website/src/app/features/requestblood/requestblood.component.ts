import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-requestblood',
  templateUrl: './requestblood.component.html',
  styleUrls: ['./requestblood.component.scss']
})
export class RequestbloodComponent {
  constructor(private request : RequestService){}

  requestForm = new FormGroup({
    name: new FormControl(''),
    gender: new FormControl(''),
    age: new FormControl(''),
    bloodGroup: new FormControl(''),
    hemoglobin: new FormControl(''),
    illness: new FormControl(''),
    mobileNo: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    bloodRequireDate: new FormControl(''),
    fatherOrHusband: new FormControl(''),
    location: new FormControl(''),
    units: new FormControl('')
  });

  submit(){
    console.log("this.requestForm.value",this.requestForm.value);
    this.request.post(this.requestForm.value).subscribe(success => {
      console.log("success of donate ",success);
      this.requestForm.reset();
    })
  }
}

