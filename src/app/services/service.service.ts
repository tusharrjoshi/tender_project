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
  
  constructor(public http: HttpClient) { }

  api = 'http://localhost:5000/tender/';
  

  isadmin(username:any,password:any){
    return this.http.get(`${this.api}isadmin?username=${username}&password=${password}`).toPromise();
  }
  isuser(username:any,password:any){
    return this.http.get(`${this.api}isuser?username=${username}&password=${password}`).toPromise();
  }


  isvaliduser(username:string){
    return this.http.get(`${this.api}isvaliduser?username=${username}`).toPromise();
  }

  isvalidemail(email:string){
    return this.http.get(`${this.api}isvalidemail?email=${email}`).toPromise();
  }

  isvalidphone(phone:string){
    return this.http.get(`${this.api}isvalidphone?phone=${phone}`).toPromise();
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

  registernewuser(obj:any){                           //api to add a user
    return this.http.get(`${this.api}`).toPromise();
  }

}
