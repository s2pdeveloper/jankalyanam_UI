import { Location } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { ImageService } from '../../../services/images/image.service';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss'],
})
export class ImageFormComponent implements OnInit {
  submitted = false;
  fileContent: any;
  images: any;
  choosen: boolean;

  imageForm = this.formBuilder.group({
    id: new FormControl(''),
    type: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    image: new FormControl(),
    status: new FormControl('Active'),
  });

  params: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private imageService: ImageService,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      this.imageForm.controls.type.setValue(params.type);
      this.params = params;
      if (params.id) {
        this.getById();
      }
    });
  }
  get form() {
    return this.imageForm.controls;
  }

  submit() {
    this.submitted = true;
    if (this.imageForm.invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    }
    let formData = this.imageForm.value;
    if (formData.id) {
      this.update(formData);
    } else {
      delete formData.id;
      this.create(formData);
    }
  }
  create(formData) {
    this.submitted = true;
    if (this.imageForm.invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    }
    const fd = new FormData();
    if (this.images) {
      fd.append('key', 'image');
      fd.append('image', this.images, this.images.name);
      fd.append('name', formData.name);
      fd.append('type', formData.type);
      this.imageService.createImage(fd).subscribe((data) => {
        if (this.params.type == 'Slider') {
          this.router.navigate(['/images/image/1']);
        } else {
          this.router.navigate(['/images/image/2']);
        }
      });
    } else {
      this.toastService.warning('Please upload images');
    }
  }

  update(formData) {
    const fd = new FormData();
    if (this.images) {
      fd.append('key', 'image');
      fd.append('image', this.images, this.images.name);
    }
    fd.append('id', formData.id);
    fd.append('type', formData.type);
    fd.append('name', formData.name);
    this.imageService.updateImage(this.params.id, fd).subscribe((success) => {
      this.toastService.success(success.message);
      if (this.params.type == 'Slider') {
        this.router.navigate(['/images/image/1']);
      } else {
        this.router.navigate(['/images/image/2']);
      }
    });
  }

  getById() {
    this.imageService.getImageById(this.params.id).subscribe((success) => {
      this.imageForm.patchValue(success);
      this.fileContent = success.image;
    });
  }

  fileChoosen(event: any) {
    if (event.target.value) {
      if (event.target.files[0].size > 5000000) {
        this.toastService.warning(
          'Unable to upload image/Video of size more than 5MB'
        );
        return;
      }
      this.images = <File>event.target.files[0];
      console.log("images",this.images);
      
      this.fileContent = this.images;
      const reader = new FileReader();
      reader.readAsDataURL(this.images);
      reader.onload = () => {
        this.fileContent = reader.result;
      };
      reader.onerror = (error) => {};
      this.choosen = true;
    }
  }

  goBack() {
    this.location.back();
  }

  
  /**
    * drag and drop file functionality
    */
   @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
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
      console.log("files[0]",files[0]);
      this.images = files[0];
      this.fileContent = this.images;
      const reader = new FileReader();
      reader.readAsDataURL(this.images);
      reader.onload = () => {
        this.fileContent = reader.result;
      };
      reader.onerror = (error) => {};
      this.choosen = true;
    }
    this.fileDropEl.nativeElement.value = "";
    // this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
 

}
