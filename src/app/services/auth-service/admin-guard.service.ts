import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ServiceService } from '../service.service';
import { Observable } from 'rxjs';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';

@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(private router: Router, private service: ServiceService,private  dialog:  MatDialog) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (localStorage.getItem("admintoken")) {
      var token = localStorage.getItem("admintoken");
      
      this.service.isloggedin(token).then((res: any) => {
        
        if (!res.status) {
          alert('You are not allowed to view this page. Please Login first!');
          this.router.navigate(['/', 'pages-login']);
          return false;
        }
        else{
          if(res.data.isAdmin){return true}
          else{return false}
          
        }
      }).catch((err:any)=>{
        if(err.error.status==="failed"){
          this.dialog.open(PopupComponent,{ data: {
            title:'Server error!',
            type:'alert',
            message:  err.error.msg
            },width:'300px'}).afterClosed().subscribe(()=>{this.router.navigate(['/', 'pages-login']);});
        }
        else{
          this.dialog.open(PopupComponent,{ data: {
            title:'Server error!',
            type:'alert',
            message:  "Failed to connect to server"
            },width:'300px'}).afterClosed().subscribe(()=>{this.router.navigate(['/', 'pages-login']);});
        }
        
          return false;
          
      });
    } else {
      alert('You are not allowed to view this page. Please Login first!');
      this.router.navigate(['/', 'pages-login']);
      return false;
    }
    return true;
  }
}
