import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { ServiceService } from 'src/app/services/service.service';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-user-tenderapply',
  templateUrl: './user-tenderapply.component.html',
  styleUrls: ['./user-tenderapply.component.css']
})
export class UserTenderapplyComponent implements OnInit {

  constructor(private router: Router,private  dialog:  MatDialog,public service: AdminServiceService,private route: ActivatedRoute) { }

  bid:any;
  tenderid:any;
  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params:any) => {
        this.tenderid = params.tenderid;
      })
  }
  applytenderpg = new FormGroup({
    applyname: new FormControl(''),
    applydate: new FormControl(''),
    applyamount: new FormControl(''),
    applygst: new FormControl(''),
    applyaccount: new FormControl(''),
    biddetails: new FormControl('')
  });

  apply(){
    this.bid = {bidname: this.applytenderpg.value['applyname'],biddate:this.applytenderpg.value['applydate'],bidamount: this.applytenderpg.value['applyamount'],bidgst: this.applytenderpg.value['applygst'],bidaccount:this.applytenderpg.value['applyaccount'],biddetails: this.applytenderpg.value['biddetails']}
    console.log(this.bid);
    
  }

}
