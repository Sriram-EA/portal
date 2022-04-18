import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http:HttpClient) { } 

  baseUrl='http://localhost:3000'; 

  getParticularItemDetail(itemid:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/getparticularitemdetail/'+itemid);
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
