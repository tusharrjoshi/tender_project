import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ServiceService } from './service.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private service: ServiceService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (localStorage.getItem('user')) {
      var getdata: any = localStorage.getItem('user');
      var logincred: any = JSON.parse(getdata);

      this.service.isuser(logincred[0], logincred[1]).then((res: any) => {
        if (!res.isuser) {
          alert('You are not allowed to view this page. Please Login first!');
          this.router.navigate(['/', 'user-login']);
          return false;
        }
      });
    } else {
      alert('You are not allowed to view this page. Please Login first!');
      this.router.navigate(['/', 'user-login']);
      return false;
    }
    return true;
  }
}
