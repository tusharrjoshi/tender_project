import {Component, OnInit, ElementRef  } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { Router,ActivatedRoute } from '@angular/router';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';

@Component({
  selector: 'app-admin-tenderbidinfo',
  templateUrl: './admin-tenderbidinfo.component.html',
  styleUrls: ['./admin-tenderbidinfo.component.css']
})
export class AdminTenderbidinfoComponent implements OnInit {

  constructor(private router: Router,private  dialog:  MatDialog,public service: AdminServiceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
