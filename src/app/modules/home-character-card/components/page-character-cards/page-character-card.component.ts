import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

import { CharacterDTO } from "../../../../interfaces/character.card.interface";
import AppCharactersState from "../../../../store/character-card/character-card.state";
import * as charactersActions from "../../../../store/character-card/character-card.actions";
import * as charactersSelectors from "../../../../store/character-card/character-card.selector";


@Component({
    selector: 'app-page-character-card',
    templateUrl: './page-character-card.component.html',
    styleUrls: ['./page-character-card.component.scss']
})
export class PageharacterCardComponent implements OnInit {

    public loading$!: Observable<string | any>;
    public characters$!: Observable<CharacterDTO[]>;
    public error$!: Observable<Error>;

    constructor(
        private store: Store<AppCharactersState>,
        private router: Router,
    ){}

    public ngOnInit(): void {
        this.store.dispatch(charactersActions.loadCharactersRequest()),
        this.loading$ = this.store.pipe(select(charactersSelectors.getCharactersLoadingSelector));
        this.characters$ = this.store.pipe(select(charactersSelectors.getCharactersListSelector));
        this.error$ = this.store.pipe(select(charactersSelectors.getCharactersFailSelector));
    }

    public detailCharacter(id: number) {
        this.router.navigate(['/', id]);
    }
}