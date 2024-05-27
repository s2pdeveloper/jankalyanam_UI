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
    getByIdPath: (id: string) => `user/${id}`,
    updatePath: (id: string) => `user/${id}`,
    imageUpdatePath: `user/profile`,
    forget_password: 'user/forgot-password',
    reset_password: 'user/reset-password',
    changePasswordPath: 'user/change',
    createAndUpdateUserDevice: 'user/createAndUpdateUserDevice',
    emailVerifyPath: 'user/email-verify',
    resetPinVerifyPath: 'user/resetPinVerify',
    deviceIdPath: (deviceId: string) => `user-device?deviceId=${deviceId}`,
    listPath: `address/list`,
    verifyMobilePath:(mobileNo: string) =>`user/forget?mobileNo=${mobileNo}`,
    otpPath:(email: string,mobileNo: string) =>`user/sendMail?mobileNo=${mobileNo}&email=${email}`,
    verifyOTPPath:(otp: string,mobileNo: string) =>`user/verify?mobileNo=${mobileNo}&otp=${otp}`,
    setPasswordPath:(password: string,mobileNo: string) =>`user/setPassword?mobileNo=${mobileNo}&password=${password}`
   
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

  resetPassword(userPayload: any) {
    return this.http.post(this.routes.reset_password, userPayload);
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

  addDeviceId(deviceId:string) {
    return this.http.post(this.routes.deviceIdPath(deviceId));
  }

  updateImage(imageData:any){
    return this.http.put(this.routes.imageUpdatePath,imageData);
  }

  list(){
    return this.http.get(this.routes.listPath);
  }

  forgetPassword(mobileNo:string){
    return this.http.post(this.routes.verifyMobilePath(mobileNo));
  }

  otp(email:string,mobileNo:string){
    return this.http.post(this.routes.otpPath(email,mobileNo));
  }
  verifyOTP(otp:number,mobileNo:string){
    return this.http.post(this.routes.verifyOTPPath(otp,mobileNo));
  }
  setPassword(password:string,mobileNo:string){
    return this.http.post(this.routes.setPasswordPath(password,mobileNo));
  }

  changePassword(data:any){
    return this.http.post(this.routes.changePasswordPath,data);
  }
}
