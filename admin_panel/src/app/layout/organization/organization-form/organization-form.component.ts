import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '@services/customer/customer.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from 'src/app/core/components';
@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements OnInit {
  fileContent: any;
  images: any;
  choosen: boolean;
  submitted = false;

  organizationForm = this.formBuilder.group(
    {
      // _id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        this.validationService.emailValidator,
      ]),
      address: new FormControl(''),
      mobile: new FormControl('', [Validators.required]),
      limit: new FormControl(''),
      role : new FormControl('Owner')
    },
  );

  fb: any;
  get form() {
    return this.organizationForm.controls;
  }
  constructor(
    private spinner: NgxSpinnerService,
    private customerService: CustomerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    // this.actRoutes.queryParams.subscribe((params) => {
    //   if (params._id) {
    //     this.getById(params._id);
    //   }
    // });
  }

  create() {
    this.spinner.show();
    this.customerService.create(this.organizationForm.value).subscribe((success) => {
      this.spinner.hide();
      this.toastService.success(success.message);
      this.router.navigate(['organization/organization-list']);
    });
  }

  update(formData) {
    this.spinner.show();
    this.customerService
      .update(this.organizationForm.value._id, formData)
      .subscribe((success) => {
        this.submitted = false;
        this.spinner.hide();
        this.toastService.success(success.message);
        this.router.navigate(['customer/customer-list']);
      });
  }

  getById(_id) {
    this.customerService.getById(_id).subscribe((success) => {
      console.log('success----------', success);
      success.confirmPassword = success.password;
      this.organizationForm.patchValue(success);
      this.fileContent = success.imageUrl;
      this.organizationForm.controls.role.disable();
    });
  }

  goBack() {
    this.location.back();
  }

  /**
   * drag and drop file functionality
   */
  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;
  files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files.target.files);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      console.log('files[0]', files[0]);
      this.images = files[0];
      this.fileContent = this.images;
      const reader = new FileReader();
      reader.readAsDataURL(this.images);
      reader.onload = () => {
        this.fileContent = reader.result;
      };
      reader.onerror = (error) => { };
      this.choosen = true;
    }
    this.fileDropEl.nativeElement.value = '';
    // this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
