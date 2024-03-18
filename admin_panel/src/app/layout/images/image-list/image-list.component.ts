import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from '../../../services/images/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent implements OnInit {
  selectedRow: any = {};
  imageArr: any = [];
  search: any = '';
  page = 1;
  pageSize = 25;
  collection: any;
  flag: string = '';
  constructor(
    private imageService: ImageService,
    private router: Router,
    private location: Location,
    private modalService: NgbModal,
    private toastService: ToastrService,
    private actRouter: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.actRouter.params.subscribe((params) => {
      if (params.id == 2) {
        this.flag = 'Advertisement';
      } else {
        this.flag = 'Slider';
      }
      this.getAll();
    });
  }

  getAll() {
    this.spinner.show();
    let obj: any = {
      page: this.page,
      pageSize: this.pageSize,
      search: this.search,
      flag: this.flag,
    };

    this.imageService.getImageListing(obj).subscribe((success) => {
      this.imageArr = success.rows;
      this.collection = success.count;
      for (let i = this.imageArr.length - 1; i >= 0; i--) {
        let x: any = this.imageArr[i];
        let extension = x.image
          .substring(x.image.lastIndexOf('.') + 1)
          .toString()
          .toLowerCase();
        let imgExtension = [
          'jpg',
          'jpeg',
          'jfif',
          'pjpeg',
          'pjp',
          'avif',
          'png',
          'gif',
          'webp',
          'svg',
          'apng',
          'tif',
          'tiff',
        ];
        if (imgExtension.includes(extension)) {
          x.option = 'image';
        } else {
          x.option = 'video';
        }
      }
      this.spinner.hide();
    });
  }
  navigateTo(path, id) {
    if (id) {
      this.router.navigate([path], { queryParams: { id, type: this.flag } });
    } else {
      this.router.navigate([path], { queryParams: { type: this.flag } });
    }
  }

  onChangePage(pageNo) {
    if (pageNo > 0) {
      this.page = pageNo;
    }
    this.getAll();
  }

  refreshList(title) {
    this.search = title == 'clear' ? '' : this.search;
    this.getAll();
  }
  open(u, content) {
    this.selectedRow = u;
    this.modalService.open(content, { centered: true });
  }

  delete() {
    this.imageService.deleteImage(this.selectedRow.id).subscribe(
      (success) => {
        this.selectedRow = {};
        this.getAll();
        this.modalService.dismissAll();
        this.toastService.success(success.message);
      },
      (error) => {
        this.selectedRow = {};
        this.modalService.dismissAll();
      }
    );
  }
}
