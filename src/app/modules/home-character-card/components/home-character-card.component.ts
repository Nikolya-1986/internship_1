import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs/internal/Observable";
import { Router } from "@angular/router";
import { CharacterDTO } from "src/app/interfaces/character.card.interface";

import AppCharactersState from "src/app/store/character-card/character-card.state";
import * as charactersActions from "src/app/store/character-card/character-card.actions";
import *as charactersSelectors from "src/app/store/character-card/character-card.selector";


@Component({
    selector: 'app-home-character-card',
    templateUrl: './home-character-card.component.html',
    styleUrls: ['./home-character-card.component.scss']
})
export class HomeCharacterCardComponent {

    public loading$!: Observable<string | any>;
    public characters$!: Observable<CharacterDTO[]>;
    public error$!: Observable<Error>

    constructor(
        private store: Store<AppCharactersState>,
        private router: Router
    ){}

    public ngOnInit(): void {
        this.store.dispatch(charactersActions.loadCharactersRequest()),
        this.loading$ = this.store.pipe(select(charactersSelectors.getCharactersLoadingSelector)),
        this.characters$ = this.store.pipe(select(charactersSelectors.getCharactersListSelector)),
        this.error$ = this.store.pipe(select(charactersSelectors.getCharactersFailSelector))
    }

    detailCharacter(id: number) {
        this.router.navigate(['/', id])
    }
}