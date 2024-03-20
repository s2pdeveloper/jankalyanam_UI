import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    mobileNo: new FormControl(''),
    password: new FormControl(''),
  });


  navigateTo(url:string){
    console.log(url);
    this.route.navigate([url])
  }
}
