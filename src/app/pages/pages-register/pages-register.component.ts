import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';


@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.css']
})
export class PagesRegisterComponent implements OnInit {

  registerpg = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    agreetnc: new FormControl('')
  });

  constructor(private  dialog:  MatDialog,private router: Router) { }

  ngOnInit(): void {
  }

  registersubmit(){
    if(this.registerpg.value['agreetnc']){
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

}
