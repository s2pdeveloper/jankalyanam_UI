import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ApiService } from 'src/app/core/services';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  routes: any = {
    sign_in: 'user/signUp',
    register: 'user/register',
    login: 'user/login',
    forget_password: 'user/forget-password',
    reset_password: 'user/reset-password',
    set_password: 'user/set-password',
  };

  constructor(private http: ApiService, public router: Router) {}

  createUser(userPayload) {
    return this.http.post(this.routes.register, userPayload);
  }

  signInUser(userPayload) {
    return this.http.post(this.routes.sign_in, userPayload);
  }

  login(loginPayload) {
    return this.http
      .post(this.routes.login, loginPayload)
      .pipe(map((res: any) => res));
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('OBUser'));
    return user !== null;
  }

  logout(): void {
    // remove user from local storage to log user out
    if (typeof window !== 'undefined') {
      this.router.navigateByUrl('login');
      localStorage.removeItem('OBUser');
    }
  }
  forgetPassword(payload: any) {
    return this.http
      .post(this.routes.forget_password, payload)
      .pipe(map((res: any) => res));
  }

  resetPass(payload: any) {
    return this.http
      .post(this.routes.reset_password, payload)
      .pipe(map((res: any) => res));
  }
  setPass(payload: any) {
    return this.http
      .post(this.routes.set_password, payload)
      .pipe(map((res: any) => res));
  }
}
