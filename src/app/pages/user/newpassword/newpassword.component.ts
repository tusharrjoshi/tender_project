import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { ServiceService } from 'src/app/services/service.service';


@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {
  newpasspg = new FormGroup({
    password: new FormControl(''),
    confpassword: new FormControl('')
  });

  constructor(private router: Router,private  dialog:  MatDialog,public service: ServiceService,private route: ActivatedRoute) { }
  cred:any;
  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params:any) => {
        this.cred = params.cred;
        console.log(this.cred);
      })
  }

  same:boolean = true;
  isvalidpassword:boolean = true;

  matchpass(){
    var password:any = this.newpasspg.value['password'];
    var confpassword:any = this.newpasspg.value['confpassword']
    if (password===confpassword){
      this.same = true;
    }
    else
        {
            this.same = false;
        }
  }
  validpassword(event:any){
    var pass = event.target.value;
    var paswd=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if(pass.match(paswd))
    {
      this.isvalidpassword=true;
    }
    else{this.isvalidpassword=false}
  }
  save(){
    this.service.setnewpassword(this.cred,this.newpasspg.value['password']).then((res:any)=>{
      if(res.valid&&this.same&&this.isvalidpassword)
    {
      this.dialog.open(PopupComponent,{ data: {
        title:'Success!',
        type:'success',
        message:  "New password set Successfully.",
        button: "ok",
        },width:'300px'})
        .afterClosed()                                                            //call event after popup close
        .subscribe((res) => {
          this.router.navigate(['/','user-login']);
        });
    }
    })

    

  }

  }
