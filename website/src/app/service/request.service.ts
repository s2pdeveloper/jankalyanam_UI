import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl: string;
  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiEndPoint;
  }
  
  post(data: any) {
    const url = `${this.baseUrl}blood-request`; 
    return this.http.post(url, data);
  }
}
