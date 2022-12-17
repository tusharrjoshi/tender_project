import { Component, OnInit, ElementRef } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';

@Component({
  selector: 'app-user-tenderinfo',
  templateUrl: './user-tenderinfo.component.html',
  styleUrls: ['./user-tenderinfo.component.css']
})
export class UserTenderinfoComponent implements OnInit {

  constructor() { }
  tenderid: any;
  newtender: any;
  productlist: any[] = [];

    tenderinfopg = new FormGroup({
    tendertitle: new FormControl(''),
    openingdate: new FormControl(''),
    closingdate: new FormControl(''),
    tendertype: new FormControl(''),
    supplier: new FormControl(''),
  });

  ngOnInit(): void {
  }

}
