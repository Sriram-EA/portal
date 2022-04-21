import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { } 
   
  baseUrl='http://localhost:3000';  
  
  isAuthValid(psno:any):Observable<any>
  {
    return this.http.get(`${this.baseUrl}`+'/isauthvalid/'+psno);
  }

}
