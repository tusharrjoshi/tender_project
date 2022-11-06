import { Injectable } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  userlogin:string='';
  userpassword:string='';
  adminlogin:string='';
  adminpassword:string='';
  
  constructor(public http: HttpClient) { }

  api = 'http://localhost:5000/tender/';
  

  isadmin(username:any,password:any){
    var body:any={
      email:username,
      password:password
    }
    
    return this.http.post<any>('http://localhost:3000/login',body).toPromise();
  }

  gettenderlist(username:any){
    return this.http.get(`http://localhost:3000/gettenderlist?username=${username}`).toPromise();
  }

}
