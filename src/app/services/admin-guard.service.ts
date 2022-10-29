import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { ServiceService } from './service.service';
import { Observable } from 'rxjs';

 
 
@Injectable()
export class AdminGuardService implements CanActivate {
 
    constructor(private router:Router, private service: ServiceService) {
 
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
          });
        } else {
          alert('You are not allowed to view this page. Please Login first!');
          this.router.navigate(['/', 'pages-login']);
          return false;
        }
        return true;
      }
    }