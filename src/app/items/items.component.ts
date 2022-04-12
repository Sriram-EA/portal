import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  constructor(private service:ItemsService, private actRoute:ActivatedRoute) { } 

  eventid:any; 
  itemForm:any; 
  eventname:any;  
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
        });
      });
    });
  }  

  submitScore(itemid:any)
  { 
    console.log("itemID :",itemid);
    let score=(<HTMLInputElement>document.getElementById(itemid.toString())).value;
    console.log("Score : ",score); 
    var scoreObj={"psno": localStorage.getItem("psno"), "score":score, "itemid":itemid};  
    this.service.submitScore(scoreObj).subscribe(data=>{
      console.log(data)
    })

  }

}
