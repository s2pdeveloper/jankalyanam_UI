import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubQuestionFormComponent } from './sub-question-form.component';

describe('SubQuestionFormComponent', () => {
  let component: SubQuestionFormComponent;
  let fixture: ComponentFixture<SubQuestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubQuestionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubQuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
