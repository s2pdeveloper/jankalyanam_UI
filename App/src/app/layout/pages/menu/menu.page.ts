import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public appPages = [
    { title: 'Profile', url: '/folder/inbox', icon: 'person-circle' },
    { title: 'About', url: '/folder/outbox', icon: 'information-circle' },
    { title: 'Language', url: '/folder/favorites', icon: 'language' },
    { title: 'Change Password', url: '/folder/archived', icon: 'key' },
    { title: 'Logout', url: '/auth/login', icon: 'log-out' },
    
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() { }

  ngOnInit() {
  }

}
