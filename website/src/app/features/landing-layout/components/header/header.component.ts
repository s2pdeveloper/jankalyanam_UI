import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  selectedLink: string = '';
  constructor(private router: Router) {}

  scrollTo(section: any) {
    let element: any = document.getElementById(section);
    element.scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
      block: 'start',
    });
  }
  navigateTo(path: any) {
    this.router.navigate([path]);
  }
  routeTo(section: any, destination: string) {
    this.selectedLink = destination;
    setTimeout(() => {
      this.scrollTo(section);
    }, 300);
  }
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  toggleCollapse() {
    var removeShow: any = document.getElementById('navbarSupportedContent');
    removeShow.classList.remove('show');
  }
}
