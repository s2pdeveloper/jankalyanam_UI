import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '@services/questions/questions.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sub-question-form',
  templateUrl: './sub-question-form.component.html',
  styleUrls: ['./sub-question-form.component.scss'],
})
export class SubQuestionFormComponent implements OnInit {
  submitted = false;
  Questions: any = [];
  collection: number = 0;
  search: any = '';
  page = 1;
  pageSize = 25;
  parentId = '';
  childId = '';
  showCalQuestionVar: boolean = false;
  masterData: any = [];

  parentQuestion: any = [];
  billType: any = [
    { label: 'LT', value: 'LT' },
    { label: 'HT', value: 'HT' },
  ];
  questionType: any = [
    { label: 'Radio Button', value: 'radio' },
    { label: 'Text', value: 'text' },
    { label: 'Number', value: 'number' },
    { label: 'Drop Down', value: 'dropdown' },
    { label: 'Auto Complete', value: 'autocomplete' },
    { label: 'Iterable', value: 'iterable' },
  ];
  consumerType: any = [
    { label: 'Industrial', value: 'Industrial' },
    { label: 'Commercial', value: 'Commercial' },
    { label: 'Residential', value: 'Residential' },
    { label: 'Others', value: 'Others' },
  ];

  SubqueForm = new FormGroup({
    _id: new FormControl(),
    billType: new FormControl(),
    label: new FormControl(),
    queType: new FormControl(),
    options: new FormControl(),
    condition: new FormControl(),
    parentId: new FormControl(),
    validations: new FormControl(),
    displayName: new FormControl(),
    consumerType: new FormControl(),
    phase: new FormControl(),
    calculation: new FormControl(),
    calBasedOn: new FormControl(),
  });

  constructor(
    private questionService: QuestionsService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastService: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {
    // this.actRoute.queryParams.subscribe(params => {
    //   console.log("params-------------", params);

    //   if (params?.id) {
    //     this.parentId = params.id;
    //     this.SubqueForm.controls['parentId'].setValue(params.id)
    //     console.log(this.SubqueForm.controls);

    //   }
    //   if (params?.childId) {
    //     this.childId = params.childId;
    //     this.getById(params.childId);

    //   }
    // })
    // this.parentQ();
    this.getAllMasterData();
  }

  update(formData: any) {
    // const fd = new FormData();

    // console.log('this.SubqueForm.value', this.SubqueForm.value);
    this.questionService
      .updateQuestion(formData._id, formData)
      .subscribe((success) => {
        this.submitted = false;
        this.toastService.success(success.message);
        this.router.navigate([`questions/sub-question-list`], {
          queryParams: { id: formData.parentId },
        });
      });
  }

  getById(id: any) {
    this.questionService.getByQuestionId(id).subscribe((success) => {
      if (success.options && success.options.length) {
        success.options = success.options.toString();
      }
      if (success.calculation) {
        this.showCalQuestionVar = true;
      }

      this.SubqueForm.patchValue(success);
    });
  }

  get form() {
    return this.SubqueForm.controls;
  }

  submit() {
    this.submitted = true;
    let formData = this.SubqueForm.value;
    if (!formData.calculation) {
      formData.calBasedOn = null;
    }

    if (formData._id) {
      this.update(formData);
    } else {
      delete formData._id;
      this.create(formData);
    }
  }

  showCalQuestion() {
    if (!this.showCalQuestionVar) {
      this.showCalQuestionVar = true;
    } else {
      this.showCalQuestionVar = false;
    }
  }

  create(formData: any) {
    this.spinner.show();
    this.questionService
      .createQuestion(this.SubqueForm.value)
      .subscribe((success) => {
        this.spinner.hide();
        this.toastService.success(success.message);
        this.router.navigate([`questions/sub-question-list`], {
          queryParams: { id: this.parentId },
        });
      });
  }

  goBack() {
    this.location.back();
  }

  getAllMasterData() {
    this.questionService.getAllMasterData().subscribe((success) => {
      this.masterData = success.rows;

      this.actRoute.queryParams.subscribe((params) => {
        if (params?.id) {
          this.parentId = params.id;
          this.SubqueForm.controls['parentId'].setValue(params.id);
          // console.log(this.SubqueForm.controls);
        }
        if (params?.childId) {
          this.childId = params.childId;
          this.getById(params.childId);
        }
      });
    });
  }

  // createQue(){
  //   this.questionService.createQuestion(this.SubqueForm.value).subscribe(success=>{
  //     console.log(success);

  //   })
  // }
}
