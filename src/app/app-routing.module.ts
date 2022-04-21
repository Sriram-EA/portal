import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { EventdetailComponent } from './admindashboard/eventdetail/eventdetail.component';
import { ItemsdetailComponent } from './admindashboard/itemsdetail/itemsdetail.component';
import { ResultComponent } from './admindashboard/result/result.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AuthGuard } from './auth.guard';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { ForgotpasswordComponent } from './homepage/forgotpassword/forgotpassword.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './homepage/login/login.component';
import { RegisterComponent } from './homepage/register/register.component';
import { ItemsComponent } from './items/items.component';
import { ScorepageComponent } from './scorepage/scorepage.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';

const routes: Routes = [   
  {path:'', component:HomepageComponent},
  {path:'register',component:RegisterComponent}, 
  {path:'login',component:LoginComponent},
  {path:'userdashboard',component:UserdashboardComponent, canActivate:[AuthGuard]}, 
  {path:'forgotpassword',component:ForgotpasswordComponent, canActivate:[AuthGuard]},
  {path:'items/:eventid',component:ItemsComponent, canActivate:[AuthGuard]}, 
  {path:'score/:itemid',component:ScorepageComponent, canActivate:[AuthGuard]}, 
  {path:'admindashboard',component:AdmindashboardComponent, canActivate:[AuthGuard]},  
  {path:'adminlogin/:psno',component:AdminloginComponent, canActivate:[AuthGuard]},
  {path:'eventdetail/:eventid',component:EventdetailComponent, canActivate:[AuthGuard]}, 
  {path:'itemsdetail/:eventid',component:ItemsdetailComponent, canActivate:[AuthGuard]},
  {path:'result/:itemid',component:ResultComponent, canActivate:[AuthGuard]}, 
  {path:'error', component:ErrorpageComponent}, 
  {path:'**',component:ErrorpageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
