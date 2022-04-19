import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdmindashboardService } from '../services/admindashboard.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  eventData:any; 
  runningFlag: boolean= false; 
  scheduledFlag: boolean = false; 
  cancelledFlag: boolean =false;  
  firstName:any; 
  lastName:any; 
  loginDate:any; 
  loginTime:any;

  constructor(private service:AdmindashboardService, private router:Router) { }

  ngOnInit(): void {

    this.service.getEventDetails().subscribe(data=>{ 
      this.eventData=data;
       console.log(this.eventData); 
       this.service.getStatusFlagDetails().subscribe(eventflagdata=>{  
        console.log("Running ", eventflagdata.running); 
        if(eventflagdata.running==1)
        {
          this.runningFlag=true;
        }
        console.log("Scheduled", eventflagdata.scheduled); 
        if(eventflagdata.scheduled==1)
        {
          this.scheduledFlag=true;
        }
        console.log("Cancelled", eventflagdata.cancelled); 
        if(eventflagdata.cancelled==1) 
        {
          this.cancelledFlag=true;
        }  
        this.service.getUserData(localStorage.getItem("psno")).subscribe(data=>{
          console.log(data[0]); 
          this.firstName=data[0].firstname; 
          this.lastName=data[0].lastname;  
          this.service.getUserLogintime().subscribe(data=>{
            this.loginDate=data.date; 
            this.loginTime=data.time;
          });
        });
       });
    });
  } 

  logOut()
  { 
    if(localStorage.getItem("psno")!=null){									
      localStorage.removeItem("psno");
    }   
    alert("Logged out Successfully");
    this.router.navigate(['/login'])

  }

}
