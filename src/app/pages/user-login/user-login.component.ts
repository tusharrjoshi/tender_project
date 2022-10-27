import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';


@Component({
  selector: 'app-pages-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userloginpg = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl('')
  });

  constructor(private router: Router,private  dialog:  MatDialog) { }

  ngOnInit(): void {
    
    if(localStorage.getItem('remember')){
      console.log('remembered');
      if(localStorage.getItem('adminuser')){
        var getdata:any = localStorage.getItem('adminuser')
        var logincred:any = JSON.parse(getdata);
        this.authenticate(logincred[0],logincred[1]);
      }

    }
    
  }
  username:any;
  password:any;

  loginsubmit(){
    var username:any = this.userloginpg.value['username'];
    var password:any = this.userloginpg.value['password']
    if(this.userloginpg.value['remember']){localStorage.setItem('remember','true') 
      var logincred = [username,password]
      localStorage.setItem('adminuser', JSON.stringify(logincred));
    }
    this.authenticate(username,password);
  }

  authenticate(username:any,password:any){
    if (username==='prit' && password=='123456'){
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
