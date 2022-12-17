import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { ServiceService } from 'src/app/services/service.service';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-addtender',
  templateUrl: './admin-addtender.component.html',
  styleUrls: ['./admin-addtender.component.css']
})
export class AdminAddtenderComponent implements OnInit {

  addtenderpg = new FormGroup({
    tendertitle: new FormControl(''),
    openingdate: new FormControl(''),
    closingdate: new FormControl(''),
    tendertype: new FormControl(''),
    supplier: new FormControl(''),
  });

  addtendermodal = new FormGroup({
    productname: new FormControl(''),
    productdescription: new FormControl(''),
    productquantity: new FormControl(''),
    productunits: new FormControl(''),
    attachements: new FormControl(''),
    otherattachements: new FormControl(''),

  });

  newtender:any;
  productlist:any[]=[];
  constructor(private router: Router,private  dialog:  MatDialog,public service: AdminServiceService) { }

  ngOnInit(): void {
  }

  addtender(){
    // this.service.addtender(this.addtenderpg.value)
     this.newtender = {tendertitle: this.addtenderpg.value['tendertitle'],openingdate: this.addtenderpg.value['openingdate'],closingdate: this.addtenderpg.value['closingdate'],tendertype: this.addtenderpg.value['tendertype'],supplier: this.addtenderpg.value['supplier'],product: this.productlist}
     console.log(this.newtender);
     this.service.addtender('tushar',this.newtender).then()
     
  }

  addline(){
    this.productlist.push({productname: this.addtendermodal.value['productname'],productdescription: this.addtendermodal.value['productdescription'],productquantity: this.addtendermodal.value['productquantity'],productunits: this.addtendermodal.value['productunits'],attachements: this.addtendermodal.value['attachements'],otherattachements: this.addtendermodal.value['otherattachements'],})
    this.addtendermodal.reset({
      'productname': '',
      'productdescription': '',
      'productquantity': '',
      'productunits': '',
      'attachements': '',
      'otherattachements': ''
     });

  }

}
