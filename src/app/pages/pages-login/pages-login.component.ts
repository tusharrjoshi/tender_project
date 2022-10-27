import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';


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

  constructor(private router: Router,private  dialog:  MatDialog) { }

  ngOnInit(): void {
    
    if(localStorage.getItem('remember')){
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
    var username:any = this.loginpg.value['username'];
    var password:any = this.loginpg.value['password']
    if(this.loginpg.value['remember']){localStorage.setItem('remember','true') 
      var logincred = [username,password]
      localStorage.setItem('adminuser', JSON.stringify(logincred));
      console.log('info saved');
    }
    this.authenticate(username,password);
  }

  authenticate(username:any,password:any){
    console.warn(username,password);
    
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
