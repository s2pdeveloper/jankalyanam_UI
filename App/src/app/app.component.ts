import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor() {}
}
