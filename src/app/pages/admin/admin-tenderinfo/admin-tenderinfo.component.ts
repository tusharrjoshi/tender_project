import { Component, OnInit, ElementRef } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';

@Component({
  selector: 'app-admin-tenderinfo',
  templateUrl: './admin-tenderinfo.component.html',
  styleUrls: ['./admin-tenderinfo.component.css'],
})
export class AdminTenderinfoComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private service: AdminServiceService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  tenderid: any;
  tender: any;
  productlist: any[] = [];

    tenderinfopg = new FormGroup({
    tendertitle: new FormControl(''),
    openingdate: new FormControl(''),
    closingdate: new FormControl(''),
    tendertype: new FormControl(''),
    supplier: new FormControl(''),
  });
 
  
  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params:any) => {
        this.tenderid  = params.tenderid;
      })
    
    this.service.gettenderbyid(this.tenderid).then((res)=>{
      console.warn(res);
      
      this.tender = res.data[0];
      console.log(this.tender);

      
      
      this.tenderinfopg.controls['tendertitle'].setValue(this.tender.tenderTitle);
      this.tenderinfopg.controls['openingdate'].setValue(this.tender.openigDate);
      this.tenderinfopg.controls['closingdate'].setValue(this.tender.closingDate);
      this.tenderinfopg.controls['tendertype'].setValue(this.tender.tenderType);
      this.tenderinfopg.controls['supplier'].setValue(this.tender.supplier);
      this.productlist = JSON.parse(this.tender.product)
      
      
      
      
    }).catch((err:any)=>{
      console.log(3333333);
      

      this.dialog.open(PopupComponent,{ data: {
        title:'Server error!',
        type:'alert',
        message:  "Failed to connect to server"
        },width:'300px'})});
    
  }
}
