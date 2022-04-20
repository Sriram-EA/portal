import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsdetailService {

  constructor(private http: HttpClient) { } 

  baseUrl='http://localhost:3000';

  getEventName(eventid:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/geteventname/'+eventid);
  } 

  getItemDetail(eventid:any):Observable<any>{

    return this.http.get(`${this.baseUrl}`+'/getitemdetail/'+eventid);
  }  

  getAverageUserResult(itemid:any):Observable<any> 
  {
    return this.http.get(`${this.baseUrl}`+'/getaverageuserresult/'+itemid);
  }  
  getAveragePanelistResult(itemid:any):Observable<any> 
  {
    return this.http.get(`${this.baseUrl}`+'/getaveragepanelistresult/'+itemid);
  }
  
}
