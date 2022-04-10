import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotpasswordService } from 'src/app/services/forgotpassword.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private router:Router, private service:ForgotpasswordService) { }

  ngOnInit(): void {
  } 

  forgotpasswordForm =  new FormGroup({
    emailId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  }); 

  errorMsg: any;
  errorFlag: boolean = false; 
  successMsg:any; 
  successFlag:boolean = false;
  
  updatePassword()
  { 
    this.service.checkEmailExists(this.forgotpasswordForm.value).subscribe(data=>{
      console.log("Inside Update password method"); 
      console.log(data.message); 
      if(data.message==="User Exists")
      {
        // Change password 
        this.service.updatePassword(this.forgotpasswordForm.value).subscribe(data=>{
          console.log(data.message); 
          this.successMsg=data.message; 
          this.successFlag=true; 
          this.errorFlag=false;
        });
      } 
      else if(data.message==="User Does not Exist")
      { 
        this.errorFlag=true;  
        this.successFlag=false;
        this.errorMsg="Email Id is not Registered";

      }
    });

  } 

  goBack()
  {
    this.router.navigate(['login']);
  }
}
