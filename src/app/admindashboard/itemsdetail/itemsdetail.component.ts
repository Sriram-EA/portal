import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsdetailService } from 'src/app/services/itemsdetail.service';

@Component({
  selector: 'app-itemsdetail',
  templateUrl: './itemsdetail.component.html',
  styleUrls: ['./itemsdetail.component.css']
})
export class ItemsdetailComponent implements OnInit {

  constructor(private service:ItemsdetailService, private actRoute:ActivatedRoute, private router: Router) { }
 
  eventid:any; 
  eventname:any; 
  itemData:any; 
  resultData:any =[]; 
  averageUserScore:any; 
  averagePanelistScore:any; 
  averageFinalResult:any;

  ngOnInit(): void { 

    this.actRoute.paramMap.subscribe(data=>{ 
      console.log(data.get('eventid')); 
      this.eventid=data.get('eventid');   
      this.service.getEventName(this.eventid).subscribe(data=>{
        this.eventname=data[0].eventname; 
        this.service.getItemDetail(this.eventid).subscribe(data=>{
          this.itemData=data;
          console.log(this.itemData);  
          //New Code
          for(let i=0;i<this.itemData.length;i++)
          { 
            console.log("Inside iteration", i);
            console.log("Hi",this.itemData[i].itemid); 
            this.service.getAverageUserResult(this.itemData[i].itemid).subscribe(data=>{
              console.log("UserScore is",data.userscore);  
              this.averageUserScore=Math.round(data.userscore);
            });
              this.service.getAveragePanelistResult(this.itemData[i].itemid).subscribe(data=>{
                console.log("Panelist Score  is",data.panelistscore);  
                this.averagePanelistScore=Math.round(data.panelistscore); 
              
                this.averageFinalResult=Math.round((0.3*(this.averageUserScore))+(0.7*(this.averagePanelistScore)));   
               
                this.itemData[i]={itemid: this.itemData[i].itemid,itemname: this.itemData[i].itemname, presentername: this.itemData[i].presentername, eventid: this.itemData[i].eventid, userscore :this.averageUserScore, panelistscore:this.averagePanelistScore, finalscore:this.averageFinalResult}; 
                console.log(this.resultData); 
                console.log("Outside iteration", i);
              
            });
          }
        });
      });
    }); 
    

  } 

  goBack()
  {
    this.router.navigate(['eventdetail/',this.eventid]);
  }

}
