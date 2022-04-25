import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScorepageService } from '../services/scorepage.service';


@Component({
  selector: 'app-scorepage',
  templateUrl: './scorepage.component.html',
  styleUrls: ['./scorepage.component.css']
})
export class ScorepageComponent implements OnInit {

  constructor(private actRoute : ActivatedRoute,private service:ScorepageService, private router:Router) { } 
 
  eventid:any;
  itemid:any; 
  itemData:any; 
  scoreErrorFlag:boolean = false; 
  scoreObj:any; 
  scoreResponseMessage:any; 
  isScoreAlreadySubmitted:boolean =false; 
  isScorePresentData:any;

  

  ngOnInit(): void { 
    
    this.actRoute.paramMap.subscribe(data=>{
      this.itemid=data.get("itemid"); 
      // console.log("Item id in score page", this.itemid); 
      this.service.getParticularItemDetail(this.itemid).subscribe(data=>{
        this.itemData=data; 
        // console.log("Item Data: ", this.itemData); 
        this.service.checkIfScoreAlreadySubmitted(localStorage.getItem("psno"),this.itemid).subscribe(data=>{ 
          this.isScorePresentData=data; 
          // console.log("Current Score data: ", this.isScorePresentData); 
          // console.log("Current Score data Length: ", this.isScorePresentData.length);
          if(this.isScorePresentData.length>=1) 
          {
            this.isScoreAlreadySubmitted=true;
          } 
          else 
          {
            this.isScoreAlreadySubmitted=false;
          }

        });
      });
    });

  } 

  submitScore(itemid:any)
  {
    // console.log("Submit Score Button Clicked"); 
    let score=(<HTMLInputElement>document.getElementById(itemid.toString())).value;  

    // console.log("itemid: ",itemid, "Selected Score: ",score); 
    if(score==="")
    {
      // console.log("Blank Value");  
      this.scoreErrorFlag=true;
    } 
    else 
    {
      // console.log("Valid Score"); 
      this.scoreErrorFlag=false; 
      this.scoreObj={"psno": localStorage.getItem("psno"), "score":score, "itemid":itemid};  
      this.service.InsertScoreToDatabase(this.scoreObj).subscribe(data=>{
        this.scoreResponseMessage=(data.message);  
        this.eventid=data.eventid;
        // console.log(this.scoreResponseMessage); 

        if(this.scoreResponseMessage==="Score submitted successfully") 
        {
          alert("Score Submitted Successfully"); 
          this.router.navigate(['items/',this.eventid]);
        } 
        else if(this.scoreResponseMessage==="This event has been closed")
        {
          alert("This Event Has been closed!, So Please try once the event has been opened"); 
          this.router.navigate(['userdashboard']);
        }
      })
    }
  }

}
