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
      this.dialog.open(PopupComponent,{ data: {
        title:'Success!',
        type:'success',
        message:  "Account created successfully!."
        },width:'300px'})
        .afterClosed()                                                            //call event after popup close
        .subscribe((res) => {
          this.router.navigate(['/','user-login']);
          // call getAllEvents() here
        });
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
      if(this.service.isvaliduser(event.target.value)){this.isvaliduser = true}
    else(this.isvaliduser=false)
    }
    else{this.isuser = false}
    
  }
  validemail(event:any){    
    if(this.service.isvalidemail(event.target.value)){this.isvalidemail = true}
    else(this.isvalidemail=false)
  }
  validphone(event:any){
    const regexExp = /^[6-9]\d{9}$/gi;
    if(regexExp.test(event.target.value)){
      this.isphone = true;
      
      if(this.service.isvalidphone(event.target.value)){this.isvalidphone = true}
      else(this.isvalidphone=false)
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
