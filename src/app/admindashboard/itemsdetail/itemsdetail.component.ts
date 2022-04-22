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

  userScoreArrayObject: any =[]; 
  panelistScoreArrayObject : any =[]; 


  ngOnInit(): void { 

    this.actRoute.paramMap.subscribe(data=>{ 
      console.log(data.get('eventid')); 
      this.eventid=data.get('eventid');   
      this.service.getEventName(this.eventid).subscribe(data=>{
        this.eventname=data[0].eventname; 
        this.service.getItemDetail(this.eventid).subscribe(data=>{
          this.itemData=data;
          console.log("Item Form Data", this.itemData);  
          //New Code
          for(let i=0;i<this.itemData.length;i++)
          {  
            this.service.getAverageUserResult(this.itemData[i].itemid,this.eventid).subscribe(data=>{
              // console.log("UserScore is",data.userscore);    
              if(data.userscore===null) 
              {
                this.averageUserScore=0;
              } 
              else 
              {
                this.averageUserScore=Number(data.userscore).toFixed(1);  
              }  

              this.userScoreArrayObject[i] = {itemid: this.itemData[i].itemid,itemname: this.itemData[i].itemname, presentername: this.itemData[i].presentername, eventid: this.itemData[i].eventid, userscore: this.averageUserScore }   
              
            });
          
          }    
          console.log("User Score Array Value at 0th index",this.userScoreArrayObject);
          
          for(let i=0;i<this.itemData.length;i++)
          {  
            this.service.getAveragePanelistResult(this.itemData[i].itemid,this.eventid).subscribe(data=>{
              //console.log("Panelist Score  is",data.panelistscore);   
              if(data.panelistscore===null)
              {
                this.averagePanelistScore=0;
              } 
              else
              {
                this.averagePanelistScore=Number(data.panelistscore).toFixed(1); 
              } 
              this.averageFinalResult=((0.3*(this.averageUserScore))+(0.7*(this.averagePanelistScore))).toFixed(1);    
              this.panelistScoreArrayObject[i]={itemid: this.itemData[i].itemid, itemname: this.itemData[i].itemname, presentername: this.itemData[i].presentername, eventid: this.itemData[i].eventid, panelistscore: this.averagePanelistScore, finalscore:this.averageFinalResult}
              console.log("PanelistScore Array", this.panelistScoreArrayObject);
              
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
