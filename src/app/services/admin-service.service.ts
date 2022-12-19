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

  gettenderbyid(tenderId:any){
    var body:any = {tenderId : tenderId}
    return this.http.post<any>(`http://localhost:3000/getTendersbyid`,body,{headers:this.headers}).toPromise();
  }

  bidstatusbyid(tenderId:any){
    var body:any = {tenderId : tenderId}
    return this.http.post<any>(`http://localhost:3000/bidstatusbyid`,body,{headers:this.headers}).toPromise();
  }

  getbids(tenderId:any){
    var body:any = {tenderId : tenderId}
    return this.http.post<any>(`http://localhost:3000/getbids`,body,{headers:this.headers}).toPromise();
  }

  getbid(bidId:any){
    var body:any = {bidId : bidId}
    return this.http.post<any>(`http://localhost:3000/getbid`,body,{headers:this.headers}).toPromise();
  }

  bidapprove(bidId:any){
    var body:any = {bidId : bidId}
    return this.http.post<any>(`http://localhost:3000/bidapprove`,body,{headers:this.headers}).toPromise();
  }

  bidunapprove(bidId:any){
    var body:any = {bidId : bidId}
    return this.http.post<any>(`http://localhost:3000/bidunapprove`,body,{headers:this.headers}).toPromise();
  }

  removetender(tenderId:any){
    var body:any = {tenderId : tenderId}
    return this.http.post<any>(`http://localhost:3000/removetender`,body,{headers:this.headers}).toPromise();
  }

  filterbids(tenderId:any,order:any){
    var body:any = {tenderId : tenderId,order:order}
    return this.http.post<any>(`http://localhost:3000/filterbids`,body,{headers:this.headers}).toPromise();
  }

  getnotification(target:any){
    var body:any = {target : target}
    return this.http.post<any>(`http://localhost:3000/getnotification`,body,{headers:this.headers}).toPromise();
  }

  removenotification(id:any){
    var body:any = {id : id}
    return this.http.post<any>(`http://localhost:3000/removenotification`,body,{headers:this.headers}).toPromise();
  }

  addnotification(target:any,heading:any,content:any){
    var body:any = {target:target, heading:heading , content : content}
    console.log(body);
    
    return this.http.post<any>(`http://localhost:3000/addnotification`,body,{headers:this.headers}).toPromise();
  }

}
