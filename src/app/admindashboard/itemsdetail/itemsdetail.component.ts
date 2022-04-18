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

  ngOnInit(): void { 

    this.actRoute.paramMap.subscribe(data=>{ 
      console.log(data.get('eventid')); 
      this.eventid=data.get('eventid');   
      this.service.getEventName(this.eventid).subscribe(data=>{
        this.eventname=data[0].eventname; 
        this.service.getItemDetail(this.eventid).subscribe(data=>{
          this.itemData=data;
          console.log(this.itemData);
        })


      });
    });

  } 

  goBack()
  {
    this.router.navigate(['eventdetail/',this.eventid]);
  }

}
