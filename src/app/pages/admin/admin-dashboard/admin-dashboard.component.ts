import {Component, OnInit, ElementRef  } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private elementRef: ElementRef,private adminservice:AdminServiceService,private  dialog:  MatDialog) { }
  sno:number=1;
  
  tenderlist:any ;

  ngOnInit(): void {
    var getdata:any = localStorage.getItem('adminuser')
    var cred:any = JSON.parse(getdata);
    console.log("befr api called");
    
    this.adminservice.gettenderlist(cred[0]).then((res:any)=>{
      this.tenderlist = res.tenderlist;
      console.log(this.tenderlist);
      
    }).catch((err:any)=>{
      console.log("api not called");
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


