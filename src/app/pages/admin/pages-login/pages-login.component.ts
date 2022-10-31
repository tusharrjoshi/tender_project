import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { AdminServiceService } from 'src/app/services/admin-service.service';


@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit {

  loginpg = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl('')
  });

  constructor(private router: Router,private  dialog:  MatDialog,public service: AdminServiceService) { }

  ngOnInit(): void {
    
    if(localStorage.getItem('adminremember')){
      if(localStorage.getItem('adminuser')){
        var getdata:any = localStorage.getItem('adminuser')
        var logincred:any = JSON.parse(getdata);

        this.service.isadmin(logincred[0],logincred[1]).then((res:any)=>{
          if(res.isadmin){this.router.navigate(['/','dashboard']);}
        }).catch((err:any)=>{
          this.dialog.open(PopupComponent,{ data: {
            title:'Server error!',
            type:'alert',
            message:  "Failed to connect to server"
            },width:'300px'});
        })
          
      }

    }
    
  }
  username:any;
  password:any;

  loginsubmit(){
    var username:any = this.loginpg.value['username'];
    var password:any = this.loginpg.value['password']
    
    this.service.isadmin(username,password).then((res:any)=>{
      if(res.isadmin)
    {
      if(this.loginpg.value['remember']){localStorage.setItem('adminremember','true')}
      
      var logincred = [username,password]
      localStorage.setItem('adminuser', JSON.stringify(logincred));
      this.dialog.open(PopupComponent,{ data: {
        title:'Success!',
        type:'success',
        message:  "Login Successfull."
        },width:'300px'}).afterClosed()
        .subscribe((res)=>{
          this.router.navigate(['/','admin-dashboard']);
        })
      
    }
    else if(username===''||password===''){
      this.dialog.open(PopupComponent,{ data: {
        title:'Alert!',
        type:'alert',
        message:  "Please fill all the details."
        },width:'300px'});
    }
    else
        {
            this.dialog.open(PopupComponent,{ data: {
            title:'Alert!',
            type:'alert',
            message:  "Wrong login credentials try again."
            },width:'300px'});
        }
        
      }).catch((err:any)=>{
        this.dialog.open(PopupComponent,{ data: {
          title:'Server error!',
          type:'alert',
          message:  "Failed to connect to server"
          },width:'300px'});
      })
  }
  }
