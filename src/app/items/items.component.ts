import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor(private service:ItemsService, private actRoute:ActivatedRoute, private router:Router) { } 

  eventid:any; 
  itemForm:any; 
  eventname:any;   
  scoreDetails:any;  
  scoreItemidArray: Number[] =[]; 
  scoreArray: any[]= []; 
  scoreDisplayFlag: boolean = false; 
  score:any;
   
  submitScoreFlag:boolean =false;

  ngOnInit(): void {  
    
    this.actRoute.paramMap.subscribe(data=>{ 
      console.log(data.get('eventid')); 
      this.eventid=data.get('eventid'); 
      this.service.getItemDetail(this.eventid).subscribe(data=>{
        console.log(data); 
        this.itemForm=data;    
        this.service.getEventName(this.eventid).subscribe(data=>{
          this.eventname=data[0].eventname; 
          console.log(this.eventname); 
          this.service.getScoreDetails(localStorage.getItem("psno")).subscribe(data=>{
            this.scoreDetails=data;  
            // Save in ItemId array; 
            for(let i=0;i<this.scoreDetails.length;i++)
            {
              this.scoreItemidArray[i]= this.scoreDetails[i].itemid;   
            }  
            //console.log("Score Itemid Array", this.scoreItemidArray);
            for(let i=0;i<this.scoreDetails.length;i++)
            { 
                this.scoreArray[i]={"itemid":this.scoreDetails[i].itemid , "score" :this.scoreDetails[i].score};
            } 
           // console.log("Score Array", this.scoreArray);
            
          })
        });
      });
    });   
    
  }    

  giveScore(itemid:any)
  { 
    console.log("itemID :",itemid); 
    console.log("Score Itemid Array", this.scoreItemidArray);   
    console.log("Score Array", this.scoreArray);  

  }  

  viewScore(itemid:any)
  {
    
  }

  // getYourScore(itemid:any)
  // { 
  //   this.scoreDisplayFlag=true;
  //   this.score = this.scoreArray.findIndex(x => x.itemid === itemid); 
  //   console.log(this.score); 
    
  // }

}
