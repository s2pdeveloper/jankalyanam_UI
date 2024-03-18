import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { SubQuestionFormComponent } from './sub-question-form/sub-question-form.component';
import { SubQuestionListComponent } from './sub-question-list/sub-question-list.component';

const userRoutes: Routes = [
    {
      path: '',
      data: {
        title: 'questions',
      },
      children: [
        {
          path: '',
          redirectTo: 'question-list',
        },
        {
          path: 'question-list',
          component: QuestionListComponent,
          data: {
            title: 'Question List',
          },
        },
        {
          path: 'question-form',
          component: QuestionFormComponent,
          data: {
            title: 'Question Form',
          },
        },
        {
          path: 'sub-question-form',
          component: SubQuestionFormComponent,
          data: {
            title: 'Sub Question Form',
          },
        },
        {
          path: 'sub-question-list',
          component: SubQuestionListComponent,
          data: {
            title: 'Sub Question List',
          },
        },
      ],
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule],
  })
  export class QuestionRoutingModule {}
  