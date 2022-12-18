import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute, RouterLink } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { ServiceService } from 'src/app/services/service.service';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-tenderbidinfo',
  templateUrl: './admin-tenderbidinfo.component.html',
  styleUrls: ['./admin-tenderbidinfo.component.css']
})
export class AdminTenderbidinfoComponent implements OnInit {

  constructor(private router: Router,private  dialog:  MatDialog,public service: AdminServiceService,private route: ActivatedRoute,private location: Location) { }
  bid:any;
  bidId:any;
  tender:any;

  applytenderpg = new FormGroup({
    applyID: new FormControl(''),
    bidId: new FormControl(''),
    applyname: new FormControl(''),
    applydate: new FormControl(''),
    applyamount: new FormControl(''),
    applyphone: new FormControl(''),
    applygst: new FormControl(''),
    applyaccount: new FormControl(''),
    biddetails: new FormControl('')
  });

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params:any) => {
        this.bidId  = params.bidId;
      })
    
    this.service.getbid(this.bidId).then((res)=>{
      this.bid = res.data[0];
      console.log(this.bid);
      this.applytenderpg.controls['applyname'].setValue(this.bid.bidname);
      this.applytenderpg.controls['applydate'].setValue(this.bid.biddate);
      this.applytenderpg.controls['applyamount'].setValue(this.bid.bidamount);
      this.applytenderpg.controls['applygst'].setValue(this.bid.bidgst);
      this.applytenderpg.controls['applyaccount'].setValue(this.bid.bidaccount);
      this.applytenderpg.controls['applyphone'].setValue(this.bid.bidphone);
      this.applytenderpg.controls['biddetails'].setValue(this.bid.biddetails);
      this.applytenderpg.controls['applyID'].setValue(this.bid.userID);
      this.applytenderpg.controls['bidId'].setValue(this.bid.bidId);
      
    }).catch((err)=>{
      this.dialog.open(PopupComponent,{ data: {
        title:'Server error!',
        type:'alert',
        message:  "cannot connect!",
        },width:'300px'})
    })

      
  
    
  }
  


  approve(){
    this.service.bidapprove(this.bidId).then((res:any)=>{
      this.dialog.open(PopupComponent,{ data: {
        title:'Approved!',
        type:'success',
        message:  "Bid Approved!",
        button: "Ok"
        },width:'300px'})
    }).catch((err:any)=>{
      this.dialog.open(PopupComponent,{ data: {
        title:'Approved!',
        type:'success',
        message:  "Bid UnApproved!",
        button: "Ok"
        },width:'300px'})
    })
  }

  unapprove(){
    this.service.bidunapprove(this.bidId).then((res:any)=>{
      this.dialog.open(PopupComponent,{ data: {
        title:'UnApproved!',
        type:'success',
        message:  "Bid UnApproved!",
        button: "Ok"
        },width:'300px'})
        
    }).catch((err:any)=>{
      this.dialog.open(PopupComponent,{ data: {
        title:'UnApproved!',
        type:'success',
        message:  "Bid UnApproved!",
        button: "Ok"
        },width:'300px'})
    })
  }

}
