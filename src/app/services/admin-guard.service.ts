import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { ServiceService } from './service.service';
import { Observable } from 'rxjs';

 
 
@Injectable()
export class AdminGuardService implements CanActivate {
 
    constructor(private router:Router, private service: ServiceService) {
 
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean|UrlTree {
 
        if (!this.service.isAdminLoggedIn()) {

            alert("You are not allowed to view this page. Please Login first!")
            this.router.navigate(['/','pages-login']);

            // this.router.navigate(["login"],{ queryParams: { retUrl: route.url} });
            return false;
 
            //var urlTree = this.router.createUrlTree(['login']);
            //return urlTree;
        } 
 
        return true;
    }
 
}