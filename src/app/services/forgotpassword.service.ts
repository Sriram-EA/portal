import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private http:HttpClient) { } 

  baseUrl='http://localhost:3000';  

  checkEmailExists(data:any):Observable<any>
  {
    return this.http.post(`${this.baseUrl}`+'/checkemailexists', data);
  } 

  updatePassword(data:any):Observable<any>
  {
    return this.http.post(`${this.baseUrl}`+'/updatepassword', data);
  }


}
