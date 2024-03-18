import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersRoutingModule } from './users-routing.module';
import { CoreModule } from '../../core/core.module';
import { EnuiryComponent } from './enuiry/enuiry.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { CollaborateComponent } from './collaborate/collaborate.component';


@NgModule({
  declarations: [UserListComponent, UserFormComponent, EnuiryComponent,TruncatePipe, CollaborateComponent],
  imports: [UsersRoutingModule, CoreModule.forRoot()],
})
export class UsersModule {}
