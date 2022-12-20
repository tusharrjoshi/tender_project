import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { ServiceService } from 'src/app/services/service.service';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref } from "firebase/storage";

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

declare var $: any;

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
  constructor(private router: Router,private  dialog:  MatDialog,public service: AdminServiceService,private db: AngularFireDatabase, private storage: AngularFireStorage) { }
  adminname:any;
  ngOnInit(): void {
    var getdata:any = localStorage.getItem('adminuser')
    var cred:any = JSON.parse(getdata);
    console.warn(cred);
    this.adminname = localStorage.getItem('adminname')
  }

  addtender(){
    // this.service.addtender(this.addtenderpg.value)
      
     this.newtender = {tendertitle: this.addtenderpg.value['tendertitle'],openingdate: this.addtenderpg.value['openingdate'],closingdate: this.addtenderpg.value['closingdate'],tendertype: this.addtenderpg.value['tendertype'],supplier: this.addtenderpg.value['supplier'],product: this.productlist}
     console.log(this.newtender);
     var username = localStorage.getItem('admin')
     var adminID = localStorage.getItem('adminid')
     this.service.addtender(username,this.newtender,adminID).then((res:any)=>{
      
      console.log(res);
      
      if (res.status){

        this.dialog.open(PopupComponent,{ data: {
          title:'Success!',
          type:'success',
          message:  "Login Successfull"
          },width:'300px'}).afterClosed().subscribe((res)=>{
            var heading = "new tender posted";
            var content = `new tender ${this.newtender.tendertitle} is added by ${this.adminname}`
            this.service.addnotification('user',heading,content).then((res:any)=>{
              this.router.navigate(['/','dashboard'])
            })
            this.router.navigate(['/','dashboard'])
          })
        
      }
      
     })
     .catch((err:any)=>{

        if(err.status){
          this.dialog.open(PopupComponent,{ data: {
            title:'Success!',
            type:'success',
            message:  "Tender Added Successfully"
            },width:'300px'})
            .afterClosed().subscribe((res)=>{
              var heading = "new tender posted";
              var content = `new tender ${this.newtender.tendertitle} is added by ${this.adminname}`
              this.service.addnotification('user',heading,content).then((res:any)=>{
              })
              this.router.navigate(['/','admin-dashboard'])
            })
        }
        else{
          this.dialog.open(PopupComponent,{ data: {
            title:'Server error!',
            type:'alert',
            message:  err.error.msg
            },width:'300px'});
        }
        
        
    });
     
  }

  addline(){
    this.productlist.push({productname: this.addtendermodal.value['productname'],productdescription: this.addtendermodal.value['productdescription'],productquantity: this.addtendermodal.value['productquantity'],productunits: this.addtendermodal.value['productunits'],attachementurl:this.downloadurl,otherurl:this.otherurl})
    this.addtendermodal.reset({
      'productname': '',
      'productdescription': '',
      'productquantity': '',
      'productunits': '',
      'attachements': '',
      'otherattachements': ''
     });
     

  }

  
  
  uploadPercent:any;
  per:any;
  per2:any;
  downloadurl:any;
  otherurl:any;
  task:any;
  task2:any;


  upload(event:any) {
    $("#prog1").show();
    const file = event.target.files[0];
    const filePath:any = this.addtendermodal.value['attachements'];
    const fileRef = this.storage.ref(filePath);
     this.task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.task.percentageChanges().subscribe((res:any)=>{this.per = parseInt(res)})
    // get notified when the download URL is available
    this.task.snapshotChanges().pipe(
        finalize(() => {fileRef.getDownloadURL().subscribe((res:any)=>{this.downloadurl = res})
        $("#prog1").hide();
        })
     ).subscribe()
  }

  upload2(event:any) {
    $("#prog2").show();
    const file = event.target.files[0];
    const filePath:any = this.addtendermodal.value['otherattachements'];
    const fileRef = this.storage.ref(filePath);
     this.task2= this.storage.upload(filePath, file);

    // observe percentage changes
    this.task2.percentageChanges().subscribe((res:any)=>{this.per2 = parseInt(res)})
    // get notified when the download URL is available
    this.task2.snapshotChanges().pipe(
        finalize(() => {fileRef.getDownloadURL().subscribe((res:any)=>{this.otherurl = res}) 
        $("#prog2").hide();
        })
     ).subscribe()
  }

}
