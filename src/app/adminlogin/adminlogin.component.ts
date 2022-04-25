import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminloginService } from '../services/adminlogin.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private service: AdminloginService, private router: Router, private actRoute : ActivatedRoute) { }
 
  psno: any; 
  errorFlag: boolean =false; 
  errorMsg: any;  
  formObject : any ={};

  loginForm = new FormGroup({
    password: new FormControl('', Validators.required) 
  });

  ngOnInit(): void { 
    this.actRoute.paramMap.subscribe(data=>{
      this.psno=data.get("psno"); 
      // console.log("PS no in admin login page", this.psno); 
    });
  } 

  loginAdmin()
  {
    this.formObject={psno: this.psno, password: this.loginForm.value.password}
    this.service.adminLogin(this.formObject).subscribe(data=>{
      if(data.message==="Matching Successful admin")
      { 
        // console.log("Matching successful log on to admin dashboard"); 
        localStorage.setItem("psno",data.psno);  
        this.router.navigate(['admindashboard']);
      } 
      else if(data.message==="Incorrect Password") 
      { 
        this.errorFlag=true; 
        this.errorMsg="Incorrect Password";
      }
    }); 
  }

}
