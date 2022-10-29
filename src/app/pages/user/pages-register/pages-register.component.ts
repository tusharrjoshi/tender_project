import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { ServiceService } from 'src/app/services/service.service';


@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.css']
})
export class PagesRegisterComponent implements OnInit {

  registerpg = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('',),
    phone: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    agreetnc: new FormControl('')
  });

  constructor(private  dialog:  MatDialog,private router: Router,private service: ServiceService) { }

  ngOnInit(): void {
    
  }

  isvaliduser:boolean=true;
  isuser:boolean=true;
  isvalidphone:boolean=true;
  isphone:boolean=true;
  isvalidemail:boolean=true;
  isvalidname:boolean=true;
  isvalidpassword:boolean=true;

  registersubmit(){
    if(this.registerpg.value['agreetnc'] && this.registerpg.value['name'] &&this.registerpg.value['username'] &&this.registerpg.value['phone'] &&this.registerpg.value['email']&& this.registerpg.value['password']){
      this.service.sendregisterotp(this.registerpg.value['email'],this.registerpg.value['phone']).then((res:any)=>{
        if(res.valid){
          this.dialog.open(PopupComponent,{ data: {
            title:'Success!',
            type:'success',
            message:  "Otp sent successfully!."
            },width:'300px'})
            .afterClosed()                                                            //call event after popup close
            .subscribe((res) => {
              this.router.navigate(['/','registerotp'],{queryParams: {name:this.registerpg.value['name'],email:this.registerpg.value['email'],phone:this.registerpg.value['phone'],username:this.registerpg.value['username'],pass:this.registerpg.value['password']},skipLocationChange: true});
              // call getAllEvents() here
            });
          }
      })
      
    }
  }
  validname(event:any){
    var name:string = event.target.value;
    if (name.length<4){this.isvalidname=false}
    else if(/\d/.test(name)){this.isvalidname=false}
    else{this.isvalidname=true}
  }
  validuser(event:any){
    var username = event.target.value
    if(/^[0-9a-zA-Z_.-]+$/.test(username) && username.length>=6 ){
      this.isuser = true
      this.service.isvaliduser(event.target.value).then((res:any)=>{
        if(res.valid){this.isvaliduser = true}
      else(this.isvaliduser=false)
      })
      
    }
    else{this.isuser = false}
    
  }
  validemail(event:any){
    this.service.isvalidemail(event.target.value).then((res:any)=>{
      if(res.valid){this.isvalidemail = true}
      else(this.isvalidemail=false)
    })    
    
  }
  validphone(event:any){
    const regexExp = /^[6-9]\d{9}$/gi;
    if(regexExp.test(event.target.value)){
      this.isphone = true;
      this.service.isvalidphone(event.target.value).then((res:any)=>{
        if(res.valid){this.isvalidphone = true}
        else(this.isvalidphone=false)
      })
      
    }
    else{
      this.isphone = false;
    }  
  }

  validpassword(event:any){
    var pass = event.target.value;
    var paswd=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if(pass.match(paswd))
    {
      this.isvalidpassword=true;
    }
    else{this.isvalidpassword=false}
  }

}
