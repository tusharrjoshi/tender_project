import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { ServiceService } from 'src/app/services/service.service';
import { CountdownConfig,CountdownEvent,CountdownComponent } from 'ngx-countdown';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})

export class ForgotComponent implements OnInit {
  
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  
  config: CountdownConfig = { leftTime: 60, notify: 0 };
  forgotpg = new FormGroup({
    cred: new FormControl(''),
    otp: new FormControl(''),
  });

  constructor(private router: Router,private  dialog:  MatDialog,public service: ServiceService) { }

  ngOnInit(): void {
    let value = +localStorage.getItem('countdown')!! ?? 60;
    if (value <= 0) value = 60;
    this.config = { ...this.config, leftTime: value };    //left time value
  }
  currtime:any;
  handleEvent(ev: CountdownEvent) {
    this.currtime = ev.left / 1000;
    if (ev.action === 'notify') {
      // Save current value
      localStorage.setItem('countdown', `${ev.left / 1000}`);
    }
  }
  isvalidcred:boolean;
  showotp(){
    var cred:any = this.forgotpg.value['cred'];
    
    if (this.service.fgpasssendotp(cred)){
      this.isvalidcred = true;
      }
  }

  proceed(){
    var otp:any = this.forgotpg.value['otp'];
    if(otp){
      if(this.service.validateotp(otp)){
        this.dialog.open(PopupComponent,{ data: {
          title:'Validation Successfull!',
          type:'success',
          message:  "Set up new password.",
          button: "ok"
          },width:'300px'})
        .afterClosed()                                                            //call event after popup close
        .subscribe((res) => {
          this.router.navigate(['/','newpassword']);
        });
      }
      else{
        this.dialog.open(PopupComponent,{ data: {
          title:'Alert!',
          type:'alert',
          message:  "OTP doesnot match!",
          },width:'300px'});
      }
    } 
  }

  resendotp(){
    console.log(this.currtime);
    if(this.currtime==0){
      this.config = { ...this.config, leftTime: 60 };
      this.service.resendotp();
    }
    
  }


  

  }

