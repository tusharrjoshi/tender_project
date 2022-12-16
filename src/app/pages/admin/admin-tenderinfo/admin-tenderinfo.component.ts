import {Component, OnInit, ElementRef  } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';

@Component({
  selector: 'app-admin-tenderinfo',
  templateUrl: './admin-tenderinfo.component.html',
  styleUrls: ['./admin-tenderinfo.component.css']
})
export class AdminTenderinfoComponent implements OnInit {

  constructor(private elementRef: ElementRef,private adminservice:AdminServiceService,private  dialog:  MatDialog,private route: ActivatedRoute) { }

 tenderid:any ;
  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params:any) => {
        this.tenderid = params.tenderid;
      })
    var getdata:any = localStorage.getItem('adminuser')
    var cred:any = JSON.parse(getdata);
    console.log("befr api called");
    console.warn(this.tenderid);
    
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }



  

}
