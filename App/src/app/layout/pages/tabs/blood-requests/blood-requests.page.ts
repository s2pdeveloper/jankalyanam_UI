import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blood-requests',
  templateUrl: './blood-requests.page.html',
  styleUrls: ['./blood-requests.page.scss'],
})
export class BloodRequestsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  activeSegment = 'active';
  currentTitle = 'Request';


  //{
    //   "age": 0,
    //   "bloodGroup": "string",
    //   "bloodRequireDate": "2024-03-21T07:15:41.087Z",
    //   "city": "string",
    //   "hemoglobin": 0,
    //   "illness": "string",
    //   "location": "string",
    //   "mobileNo": 0,
    //   "name": "string",
    //   "state": "string",
    //   "units": 1
    // }

}
