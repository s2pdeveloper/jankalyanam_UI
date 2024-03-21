import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  routes: any = {
    register: 'user/register',
    login: 'user/login',
    getByIdPath: (id: string) => `user/profile/${id}`,
    updatePath: (id: string) => `user/update/${id}`,
    forget_password: 'user/forgot-password',
    reset_password: 'user/reset-password',
    set_password: 'user/set-password',
    createAndUpdateUserDevice: 'user/createAndUpdateUserDevice',
    emailVerifyPath: 'user/email-verify',
    resetPinVerifyPath: 'user/resetPinVerify',
  };

  constructor(
    private http: ApiService,
    // private storageservice: StorageService,
    public router: Router
  ) {}

  register(userPayload: any) {
    return this.http.post(this.routes.register, userPayload);
  }

  login(userPayload: any) {
    return this.http.post(this.routes.login, userPayload);
  }
  updateUser(id: string, payload: any) {
    return this.http.put(this.routes.updatePath(id), payload);
  }
  profile(id: string) {
    return this.http.get(this.routes.getByIdPath(id));
  }
  getCurrentUser() {
    let x: any = localStorage.getItem('Student');
    return JSON.parse(x);
  }
  isLoggedIn() {
    return this.getCurrentUser() !== null;
  }

  forgetPassword(userPayload: any) {
    return this.http.post(this.routes.forget_password, userPayload);
  }

  resetPassword(userPayload: any) {
    return this.http.post(this.routes.reset_password, userPayload);
  }

  setPassword(userPayload: any) {
    return this.http.post(this.routes.set_password, userPayload);
  }
  createAndUpdateUserDevice(userPayload: any) {
    return this.http.post(this.routes.createAndUpdateUserDevice, userPayload);
  }
  emailVarify(userPayload: any) {
    return this.http.post(this.routes.emailVarifyPath, userPayload);
  }
  resetPinVerify(userPayload: any) {
    return this.http.post(this.routes.resetPinVerifyPath, userPayload);
  }
}
