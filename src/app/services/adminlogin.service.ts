import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminloginService {

  constructor(private http:HttpClient) { } 

  baseUrl='http://localhost:3000';  

  adminLogin(data:any):Observable<any>
  {
    return this.http.post(`${this.baseUrl}`+'/adminlogin', data);
  } 
}
