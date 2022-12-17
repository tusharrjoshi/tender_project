import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { CountdownConfig,CountdownEvent,CountdownComponent } from 'ngx-countdown';
@Component({
  selector: 'app-admin-tenderbid',
  templateUrl: './admin-tenderbid.component.html',
  styleUrls: ['./admin-tenderbid.component.css']
})
export class AdminTenderbidComponent implements OnInit {

  constructor(private router: Router,private  dialog:  MatDialog,public service: AdminServiceService,private route: ActivatedRoute) { }
  

  tenderid :any;
  tenderbidlist:any
  bidid:any;

  filterpg = new FormGroup({
    one: new FormControl(''),
    two: new FormControl(''),
    three: new FormControl(''),
    four: new FormControl(''),
    five: new FormControl(''),
   
  });

  ngOnInit(): void {
    this.route.queryParams
    .subscribe((params:any) => {
      this.tenderid = params.tenderid;
    })
    var getdata:any = localStorage.getItem('adminuser')
    var cred:any = JSON.parse(getdata);
    this.service.gettenderlist(cred[0]).then((res:any)=>{
      this.tenderbidlist = res.tenderlist;
      console.log(this.tenderbidlist);
      
    }).catch((err:any)=>{


      this.dialog.open(PopupComponent,{ data: {
        title:'Server error!',
        type:'alert',
        message:  "Failed to connect to server"
        },width:'300px'})});
  }

  filter(){
    
  }

  
  

}
