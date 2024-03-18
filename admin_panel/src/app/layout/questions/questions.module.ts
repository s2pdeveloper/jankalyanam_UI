import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionRoutingModule } from './questions-routing.module'
import { SubQuestionFormComponent } from './sub-question-form/sub-question-form.component';
import { SubQuestionListComponent } from './sub-question-list/sub-question-list.component';

import { CoreModule } from 'src/app/core/core.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    QuestionFormComponent,
    QuestionListComponent,
    SubQuestionFormComponent,
    SubQuestionListComponent
  ],
  imports: [
    QuestionRoutingModule,
    CoreModule.forRoot(),NgSelectModule
  ]
})
export class QuestionsModule { }
