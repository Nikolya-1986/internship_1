import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs/internal/Observable";
import { Character } from "src/app/interfaces/character.card.interface";

import AppUsersState from "src/app/store/character-card/character.card.state";
import * as usersActions from "src/app/store/character-card/character.card.actions";
import *as usersSelector from "src/app/store/character-card/character.card.selector";

@Component({
    selector: 'app-home-character-card',
    templateUrl: './home-character-card.component.html',
    styleUrls: ['./home-character-card.component.scss']
})
export class HomeCharacterCardComponent {

    public title: string = "Page cartoon characters"

    public loading$!: Observable<string | any>
    public users$!: Observable<Character[]>
    public error$!: Observable<Error>

    constructor(
        private store: Store<AppUsersState>,
    ){}

    public ngOnInit(): void {
        this.store.dispatch(usersActions.loadUsersRequest())
        this.loading$ = this.store.pipe(select(usersSelector.getUsersLoadingSelector))
        this.users$ = this.store.pipe(select(usersSelector.getUsersListSelector))
        this.error$ = this.store.pipe(select(usersSelector.getUsersFailSelector))
    }
}