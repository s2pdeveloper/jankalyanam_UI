import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ImageFormComponent } from './images-form/image-form.component';
import { ImageListComponent } from './image-list/image-list.component';
const userRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'Images'
    },
    children: [
      {
        path: '',
        redirectTo: 'images'
      },
      {
        path: 'image/:id',
        component: ImageListComponent,
        data: {
          title: 'Image List'
        }
      },
      {
        path: 'image-form',
        component: ImageFormComponent,
        data: {
          title: 'Image Form'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class ImageRoutingModule { }
