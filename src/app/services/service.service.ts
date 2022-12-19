import { Injectable } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  userlogin:string='';
  userpassword:string='';
  adminlogin:string='';
  adminpassword:string='';
  
  headers= new HttpHeaders();
  t:any;
  constructor(public http: HttpClient) {
    this.t = localStorage.getItem('usertoken')
    console.log(this.t);
    
    this.headers.append('Content-Type', 'application/json');
    this.headers.append("Authorization", "Bearer " + this.t);
   }
  

  api = 'http://localhost:3000/';
  
  

  isuser(username:any,password:any){
    var body:any={
      email:username,
      password:password
    }
    return this.http.post<any>('http://localhost:3000/login',body).toPromise();
  }

  isloggedin(token:any){
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Basic ${token}`)
    }
    
    return this.http.get('http://localhost:3000/islogin', header).toPromise();
  }

  isvalidemail(email:string){console.log(111)
    var body:any={
      email:email
    }
    return this.http.post<any>(`${this.api}isvalidemail`,body).toPromise();
  }

  isvalidphone(phone:string){
    var body:any={
      phone:phone
    }
    return this.http.post<any>(`${this.api}isvalidphone`,body).toPromise();
  }

  fgpasssendotp(cred:any){
    return this.http.get(`${this.api}`).toPromise(); 
  }

  validateotp(otp:any){                           //api to validate otp
    return this.http.get(`${this.api}`).toPromise();
  }

  resendotp(cred:any){                            //to send otp for creating new password
    return this.http.get(`${this.api}`).toPromise();
  }

  setnewpassword(cred:any,password:any){                //to set new password for given cred
    return this.http.get(`${this.api}`).toPromise();
  }

  sendregisterotp(email:any,phone:any){                    //to send otp for registeration
    return this.http.get(`${this.api}`).toPromise();
  }

  validateregisterotp(otp:any){                               //apito validate register otp
    return this.http.get(`${this.api}`).toPromise();
  }

  resendregisterotp(email:any,phone:any){           //api to send otp for register details
    return this.http.get(`${this.api}`).toPromise();
  }

  registernewuser(obj:any){      
    var body = obj;                                     //api to add a user
    return this.http.post<any>(`${this.api}register`,body).toPromise();
  }

  getallTenders(){
    return this.http.get(`http://localhost:3000/getallTenders`).toPromise();
  }

  bid(tenderid:any,userid:any,bid:any){
    var body = {
      tenderId : tenderid,
      userId : userid,
      bidname : bid.bidname,
      biddate : bid.biddate,
      bidamount : bid.bidamount,
      bidphone: bid.bidphone,
      bidgst : bid.bidgst,
      bidaccount : bid.bidaccount,
      biddetails : bid.biddetails
    }
    console.log(body);
    
    return this.http.post<any>(`http://localhost:3000/bid`,body,{headers:this.headers}).toPromise();
  }

  addnotification(target:any,heading:any,content:any){
    var body:any = {target:target, heading:heading , content : content}
    console.log(body);
    
    return this.http.post<any>(`http://localhost:3000/addnotification`,body,{headers:this.headers}).toPromise();
  }

  getuserdata(userID:any){
    var body:any = {userID:userID}
    return this.http.post<any>(`http://localhost:3000/getuserdata`,body,{headers:this.headers}).toPromise();

  }

}
