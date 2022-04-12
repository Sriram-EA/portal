import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { UserdashboardService } from '../services/userdashboard.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  constructor(private service:UserdashboardService) { } 

  firstName:any; 
  lastName:any;   
  eventData:any;  
  eventid:any; 
  subscribedStatus:any;
  runningFlag: boolean= false; 
  scheduledFlag: boolean = false; 
  cancelledFlag: boolean =false;


  ngOnInit(): void {  

    this.service.getUserData(localStorage.getItem("psno")).subscribe(data=>{
      console.log(data[0]); 
      this.firstName=data[0].firstname; 
      this.lastName=data[0].lastname;  
      this.service.getEventDetails().subscribe(eventdata=>{ 
        this.eventData=eventdata; 
        console.log(eventdata); 
        this.service.getStatusFlagDetails().subscribe(eventflagdata=>{
          console.log("Event Flag Details", eventflagdata); 
          console.log("Running", eventflagdata.running);  
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
          if(eventflagdata.cancelled) 
          {
            this.cancelledFlag=true;
          }
        })
      });

    });
  
  }

  joinEvent(eventid: any)
  {
    console.log("Inside join Event Method");   
    console.log("Event id is ", eventid); 
    var subsribeDataObj = { 
      "psno" : localStorage.getItem("psno"),
      "eventid" : eventid    
    } 
    this.service.subscribeUserToEvent(subsribeDataObj).subscribe(data=>{ 
      this.subscribedStatus=data.message;
      console.log(this.subscribedStatus);
    });

  }
  

}
