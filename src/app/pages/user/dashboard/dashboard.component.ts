import {Component, OnInit, ElementRef  } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { ServiceService } from 'src/app/services/service.service';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private elementRef: ElementRef,private adminservice:AdminServiceService,private  dialog:  MatDialog,private router:Router,private service :ServiceService) { }

  sno:number=1;
  
  tenderlist:any ;

  ngOnInit(): void {
    var getdata:any = localStorage.getItem('adminuser')
    var cred:any = JSON.parse(getdata);
    console.log("befr api called");
    
    
    this.service.getallTenders().then((res:any)=>{
      this.tenderlist = res.data;
      console.log(this.tenderlist);
      
    }).catch((err:any)=>{


      this.dialog.open(PopupComponent,{ data: {
        title:'Server error!',
        type:'alert',
        message:  "Failed to connect to server"
        },width:'300px'})});
    
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

}