import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-landing-layout',
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.scss']
})
export class LandingLayoutComponent {
  bloodcollectnumber: number = 0;
  bloodCollect: number = 150;
  bloodIssueNumber: number = 0;
  bloodIssue: number = 100;
  campNumber: number = 0;
  campHeld: number = 35;
  private subscription: Subscription;

  constructor(
    private route: Router,
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = interval(10).subscribe(() => {
      this.BloodCollect();
      this.BloodIssue();
      this.Camp();
    });
  }

  BloodCollect() {
    if (this.bloodcollectnumber < this.bloodCollect) {
      this.bloodcollectnumber++;
    }
  }
  BloodIssue(){
    if (this.bloodIssueNumber < this.bloodIssue){
      this.bloodIssueNumber++;
    }
  }
  Camp(){
    if (this.campNumber < this.campHeld){
      this.campNumber++;
    }
  }
}
