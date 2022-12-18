import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { ServiceService } from 'src/app/services/service.service';


@Component({
  selector: 'app-pages-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userloginpg = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router,private  dialog:  MatDialog,public service: ServiceService) { }

  ngOnInit(): void {
    
  }
  username:any;
  password:any;

  loginsubmit(){
    var username:any = this.userloginpg.value['username'];
    var password:any = this.userloginpg.value['password'];
    
    if(username===''||password===''){
      this.dialog.open(PopupComponent,{ data: {
        title:'Alert!',
        type:'alert',
        message:  "Please fill all the details."
        },width:'300px'});
    }
    else{
    this.service.isuser(username,password).then((res:any)=>{
      if (res.status){
        console.log(res);
        
        localStorage.setItem("usertoken", res.token);
        localStorage.setItem("user",username)
        localStorage.setItem("username",res.user.username)
        localStorage.setItem("userid",res.user.user_id)
        this.dialog.open(PopupComponent,{ data: {
          title:'Success!',
          type:'success',
          message:  "Login Successfull"
          },width:'300px'}).afterClosed().subscribe((res)=>{this.router.navigate(['/','dashboard'])})
        
      }
    })
    .catch((err:any)=>{
      console.log(err.error);
      
      this.dialog.open(PopupComponent,{ data: {
        title:'Server error!',
        type:'alert',
        message:  err.error.msg
        },width:'300px'});
    });
    
  }
  }

  }
