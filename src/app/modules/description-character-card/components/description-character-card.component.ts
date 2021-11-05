import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { CharacterDTO } from "src/app/interfaces/character.card.interface";
import * as charactersActions from "src/app/store/character-card/character-card.actions";
import *as charactersSelectors from "src/app/store/character-card/character-card.selector";
import AppCharactersState from "src/app/store/character-card/character-card.state";

@Component({
    selector: 'app-description-character',
    templateUrl: './description-character-card.component.html',
    styleUrls: ['./description-character-card.component.scss']
})
export class DescriptionCharacterCardComponent implements OnInit, OnDestroy {

    public characterDetail$!: Observable<CharacterDTO | null>;
    private destroy$ = new Subject();

    public columns = ["Secret key", "Name", "Status", "Species", "Gender", "Created", "Origin name", "Origin url", "Location name", "Location url"]
    public indexes: string [] = ["id", "name", "status", "species", "gender", "created", "origin.name", "origin.url", "location.name", "location.url"]

    constructor(
        private store: Store<AppCharactersState>,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ){}

    public ngOnInit(): void {
        this.store.dispatch(charactersActions.loadCharacterRequest({characterID: this.activatedRoute.snapshot.params.id}))
        this.characterDetail$ = this.store.pipe(select(charactersSelectors.getCharacterCurrentSelector))
        this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => { })
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}