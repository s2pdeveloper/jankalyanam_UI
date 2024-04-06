import { Injectable } from '@angular/core';
import { Country, State, City } from 'country-state-city';
@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor() {}

  getCountries() {
    return Country.getAllCountries();
  }

  getStatesOfCountry(countryCode:any) {
    return State.getStatesOfCountry(countryCode);
  }

  getCitiesOfState(countryCode:any, stateCode:any) {
    return City.getCitiesOfState(countryCode, stateCode);
  }
}