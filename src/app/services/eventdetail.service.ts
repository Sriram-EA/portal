import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventdetailService {

  constructor(private http:HttpClient) { } 

  baseUrl='http://localhost:3000';  

  getParticularEventDetail(eventid:any):Observable<any>{

    return this.http.get(`${this.baseUrl}`+'/getparticularadmineventdetail/'+eventid);
  }  

  getParticularEventFlag(eventid:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/getparticulareventflag/'+eventid);
  } 

  startEvent(eventid:any):Observable<any> 
  {
    return this.http.get(`${this.baseUrl}`+'/updatestartevent/'+eventid);
  } 

  scheduleEvent(eventid:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/updatescheduleevent/'+eventid);
  } 

  closeEvent(eventid:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/updatecloseevent/'+eventid);
  } 

  updateDateandTime(data:any,eventid:any):Observable<any>
  {
    return this.http.post(`${this.baseUrl}`+'/updatedateandtime/' + eventid, data)
  }
}
