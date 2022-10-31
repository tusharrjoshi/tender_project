import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';
import { Observable } from 'rxjs';
import { PopupComponent } from 'src/app/layouts/popup/popup.component';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';

 
 
@Injectable()
export class AdminGuardService implements CanActivate {
 
    constructor(private router:Router, private service: AdminServiceService,private  dialog:  MatDialog) {
 
    }
 
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): boolean | UrlTree {
        if (localStorage.getItem('adminuser')) {
          var getdata: any = localStorage.getItem('adminuser');
          var logincred: any = JSON.parse(getdata);
    
          this.service.isadmin(logincred[0], logincred[1]).then((res: any) => {
            console.log(res);
            
            if (!res.isadmin) {
              alert('You are not allowed to view this page. Please Login first!');
              this.router.navigate(['/', 'pages-login']);
              return false;
            }
          }).catch((err:any)=>{ 
            this.dialog.open(PopupComponent,{ data: {
              title:'Server error!',
              type:'alert',
              message:  "Failed to connect to server"
              },width:'300px'}).afterClosed().subscribe(()=>{this.router.navigate(['/', 'user-login']);});
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