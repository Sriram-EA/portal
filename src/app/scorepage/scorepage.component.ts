import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScorepageService } from '../services/scorepage.service';


@Component({
  selector: 'app-scorepage',
  templateUrl: './scorepage.component.html',
  styleUrls: ['./scorepage.component.css']
})
export class ScorepageComponent implements OnInit {

  constructor(private actRoute : ActivatedRoute,private service:ScorepageService) { } 

  itemid:any; 
  itemData:any;

  ngOnInit(): void { 
    
    this.actRoute.paramMap.subscribe(data=>{
      this.itemid=data.get("itemid"); 
      console.log("Item id in score page", this.itemid); 
      this.service.getParticularItemDetail(this.itemid).subscribe(data=>{
        this.itemData=data; 
        console.log(this.itemData);
      })
    });

  } 

  submitScore()
  {
    console.log("Submit Score Button Clicked");
  }

}
