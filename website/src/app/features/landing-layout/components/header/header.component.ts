import { Component } from '@angular/core';
import { Router,RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  scrollTo(section:any){
    let element:any = document.getElementById(section);
  
    element.scrollIntoView({
      behavior : 'smooth',
      inline : 'nearest',
      block : 'start'
    })
    
  }
navigateTo(path:any){
  this.router.navigate([path])
}
routeTo(section:any){
  setTimeout(() => {
    this.scrollTo(section)
  }, 300);
}
  toggleCollapse() {
    var removeShow: any = document.getElementById('navbarSupportedContent');
    removeShow.classList.remove('show');
  }
}
