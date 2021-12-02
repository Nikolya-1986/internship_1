import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import AppCharactersState from "../store/character/character.state";
import { Store } from "@ngrx/store";
import * as charactersActions from "../store/character/character.actions";
import { finalize } from "rxjs/operators";

@Injectable()
export class IsLoadingInterceptor implements HttpInterceptor {

    constructor(
        private store: Store<AppCharactersState>,
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.store.dispatch(charactersActions.loadStart());
        return next.handle(req).pipe(
            finalize(() => {
                this.store.dispatch(charactersActions.loadEnd())
            })
        )
    }
}