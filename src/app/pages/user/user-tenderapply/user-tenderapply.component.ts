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

  constructor(private router: Router,private  dialog:  MatDialog,public service: ServiceService,private route: ActivatedRoute,private adminservice : AdminServiceService) { }

  bid:any;
  tenderid:any;
  userid:any;
  username:any;
  adminid:any;
  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params:any) => {
        this.tenderid = params.tenderid;
        this.adminid = params.adminid
      })
    this.userid = localStorage.getItem('userid')
    this.username = localStorage.getItem('username')
    
  }
  applytenderpg = new FormGroup({
    applyname: new FormControl(''),
    applydate: new FormControl(''),
    applyamount: new FormControl(''),
    applyphone: new FormControl(''),
    applygst: new FormControl(''),
    applyaccount: new FormControl(''),
    biddetails: new FormControl('')
  });

  apply(){
    this.bid = {bidname: this.applytenderpg.value['applyname'],biddate:this.applytenderpg.value['applydate'],bidamount: this.applytenderpg.value['applyamount'],bidgst: this.applytenderpg.value['applygst'],bidphone: this.applytenderpg.value['applyphone'],bidaccount:this.applytenderpg.value['applyaccount'],biddetails: this.applytenderpg.value['biddetails']}
    this.service.bid(this.tenderid,this.userid,this.bid).then((res)=>{
      
      this.dialog.open(PopupComponent,{ data: {
        title:'Success!',
        type:'success',
        message:  res,
        },width:'300px'})

    })
    .catch((err:any)=>{
      this.adminservice.bidstatusbyid(this.tenderid).then((res:any)=>{
        this.dialog.open(PopupComponent,{ data: {
          title:'Success!',
          type:'success',
          message:  "Make Payment",
          },width:'300px'})
      }).catch((err:any)=>{
        this.dialog.open(PopupComponent,{ data: {
          title:'Success!',
          type:'success',
          message:  "Make Payment",
          button : "Pay",
          },width:'300px'}).afterClosed().subscribe((res:any)=>{
            var heading = 'new bid placed';
            var content = `your tender with tenderid:${this.tenderid} is placed with bid by user ${this.username}`;
            this.service.addnotification(this.adminid,heading,content).then((res:any)=>{
              console.log("done");
              
            })
            this.router.navigate(['/','user-makepayment'])
          })
        
      })
      
      
      });

    
    
  }

}
