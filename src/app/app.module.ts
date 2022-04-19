import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component'; 
import { HttpClientModule} from '@angular/common/http' 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './homepage/register/register.component';
import { LoginComponent } from './homepage/login/login.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { ForgotpasswordComponent } from './homepage/forgotpassword/forgotpassword.component';
import { ItemsComponent } from './items/items.component';
import { ScorepageComponent } from './scorepage/scorepage.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { EventdetailComponent } from './admindashboard/eventdetail/eventdetail.component';
import { ItemsdetailComponent } from './admindashboard/itemsdetail/itemsdetail.component';
import { ResultComponent } from './admindashboard/result/result.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegisterComponent,
    LoginComponent,
    UserdashboardComponent,
    ForgotpasswordComponent,
    ItemsComponent,
    ScorepageComponent,
    AdmindashboardComponent,
    EventdetailComponent,
    ItemsdetailComponent,
    ResultComponent,
    AdminloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
