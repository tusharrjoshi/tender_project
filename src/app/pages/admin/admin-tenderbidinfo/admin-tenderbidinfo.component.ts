import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { ServiceService } from 'src/app/services/service.service';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-tenderbidinfo',
  templateUrl: './admin-tenderbidinfo.component.html',
  styleUrls: ['./admin-tenderbidinfo.component.css']
})
export class AdminTenderbidinfoComponent implements OnInit {

  constructor(private router: Router,private  dialog:  MatDialog,public service: AdminServiceService,private route: ActivatedRoute) { }
  bid:any;
  tenderid:any;

  ngOnInit(): void {
  }
  applytenderpg = new FormGroup({
    applyname: new FormControl(''),
    applydate: new FormControl(''),
    applyamount: new FormControl(''),
    applygst: new FormControl(''),
    applyaccount: new FormControl(''),
    biddetails: new FormControl('')
  });

  approve(){
    
  }

}
