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
  });

  ngOnInit(): void {}

  errorMsg: any;
  errorFlag: boolean = false;

  loginUser() {
    console.log(this.loginForm.value);
    this.service.IsEmailValid(this.loginForm.value).subscribe((data) => {
      console.log('Login service called');
      console.log(data.message, data.psno);

      if (data.message === 'Matching Successful') {
        //Matching Successful    // User Does not exist  //  Incorrect Password 
        this.errorFlag=false;
        console.log('Login to User Dashboard and navigate');  
        localStorage.setItem("psno",data.psno);
        this.router.navigate(['userdashboard']);
      }
      if (data.message === 'User Does not exist') {
        this.errorFlag = true;
        this.errorMsg = 'User is not Registered, Please Register to continue'; 
      }
      if (data.message === 'Incorrect Password') {
        this.errorFlag = true;
        this.errorMsg = 'Incorrect Password';
      }
    });
  } 

  forgotPassword(){
    this.router.navigate(['forgotpassword']);
  }
}
