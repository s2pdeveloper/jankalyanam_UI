import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  getItem(arg0: string): any {
    throw new Error('Method not implemented.');
  }
  get(key: string): any { 
    return localStorage ? JSON.parse(localStorage.getItem(key) as string) : null;
     
  }

  set(key: string, value: any): void {
    if (localStorage) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  remove(key: string): any {
     localStorage ? localStorage.removeItem(key) : null;
  }
}
