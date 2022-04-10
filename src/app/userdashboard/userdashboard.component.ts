import { Component, OnInit } from '@angular/core';
import { UserdashboardService } from '../services/userdashboard.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  constructor(private service:UserdashboardService) { } 

  firstName:any; 
  lastName:any;

  ngOnInit(): void {  

    this.service.getUserData(localStorage.getItem("id")).subscribe(data=>{
      console.log(data[0]); 
      this.firstName=data[0].FIRSTNAME; 
      this.lastName=data[0].LASTNAME;
    })
  
  }  
  



}
