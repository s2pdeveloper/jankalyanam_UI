import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blood-donations',
  templateUrl: './blood-donations.page.html',
  styleUrls: ['./blood-donations.page.scss'],
})
export class BloodDonationsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  activeSegment = 'latest';
  currentTitle = 'Donate';
}
