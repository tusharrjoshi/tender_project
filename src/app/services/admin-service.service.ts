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
    return this.http.get(`${this.api}isadmin?username=${username}&password=${password}`).toPromise();
  }

  gettenderlist(username:any){
    return this.http.get(`${this.api}gettenderlist?username=${username}`).toPromise();
  }

}
