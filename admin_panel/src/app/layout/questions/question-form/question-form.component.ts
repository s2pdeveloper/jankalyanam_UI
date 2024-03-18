import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '@services/questions/questions.service';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  submitted = false;
  Questions: any = [];
  collection: number = 0;
  search: any = '';
  page = 1;
  pageSize = 25;
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

  // calQuestions: any = [
  //   { question: 'Total Members' },
  //   { question: 'Total Area' },
  // ];

  queForm = new FormGroup({
    _id: new FormControl(),
    billType: new FormControl('', [Validators.required]),
    label: new FormControl('', [Validators.required]),
    queType: new FormControl('', [Validators.required]),
    options: new FormControl(),
    condition: new FormControl(),
    parentId: new FormControl(),
    validations: new FormControl(),
    displayName: new FormControl('', [Validators.required]),
    consumerType: new FormControl('', [Validators.required]),
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
    // this.actRoute.queryParams.subscribe((params) => {
    //   console.log('params-----------', params);
    //   if (params.id) {
    //     this.getById(params.id);
    //   }
    // });
    // this.parentQ();
    this.getAllMasterData();
  }

  showCalQuestion() {
    if (!this.showCalQuestionVar) {
      this.showCalQuestionVar = true;
    } else {
      this.showCalQuestionVar = false;
    }
  }

  // parentQ() {
  //   this.questionService.getParentQ({}).subscribe((success) => {
  //     console.log(success);
  //     this.parentQuestion = success;
  //     this.parentQuestion.unshift({
  //       _id: null,
  //       displayName: 'None',
  //     });
  //     console.log(this.parentQuestion);
  //   });
  // }

  get form() {
    return this.queForm.controls;
  }

  submit() {
    this.submitted = true;
    if (this.queForm.invalid) {
      this.toastService.warning('Please Fill Required Field');
      return;
    }
    let formData = this.queForm.value;
    if (!this.form['calculation'].value) {
      formData.calBasedOn = null;
    }
    
    // return;
    if (formData._id) {
      this.update(formData);
    } else {
      delete formData._id;
      this.create(formData);
    }
  }

  update(formData: any) {
    this.questionService
      .updateQuestion(formData._id, formData)
      .subscribe((success) => {
        this.submitted = false;
        this.toastService.success(success.message);
        this.router.navigate(['/questions/question-list']);
      });
  }

  getAllMasterData() {
    this.questionService.getAllMasterData().subscribe((success) => {
      this.masterData = success.rows;

      this.actRoute.queryParams.subscribe((params) => {
        if (params.id) {
          this.getById(params.id);
        }
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
      // console.log('success', success);
      this.queForm.patchValue(success);
    });
  }

  create(formData: any) {
    // console.log('this.queForm.value', this.queForm.value);
    this.spinner.show();
    this.questionService
      .createQuestion(this.queForm.value)
      .subscribe((success) => {
        this.spinner.hide();
        this.toastService.success(success.message);
        this.router.navigate(['questions/question-list']);
      });
  }

  goBack() {
    this.location.back();
  }

  // createQue(){
  //   this.questionService.createQuestion(this.queForm.value).subscribe(success=>{
  //     console.log(success);

  //   })
  // }
}
