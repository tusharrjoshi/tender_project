import { Injectable } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  userlogin:string='';
  userpassword:string='';
  adminlogin:string='';
  adminpassword:string='';
  constructor() { }
  isadmin(username:any,password:any){
    var is:boolean=false;
    if(username==='prit'&&password==='123456'){is=true}
    return is;
  }
  isuser(username:any,password:any){
    var is:boolean=false;
    if(username==='prit'&&password==='123456'){is=true}
    return is;
  }

  isUserLoggedIn():boolean{
    if(localStorage.getItem('user')){
      var getdata:any = localStorage.getItem('user')
      var logincred:any = JSON.parse(getdata);
      if (this.isuser(logincred[0],logincred[1])){return true}
      else{return false}
    }
    else{return false}
  }

  isAdminLoggedIn():boolean{
    if(localStorage.getItem('adminuser')){
      var getdata:any = localStorage.getItem('adminuser')
      var logincred:any = JSON.parse(getdata);
      if (this.isuser(logincred[0],logincred[1])){return true}
      else{return false}
    }
    else{return false}
  }

  isvaliduser(username:string){
    if(username!=='prit'){return true}
    return false;
  }

  isvalidemail(email:string){
    if(email!=='tendor@gmail.com'){return true}
    return false;
  }

  isvalidphone(phone:string){
    if(phone!=='7737788388'){return true}
    return false;
  }

  fgpasssendotp(cred:any){
    return true;
  }

  validateotp(otp:any){
    return true;
  }

  resendotp(){
    
  }

}
