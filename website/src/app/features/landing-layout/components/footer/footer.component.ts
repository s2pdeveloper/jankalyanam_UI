import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private router: Router) {}
  lastScrollTop = 0;

  scrollToTop(section: any) {
    var element: any = document.getElementById(section);
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
  navigateTo(path: any) {
    this.router.navigate([path]);
  }
}
