import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../core/components';
import { NotificationsService } from '../../../services/notifications/image.service';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.scss'],
})
export class NotificationFormComponent implements OnInit {
  submitted = false;
  fileContent: any;
  images: any;
  choosen: boolean;

  notificationForm = this.formBuilder.group({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required]),
    image: new FormControl(),
  });
  params: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
    private notificationsService: NotificationsService,
    private validationService: ValidationService,
    private actRoutes: ActivatedRoute,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.actRoutes.queryParams.subscribe((params) => {
      if (params.id) {
        this.getById(params.id);
      }
    });
  }
  get form() {
    return this.notificationForm.controls;
  }

  submit() {
    this.submitted = true;
    if (this.notificationForm.invalid) {
      this.toastService.warning('Please fill all required field !');
      return;
    }
    let formData = this.notificationForm.value;
    if (formData.id) {
      this.update(formData);
    } else {
      delete formData.id;
      this.create(formData);
    }
  }
  create(formData) {
    const fd = new FormData();
    if (this.images) {
      fd.append('key', 'notification');
      fd.append('image', this.images, this.images.name);
      fd.append('message', formData.message);
      fd.append('title', formData.title);
      this.notificationsService.createNotification(fd).subscribe((success) => {
        this.submitted = false;
        this.toastService.success(success.message);
        this.router.navigate(['/notification/notification-list']);
      });
    } else {
      this.toastService.warning('Please upload notification');
    }
  }
  update(formData) {
    const fd = new FormData();
    if (this.images) {
      fd.append('key', 'notification');
      fd.append('image', this.images, this.images.name);
    }
    fd.append('id', formData.id);
    fd.append('message', formData.message);
    fd.append('title', formData.title);
    this.notificationsService
      .updateNotification(formData.id, fd)
      .subscribe((success) => {
        this.submitted = false;
        this.toastService.success(success.message);
        this.router.navigate(['/notification/notification-list']);
      });
  }
  getById(id) {
    this.notificationsService.getNotificationById(id).subscribe((success) => {
      this.notificationForm.patchValue(success);
      this.fileContent = success.image;
    });
  }
  fileChoosen(event: any) {
    if (event.target.value) {
      if (event.target.files[0].size > 2000000) {
        this.toastService.warning(
          'Unable to upload image of size more than 2MB'
        );
        return;
      }
      this.images = <File>event.target.files[0];
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
}
