import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './dashboard/login/login.component';
import { EmailComponent } from './dashboard/email/email.component';
import { MakersComponent } from './dashboard/makers/makers.component';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './dashboard/signup/signup.component';
import {ProtectedComponent} from './protected/protected.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login-email', component: EmailComponent },
  { path: 'makers', component: MakersComponent, canActivate: [AuthGuard] },
  { path: 'authorizer', component: ProtectedComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'makers' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


