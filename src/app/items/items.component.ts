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

  ngOnInit(): void { 

    this.actRoute.paramMap.subscribe(data=>{ 
      console.log(data.get('eventid')); 
      this.eventid=data.get('eventid'); 
      this.service.getItemDetail(this.eventid).subscribe(data=>{
        
      })

    });
  }

}
