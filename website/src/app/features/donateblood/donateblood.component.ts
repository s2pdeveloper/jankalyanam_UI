import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DonateService } from 'src/app/service/donate.service';

@Component({
  selector: 'app-donateblood',
  templateUrl: './donateblood.component.html',
  styleUrls: ['./donateblood.component.scss']
})
export class DonatebloodComponent {
  constructor(private donate :DonateService){}

  donateForm = new FormGroup({
    name: new FormControl(''),
    gender: new FormControl(''),
    age: new FormControl(''),
    bloodGroup: new FormControl(''),
    hemoglobin: new FormControl(''),
    donationDate: new FormControl(''),
    illness: new FormControl(''),
    mobileNo: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl('')
  });

  submit(){
    console.log("this.donateForm.value",this.donateForm.value);
    this.donate.post(this.donateForm.value).subscribe(success => {
      console.log("success of donate ",success);
      this.donateForm.reset();
    })
  }
}
