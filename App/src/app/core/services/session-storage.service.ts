import { Injectable } from '@angular/core';


@Injectable()
export class SessionStorageService {
  getItem(arg0: string): any {
    throw new Error('Method not implemented.');
  }
  get(key: string): any { 
    return sessionStorage ? JSON.parse(sessionStorage.getItem(key) as string) : null;
     
  }

  set(key: string, value: any): void {
    if (sessionStorage) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }
  remove(key: string): any {
    sessionStorage ? sessionStorage.removeItem(key) : null;
  }
}
