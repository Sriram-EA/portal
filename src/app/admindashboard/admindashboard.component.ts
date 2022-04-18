import { Component, OnInit } from '@angular/core';
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

  constructor(private service:AdmindashboardService) { }

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
       });
    });
  }

}
