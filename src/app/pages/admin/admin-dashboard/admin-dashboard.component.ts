import {Component, OnInit, ElementRef  } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private elementRef: ElementRef,private adminservice:AdminServiceService,private  dialog:  MatDialog,private router:Router) { }
  sno:number=1;
  
  tenderlist:any ;
  userID:any;
  ngOnInit(): void {
    var getdata:any = localStorage.getItem('adminuser')
    this.userID = localStorage.getItem('adminid');
    var cred:any = JSON.parse(getdata);
    
    
    this.adminservice.getTenders(this.userID).then((res:any)=>{
      console.warn(res);
      
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

  remove(tenderId:any){
    this.adminservice.removetender(tenderId).then((res:any)=>{
      this.dialog.open(PopupComponent,{ data: {
        title:'Deleted!',
        type:'success',
        message:  "tender deleted successfully"
        },width:'300px'}).afterClosed().subscribe((res)=>{window.location.reload();})
    }).catch((err:any)=>{
      this.dialog.open(PopupComponent,{ data: {
        title:'Server error!',
        type:'alert',
        message:  "Failed to connect to server"
        },width:'300px'})
    })
  }

  

}


