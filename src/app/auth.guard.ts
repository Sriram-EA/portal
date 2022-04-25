import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { 

  constructor(private service:AuthService, private router:Router){} 

  canActivate():boolean
  {  
    // console.log("PSNO")
    if(localStorage.getItem("psno")!=null)
    {
      this.service.isAuthValid(localStorage.getItem("psno")).subscribe(data=>{ 
        // console.log("Data message", data.message);
        if(data.message==="Active")
        {
          return false;
        } 
        else 
        {  
          this.router.navigate(['error']);
          return true;
        }
      });
    } 
    else 
    { 
      this.router.navigate(['error']);
      return true;
    }   
    return true;
  }
}

  

