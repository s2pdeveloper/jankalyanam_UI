import {Component} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {ValidationService} from "../../core/components";
import {AuthService} from "../../services/auth/auth.service";
@Component({
    selector: "app-dashboard",
    templateUrl: "register.component.html",
    styleUrls: ["register.component.scss"],
})
export class RegisterComponent {
    submitted = false;

    registerForm = this.formBuilder.group(
        {
            // userName: new FormControl("userName", [Validators.required]),
            firstName: new FormControl("firstName", [Validators.required]),
            lastName: new FormControl("lastName", [Validators.required]),
            email: new FormControl("test@gmail.com", [Validators.required, this.validationService.emailValidator]),
            mobile: new FormControl("9090909090", [Validators.required, this.validationService.mobileValidator]),
            password: new FormControl("customer@123", [Validators.required]),
            confirmPassword: new FormControl("customer@123", [Validators.required]),
            role: new FormControl("CUSTOMER", [Validators.required]),
        },
        {
            validator: this.validationService.MustMatch("password", "confirmPassword"),
        }
    );

    constructor(
        private router: Router,
        private spinner: NgxSpinnerService,
        public authService: AuthService,
        private formBuilder: FormBuilder,
        private validationService: ValidationService,
        private toastService: ToastrService
    ) {}

    navigateTo(page: string) {
        this.router.navigate([`${page}`]);
    }

    register() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        } else {
            this.spinner.show();
            this.authService.createUser(this.registerForm.value).subscribe(
                success => {
                    this.toastService.success("Registration done Successfully");
                    this.router.navigate(["/login"]);
                    this.spinner.hide();
                }
            );
        }
    }

    signIn(){
        this.submitted = true;
        console.log('sign in begain---------->');
        console.log('registerForm Start------->',this.registerForm.value);
        
        if (this.registerForm.invalid) {
            console.log("error----------->");
            console.log('registerForm------->',this.registerForm.value);
            
            return;
        } else {
            console.log("else start---->");
            
            this.spinner.show();
            console.log("spinner---->");
            
            this.authService.signInUser(this.registerForm.value).subscribe(
                success => {
                    this.toastService.success("Registration done Successfully");
                    this.router.navigate(["/login"]);
                    this.spinner.hide();
                }
                
                
            );
           
        }
        console.log('success------->',this.registerForm.value);
    }
    get form() {
        return this.registerForm.controls;
    }
}
