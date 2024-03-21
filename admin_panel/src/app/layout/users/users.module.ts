import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersRoutingModule } from './users-routing.module';
import { CoreModule } from '../../core/core.module';
import { TruncatePipe } from '../../pipes/truncate.pipe';


@NgModule({
  declarations: [UserListComponent, UserFormComponent,TruncatePipe],
  imports: [UsersRoutingModule, CoreModule.forRoot()],
})
export class UsersModule {}
