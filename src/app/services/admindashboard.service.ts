import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmindashboardService {

  constructor(private http:HttpClient) { } 

  baseUrl='http://localhost:3000';  

  getEventDetails():Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/geteventdetails');
  }  

  getStatusFlagDetails():Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/getstatusflagdetails');
  } 

  getUserData(id:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/getuserdetails/'+id);
  }   
  
  getUserLogintime(psno:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/getuserlogintime/'+psno);
  } 

  logoutUser(psno:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/logoutuser/'+psno);
  }
}
