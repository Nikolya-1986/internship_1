import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { AuthServise } from "../modules/login/services/auth/auth.servise";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authServise: AuthServise,
        private router: Router
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const authReq = req.clone({
            headers: req.headers.set('token', this.authServise.getToken()),
        })

        return next.handle(authReq)
            .pipe(
                tap(
                    (result) => {
                        if(result instanceof HttpResponse) {
                            console.log('Authorized:', result);
                        }
                    },
                    (error) => {
                        if(error instanceof HttpErrorResponse && error.status === 401) {
                            console.log('Unauthorized:', error);
                        }
                    }
                )
            )
    }
}