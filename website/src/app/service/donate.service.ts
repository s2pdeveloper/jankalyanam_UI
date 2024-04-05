import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DonateService {
  private baseUrl: string;
  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiEndPoint;
  }
  
  post(data: any) {
    const url = `${this.baseUrl}donate`; 
    return this.http.post(url, data);
  }
}


