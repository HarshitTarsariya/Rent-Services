import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateComponent } from './auth/activate/activate.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './layout/home/home.component';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent  
  },
  {
    path:'activate',
    component:ActivateComponent
  },
  {
    path:'forget-password',
    component:ForgetPasswordComponent
  },
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
