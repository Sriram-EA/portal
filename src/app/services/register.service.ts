import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { } 

  baseUrl='http://localhost:3000'; 

  createUser(data:any):Observable<any> 
  { 
      console.log("Inside create user service")
      return this.http.post(`${this.baseUrl}`+'/createuser',data);
  } 
}
