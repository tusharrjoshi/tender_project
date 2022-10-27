import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { ServiceService } from 'src/app/services/service.service';


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

  constructor(private router: Router,private  dialog:  MatDialog,public service: ServiceService) { }

  ngOnInit(): void {
    
    if(localStorage.getItem('remember')){
      if(localStorage.getItem('adminuser')){
        var getdata:any = localStorage.getItem('adminuser')
        var logincred:any = JSON.parse(getdata);
        if (this.service.isadmin(logincred[0],logincred[1])){
          this.router.navigate(['/','dashboard']);
        }
      }

    }
    
  }
  username:any;
  password:any;

  loginsubmit(){
    var username:any = this.loginpg.value['username'];
    var password:any = this.loginpg.value['password']
    
    if (this.service.isadmin(username,password)){
      if(this.loginpg.value['remember']){localStorage.setItem('remember','true')}
      
      var logincred = [username,password]
      localStorage.setItem('adminuser', JSON.stringify(logincred));
      this.router.navigate(['/','dashboard']);
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
    
  }
  }
