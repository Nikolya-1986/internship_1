import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { AuthServise } from "../modules/login/services/auth/auth.servise";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authServise: AuthServise,
        private router: Router
    ) {}


    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
      
        if(this.authServise.isAuthenticated) {
          return true;
        }else {
          this.router.navigate(["login"]);
          return false;
        }
    }
}