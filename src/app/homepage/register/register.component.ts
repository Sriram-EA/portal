import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  constructor(private service:RegisterService) { } 

  registerForm= new FormGroup({ 
    'firstName':new FormControl('',Validators.required),
    'lastName':new FormControl('',Validators.required),
    'emailId': new FormControl('',Validators.required), 
    'password':new FormControl('',Validators.required)
  });

  ngOnInit(): void {
  }  

  returnMsg:any; 
  userCreationSuccessFlag : boolean = false; 
  userCreationFailureFlag : boolean = false;

  createUser()
  {  
    
    console.log(this.registerForm.value);                 // this.registerForm.controls.emailId.value 
    
    this.service.createUser(this.registerForm.value).subscribe(data=>{  

      this.returnMsg=data.message; 
      console.log(this.returnMsg); 
      if(this.returnMsg==="User Already Exists") 
      {
        console.log("User exists if block") 
        this.userCreationSuccessFlag=false; 
        this.userCreationFailureFlag=true;
      } 
      else 
      { 
        console.log("User doesn't exists block"); 
        this.userCreationSuccessFlag=true; 
        this.userCreationFailureFlag=false;
      }

      this.registerForm.reset();
    });

  }

}
