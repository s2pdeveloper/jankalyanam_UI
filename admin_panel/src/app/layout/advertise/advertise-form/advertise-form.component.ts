import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { AdvertiseService } from '../../../services/advertise/advertise.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-advertise-form',
  templateUrl: './advertise-form.component.html',
  styleUrls: ['./advertise-form.component.scss']
})
export class AdvertiseFormComponent implements OnInit {

  submitted = false;
  fileContent: any;
  images: any;
  choosen: boolean;

  advertiseForm = this.formBuilder.group({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    // description: new FormControl('', [Validators.required]),
    status: new FormControl('active', [Validators.required]),
    image: new FormControl(),
    // startDate: new FormControl('', [Validators.required]),
    // endDate: new FormControl('', [Validators.required]),


  });
  params: any;
  document: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private advertiseService: AdvertiseService,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
    });
  }

  create() {
    if (this.advertiseForm
      .invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    } else {
      this.spinner.show();
      let fd = new FormData();
      fd.append('key', 'advertise');
      fd.append('title', this.advertiseForm.value.title);
      // fd.append('description', this.advertiseForm.value.description);
      // fd.append('startDate', this.advertiseForm.value.startDate);
      // fd.append('endDate', this.advertiseForm.value.endDate);
      fd.append('status', this.advertiseForm.value.status);
      if (this.images) {
        fd.append('image', this.images, this.images.name);
      }
      this.spinner.show();
      console.log("fd-------",fd);
      this.advertiseService
        .create(fd).subscribe(
          (success) => {
            console.log(success);
            this.toastService.success('Advertise Added Successfully !!');
            this.router.navigate(['/advertise/advertise-list']);
            this.spinner.hide();
          },
        );
    }
  }

  update() {
    if (this.advertiseForm
      .invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    } else {
      let fd = new FormData();
      let obj = this.advertiseForm.value;
      fd.append('key', 'advertise');
      fd.append('title', this.advertiseForm.value.title);
      // fd.append('description', this.advertiseForm.value.description);
      // fd.append('startDate', this.advertiseForm.value.startDate);
      // fd.append('endDate', this.advertiseForm.value.endDate);
      fd.append('status', this.advertiseForm.value.status);

      if (this.images) {
        fd.append('image', this.images, this.images.name);
      }
      this.spinner.show();
      console.log("fd------",fd);
      this.advertiseService
        .update(obj.id, fd).subscribe((success) => {
          console.log(success);
          this.spinner.hide();
          this.toastService.success('Advertise Updated Successfully !!');
          this.router.navigate(['/advertise/advertise-list']);
        });
    }
  }

  getById(id) {
    this.advertiseService
      .getById(id).subscribe((success) => {
        console.log("success------", success);
        this.advertiseForm.patchValue(success);
        this.fileContent = success.imageUrl;
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

