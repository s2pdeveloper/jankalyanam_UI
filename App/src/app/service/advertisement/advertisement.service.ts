import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
routes : any ={
  getAllAdvertisemnt : () =>`advertise/all`
}
  constructor(private http: ApiService) { }
  
  getAllAdvertisemnt(){
    return this.http.get(this.routes.getAllAdvertisemnt());
  }
}
