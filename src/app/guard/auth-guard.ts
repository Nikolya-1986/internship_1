import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthServise } from "../modules/login/services/auth/auth.servise";

@Injectable()
export class AuthGuard implements CanActivate {

    private token = localStorage.getItem('token');

    constructor(
        private authServise: AuthServise,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> {
        return this.authServise.isAuthenticated().then(
            (authenticated: boolean) => {
                if(authenticated) {
                    return true
                } else {
                    this.router.navigate([""]);
                    return false
                }
            }

        )
    }
}