import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit { 

  itemid:any; 
  itemData:any; 
  eventid:any; 
  averageUserResult:any;
  averagePanelistResult:any; 
  averageUserResultFlag : boolean = false; 
  averagePanelistResultFlag : boolean =false; 
  averageFinalResultFlag : boolean = false; 
  averageFinalResult:any;

  constructor(private service:ResultService, private actRoute: ActivatedRoute, private router:Router) { }

  ngOnInit(): void { 

    this.actRoute.paramMap.subscribe(data=>{
      this.itemid=data.get("itemid"); 
      // console.log("Item id in result page", this.itemid);  
      this.service.getParticularItemDetail(this.itemid).subscribe(data=>{
        this.itemData=data;  
        this.eventid=data[0].eventid;
        // console.log("Item Data: ", this.itemData);   
        this.service.getAverageUserResult(this.itemid).subscribe(data=>{ 
          this.averageUserResult=data.userscore;
          // console.log("Normal User Result", this.averageUserResult);  
          if(this.averageUserResult!=null)
          {
            this.averageUserResultFlag=true;
          } 
          else 
          {
            this.averageUserResultFlag=false;
          }
          this.service.getAveragePanelistResult(this.itemid).subscribe(data=>{
            this.averagePanelistResult=data.panelistscore; 
            // console.log("Panelist Result:", this.averagePanelistResult); 
            if(this.averagePanelistResult!=null)
            {
              this.averagePanelistResultFlag=true;
            } 
            else 
            {
              this.averagePanelistResultFlag=false;
            } 
            if(this.averageUserResultFlag==true && this.averagePanelistResultFlag==true)
            {
              this.averageFinalResultFlag=true; 
              
              this.averageFinalResult=Math.round((0.3*(this.averageUserResult))+(0.7*(this.averagePanelistResult)));  
              // console.log(this.averageFinalResult);
            } 
            else 
            {
              this.averageFinalResultFlag=false;
            }
          });
          
        });
      });
    });
  } 

  goBack()
  {
    this.router.navigate(['itemsdetail/',this.eventid]);
  }

}
