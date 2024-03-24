import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }
  navigateTo(url: string) {
    console.log(url);
    this.route.navigate([url])
  }

}
