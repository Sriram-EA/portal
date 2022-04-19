import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private service: LoginService,private router:Router) {}

  loginForm = new FormGroup({
    psno: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required), 
    dropdown: new FormControl('', Validators.required)
  });

  ngOnInit(): void {}

  errorMsg: any;
  errorFlag: boolean = false; 
  errorFlagAdmin:boolean = false; 
  psno:any;

  loginUser() {
    console.log(this.loginForm.value);
    this.service.IsEmailValid(this.loginForm.value).subscribe((data) => {
      console.log('Login service called');
      console.log(data.message, data.psno);

      if (data.message === 'Matching Successful participant') {
        //Matching Successful    // User Does not exist  //  Incorrect Password 
        this.errorFlag=false;
        console.log('Login to User Dashboard and navigate');  
        localStorage.setItem("psno",data.psno);
        this.router.navigate(['userdashboard']);
      } 
      if (data.message === 'Matching Successful admin') {
        //Matching Successful    // admin Does not exist  //  Incorrect Password 
        this.errorFlag=false;
        console.log('Move to Admin Login page');  
        localStorage.setItem("psno",data.psno); 
        this.psno=data.psno;
        this.router.navigate(['adminlogin/',data.psno]);
      } 
      if (data.message === 'You are not an admin') {
        this.errorFlagAdmin = true; 
        this.errorFlag= false;
        this.errorMsg = 'You are not an Admin User, Try to login as panelist !'; 
      }
      if (data.message === 'User Does not exist') {
        this.errorFlag = true; 
        this.errorFlagAdmin=false;
        this.errorMsg = 'User Does not Exist, for this PS number'; 
      }
      if (data.message === 'Incorrect Password') {
        this.errorFlag = true; 
        this.errorFlagAdmin=false;
        this.errorMsg = 'Incorrect Password';
      }
    });
  } 

  forgotPassword(){
    this.router.navigate(['forgotpassword']);
  }
}
