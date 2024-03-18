import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { ImageRoutingModule } from './image-routing.module';
import { ImageFormComponent } from './images-form/image-form.component';
import { ImageListComponent } from './image-list/image-list.component';

@NgModule({
  declarations: [ImageFormComponent, ImageListComponent],
  imports: [ImageRoutingModule, CoreModule.forRoot()],
})
export class ImageModule {}
