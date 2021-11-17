import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthServise } from "../modules/login/services/auth/auth.servise";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authServise: AuthServise,
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const token = this.authServise.getToken();
        const authReq = req.clone({
            headers: req.headers.set('token', token),
        })

        return next.handle(authReq);
    }
}