import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubQuestionListComponent } from './sub-question-list.component';

describe('SubQuestionListComponent', () => {
  let component: SubQuestionListComponent;
  let fixture: ComponentFixture<SubQuestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubQuestionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
