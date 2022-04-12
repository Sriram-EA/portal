import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdashboardService {

  constructor(private http:HttpClient) { } 

  baseUrl='http://localhost:3000';    


  getUserData(id:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/getuserdetails/'+id);
  } 

  getEventDetails():Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/geteventdetails');
  } 

  getStatusFlagDetails():Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/getstatusflagdetails');
  }

  subscribeUserToEvent(data:any):Observable<any>
  {
    return this.http.post(`${this.baseUrl}`+'/subscribeusertoevent',data);
  }
}
