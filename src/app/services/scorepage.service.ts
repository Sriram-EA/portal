import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScorepageService {

  constructor(private http:HttpClient) { } 

  baseUrl='http://localhost:3000';   

  getParticularItemDetail(itemid:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/getparticularitemdetail/'+itemid);
  } 

  InsertScoreToDatabase(data:any):Observable<any>
  {
    return this.http.post(`${this.baseUrl}`+'/insertscoretodatabase',data);
  }  

  checkIfScoreAlreadySubmitted(psno:any,itemid:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/checkifscorealreadysubmitted/'+psno+'/'+itemid);
  }
}
