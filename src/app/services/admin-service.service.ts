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

  headers= new HttpHeaders();

  t:any;
  constructor(public http: HttpClient) { 
    this.t = localStorage.getItem('admintoken')
    console.log(this.t);
    
    this.headers.append('Content-Type', 'application/json');
    this.headers.append("Authorization", "Bearer " + this.t);
  }

  api = 'http://localhost:5000/tender/';
  // headers = new HttpHeaders({
  //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
  // options = { headers: this.headers };

  

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

  gettenderbidlist(username:any,tenderid:any){
    return this.http.get(`http://localhost:3000/gettenderbidlist?username=${username}`).toPromise();
  }

  addtender(username:any,newtender:any,userID:any){
    var productlist:any = JSON.stringify(newtender.product)
    var body:any = {
      adminName : username,
      tendertitle : newtender.tendertitle,
      openingdate : newtender.openingdate,
      closingdate : newtender.closingdate,
      tendertype  : newtender.tendertype,
      supplier : newtender.supplier,
      product : productlist,
      userID : userID
    }

    
    return this.http.post<any>(`http://localhost:3000/addTendor`,body,{headers:this.headers}).toPromise();
  }

  getTenders(userID:any){
    var body:any = {userID : userID}
    return this.http.post<any>(`http://localhost:3000/getTenders`,body,{headers:this.headers}).toPromise();
  }

  

}
