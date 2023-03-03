import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'src/shared/shared.module';
import { AuthenticationComponent } from './auth.component';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: AuthenticationComponent }
    ])
  ]
})
export class AuthModule {}
