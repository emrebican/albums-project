import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/shared/shared.module';
import { AuthenticationComponent } from './auth.component';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: AuthenticationComponent }
    ])
  ]
})
export class AuthModule {}
