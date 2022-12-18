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
  bids:any;

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
    
    this.service.getbids(this.tenderid).then((res)=>{
      this.bids = res.data;
      console.log(this.bids);
      
    }).catch((err:any)=>{
      
      this.dialog.open(PopupComponent,{ data: {
        title:'Success!',
        type:'success',
        message:  "Make Payment",
        },width:'300px'})
    })
  }

  filter(){
    
  }

  
  

}
