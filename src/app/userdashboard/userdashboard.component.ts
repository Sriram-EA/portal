import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdashboardService } from '../services/userdashboard.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  constructor(private service:UserdashboardService, private router:Router) { } 

  firstName:any; 
  lastName:any;   
  eventData:any;  
  eventid:any; 
  subscribedStatus:any;
  runningFlag: boolean= false; 
  scheduledFlag: boolean = false; 
  cancelledFlag: boolean =false; 
  loginDate:any; 
  loginTime:any; 
  loginFlag:any;


  ngOnInit(): void {  

    this.service.getUserData(localStorage.getItem("psno")).subscribe(data=>{
      // console.log(data[0]); 
      this.firstName=data[0].firstname; 
      this.lastName=data[0].lastname;  
      this.service.getEventDetails().subscribe(eventdata=>{ 
        this.eventData=eventdata; 
        // console.log(eventdata); 
        this.service.getStatusFlagDetails().subscribe(eventflagdata=>{
          // console.log("Event Flag Details", eventflagdata); 
          // console.log("Running", eventflagdata.running);  
          if(eventflagdata.running==1)
          {
            this.runningFlag=true;
          }
          // console.log("Scheduled", eventflagdata.scheduled); 
          if(eventflagdata.scheduled==1)
          {
            this.scheduledFlag=true;
          }
          // console.log("Cancelled", eventflagdata.cancelled); 
          if(eventflagdata.cancelled==1) 
          {
            this.cancelledFlag=true;
          } 
          this.service.getUserLogintime(localStorage.getItem("psno")).subscribe(data=>{
            this.loginDate=data.date; 
            this.loginTime=data.time; 
            this.loginFlag=data.loginflag
          });
        });
      });

    });
  
  }

  joinEvent(eventid: any)
  {
    // console.log("Inside join Event Method");   
    // console.log("Event id is ", eventid); 
    var subsribeDataObj = { 
      "psno" : localStorage.getItem("psno"),
      "eventid" : eventid    
    } 
    this.service.subscribeUserToEvent(subsribeDataObj).subscribe(data=>{ 
      this.subscribedStatus=data.message;
      // console.log(this.subscribedStatus);
    });

  } 

  logOut()
  { 
    if(localStorage.getItem("psno")!=null){	 
      this.service.logoutUser(localStorage.getItem("psno")).subscribe(data=>{
        if(data.message==="Logged Out Successfully")
        {
          localStorage.removeItem("psno"); 
          alert("Logged out Successfully");
          this.router.navigate(['/login']);
        } 
        else 
        {
          // Error page
          
        }
      });					 
    }   
  }

}
