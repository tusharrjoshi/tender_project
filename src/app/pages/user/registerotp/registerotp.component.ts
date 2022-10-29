import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { ServiceService } from 'src/app/services/service.service';
import { CountdownConfig,CountdownEvent,CountdownComponent } from 'ngx-countdown';


@Component({
  selector: 'app-registerotp',
  templateUrl: './registerotp.component.html',
  styleUrls: ['./registerotp.component.css']
})
export class RegisterotpComponent implements OnInit {

  
  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;
  
  config: CountdownConfig = { leftTime: 60, notify: 0 };
  registerotppg = new FormGroup({
    otp: new FormControl(''),
  });

  constructor(private router: Router,private  dialog:  MatDialog,public service: ServiceService,private route: ActivatedRoute) { }
  name:string;
  email:string;
  phone:string;
  username:string;
  password:string;
  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params:any) => {
        this.name = params.name;
        this.email  = params.email;
        this.phone = params.phone;
        this.username = params.username;
        this.password  = params.pass;
      })
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

  proceed(){
    var obj:any = {name : this.name,email : this.email, phone:this.phone,username:this.username,password:this.password}
    var otp:any = this.registerotppg.value['otp'];
    if(otp){this.service.validateregisterotp(otp).then((res:any)=>{
      if(res.valid){
        this.service.registernewuser(obj).then((res:any)=>{
          if(res.valid){
            this.dialog.open(PopupComponent,{ data: {
              title:'Validation Successfull!',
              type:'success',
              message:  "Login to account.",
              button: "ok"
              },width:'300px'})
            .afterClosed()                                                            //call event after popup close
            .subscribe((res) => {
              this.router.navigate(['/','user-login']);
            });
          }
        });
        
      }
      else{
        this.dialog.open(PopupComponent,{ data: {
          title:'Alert!',
          type:'alert',
          message:  "OTP doesnot match!",
          },width:'300px'});
      }
    })
      
    } 
  }

  resendotp(){
    console.log(this.currtime);
    if(this.currtime==0){
      this.config = { ...this.config, leftTime: 60 };
      this.service.resendregisterotp(this.email,this.phone).then((res:any)=>{
        if(res.valid){
          this.dialog.open(PopupComponent,{ data: {
            title:'Success!',
            type:'success',
            message:  "OTP resent successfully",
            button: 'Ok'
            },width:'300px'});
        }
      })   
    }
    
  }


  

  }
