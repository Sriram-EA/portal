import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { EventdetailComponent } from './admindashboard/eventdetail/eventdetail.component';
import { ItemsdetailComponent } from './admindashboard/itemsdetail/itemsdetail.component';
import { ResultComponent } from './admindashboard/result/result.component';
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
  {path:'userdashboard',component:UserdashboardComponent}, 
  {path:'forgotpassword',component:ForgotpasswordComponent},
  {path:'items/:eventid',component:ItemsComponent}, 
  {path:'score/:itemid',component:ScorepageComponent}, 
  {path:'admindashboard',component:AdmindashboardComponent}, 
  {path:'eventdetail/:eventid',component:EventdetailComponent}, 
  {path:'itemsdetail/:eventid',component:ItemsdetailComponent},
  {path:'result/:itemid',component:ResultComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
