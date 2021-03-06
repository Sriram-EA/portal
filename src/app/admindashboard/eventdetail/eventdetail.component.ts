import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventdetailService } from 'src/app/services/eventdetail.service';

@Component({
  selector: 'app-eventdetail',
  templateUrl: './eventdetail.component.html',
  styleUrls: ['./eventdetail.component.css']
})
export class EventdetailComponent implements OnInit {

  constructor(private service:EventdetailService,private actRoute: ActivatedRoute, private router:Router) { } 

  eventid:any; 
  eventData:any; 
  eventFlag:any; 
  runningFlag : boolean = false; 
  scheduledFlag : boolean = false; 
  closedFlag : boolean = false; 
  updateStatusFlagMessage :any; 
  rescheduleEventFlag:boolean =false; 

  dateTimeForm = new FormGroup({
    eventdate: new FormControl('', Validators.required),
    starttime: new FormControl('', Validators.required), 
    endtime: new FormControl('', Validators.required)
  });


  ngOnInit(): void {  

    this.actRoute.paramMap.subscribe(data=>{ 
      // console.log(data.get('eventid')); 
      this.eventid=data.get('eventid');  
      this.service.getParticularEventDetail(this.eventid).subscribe(data=>{ 
        this.eventData=data; 
        // console.log("Event Data in Particular Event detail in admin dashboard", this.eventData); 
        this.service.getParticularEventFlag(this.eventid).subscribe(data=>{ 
          this.eventFlag=data[0].eventflag; 
          // console.log("Event Flag: ", this.eventFlag); 
          if(this.eventFlag==="R")
          {
            this.runningFlag=true;
          } 
          if(this.eventFlag==="S")
          {
            this.scheduledFlag=true;
          } 
          if(this.eventFlag==="C")
          {
            this.closedFlag=true;
          }
        });
      });
    });
  }
   
  // Go to items inside the event page
  goToItem()
  { 
    this.router.navigate(['itemsdetail/',this.eventid]);
    
  }

 // Update R
  runEvent()
  {
    this.service.startEvent(this.eventid).subscribe(data=>{ 
      this.updateStatusFlagMessage=data.message; 
      // console.log(this.updateStatusFlagMessage); 
      if(this.updateStatusFlagMessage==="Updated as R successfully")
      {
        alert("Event Flag updated successfully!"); 
        this.router.navigate(['admindashboard']);
      } 
      else 
      {
        alert("DB Query Error in Backend, Updation of Event Failed");
      }
    });
  } 
 
  // Update S
  scheduleEvent()
  {
    this.service.scheduleEvent(this.eventid).subscribe(data=>{
      this.updateStatusFlagMessage=data.message; 
      // console.log(this.updateStatusFlagMessage); 
      if(this.updateStatusFlagMessage==="Updated as S successfully")
      { 
        alert("Event Flag updated successfully!"); 
        this.router.navigate(['admindashboard']);
      } 
      else 
      {
        alert("DB Query Error in Backend, Updation of Event Failed");
      }
    });
  }  
  // Reschedule event  show form 
  rescheduleEvent()
  {
    this.rescheduleEventFlag=true;
  
  } 
  submitDateTime()
  {
    // console.log("Date and time value", this.dateTimeForm.value); 
    this.service.updateDateandTime(this.dateTimeForm.value,this.eventid).subscribe(data=>{ 
      if(data.message==="Updated Date and Time successfully") 
      {
        alert("Event Rescheduled successfully!");  
        window.location.reload();
      } 
      else 
      {
        alert("Error!, Problem in Backend Query, Try later"); 
        this.router.navigate(['admindashboard']);
      }

    });
  }

  // Update C

  closeEvent()
  {
    this.service.closeEvent(this.eventid).subscribe(data=>{ 
      this.updateStatusFlagMessage=data.message; 
      // console.log(this.updateStatusFlagMessage); 
      if(this.updateStatusFlagMessage==="Updated as C successfully")
      {
        alert("Event Flag updated successfully!"); 
        this.router.navigate(['admindashboard']);
      } 
      else 
      {
        alert("DB Query Error in Backend, Updation of Event Failed");
      }
    })
  }

}
