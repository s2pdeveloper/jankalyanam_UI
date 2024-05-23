import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { LoaderService } from 'src/app/service/loader.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { RestService } from 'src/app/core/services/rest.service';
import { ModalController } from '@ionic/angular';
import { CalenderComponent } from "src/app/shared/models/calender/calender.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    private router: Router,
    private service: AuthService,
    private toast: ToastService,
    private spinner: LoaderService,
    private activatedRoute: ActivatedRoute,
    private restService: RestService,
    private modalController: ModalController,



  ) {}
  states: any = [];
  district: any = [];
  tehsil: any = [];
  village: any = [];
  bloodGroup: any = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  @ViewChild("selectableState") selectableState: any = IonicSelectableComponent;
  ngOnInit() {}
  registrationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    mobileNo: new FormControl('', [Validators.required,Validators.maxLength(12),Validators.minLength(10)]),
    DOB: new FormControl("", [Validators.required]),
    pincode :  new FormControl("", [Validators.required]),
    password: new FormControl('', [Validators.required]),
    bloodGroup: new FormControl("", [Validators.required]),
    district:  new FormControl("", [Validators.required]),
    tehsil :  new FormControl("", [Validators.required]),
    village :  new FormControl("", [Validators.required]),
    role:new FormControl('ATTENDER'),
  });

  ionViewWillEnter() {
      this.activatedRoute.snapshot.paramMap.get("value") == "true";
    this.states = this.restService.getStatesOfCountry("IN");
    console.log("this.states-----", this.states);
  }
  get f() {
    return this.registrationForm.controls;
  }
  async register() {
    if (this.registrationForm.invalid) {
      this.toast.successToast('Please fill required fields!');
      return;
    }
    await this.spinner.show();
    this.service.register(this.registrationForm.value).subscribe(
      async (success: any) => {
        this.toast.successToast(success.message);
        this.registrationForm.reset();
        await this.spinner.hide();
        this.router.navigate(['/auth/login']);
      },
      async (error: any) => {
        await this.spinner.hide();
        this.toast.errorToast(error.error);
      }
    );
  }
  async openCalender(field: any) {
    let date = this.f[field].value
      ? new Date(this.f[field].value).toISOString()
      : new Date().toISOString;
    const modal: any = await this.modalController.create({
      component: CalenderComponent,
      cssClass: "calender-model",
      componentProps: {
        date,
      },
    });

    await modal.present();
    await modal.onWillDismiss().then((data: any) => {
      console.log("data---", data);

      if (data.data && data.data.date) {
        this.f[field].setValue(data.data.date);
      }
    });
  }
}
