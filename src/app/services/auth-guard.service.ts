import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { ServiceService } from './service.service';
import { Observable } from 'rxjs';
 
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
    constructor(private router:Router, private service: ServiceService) {
 
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean|UrlTree {
 
        if (!this.service.isUserLoggedIn()) {
            alert("You are not allowed to view this page. Please Login first!")
            this.router.navigate(['/','user-login']);
            return false;
 
            //var urlTree = this.router.createUrlTree(['login']);
            //return urlTree;
        } 
 
        return true;
    }
 
}