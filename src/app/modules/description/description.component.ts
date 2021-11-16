import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";

import { CharacterDTO } from "../../interfaces/character-interface";
import * as charactersActions from "../../store/character-card/character-card.actions";
import *as charactersSelectors from "../../store/character-card/character-card.selector";
import AppCharactersState from "../../store/character-card/character-card.state";

@Component({
    selector: 'app-description-character',
    templateUrl: './description.component.html',
    styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

    public characterDetail$!: Observable<CharacterDTO | null>;
    private destroy$ = new Subject();

    public columns = ["Secret key", "Name", "Status", "Species", "Gender", "Created", "Origin name", "Origin url", "Location name", "Location url"];

    constructor(
        private store: Store<AppCharactersState>,
        private activatedRoute: ActivatedRoute,
    ){}

    public ngOnInit(): void {
        this.store.dispatch(charactersActions.loadCharacterRequest({characterID: this.activatedRoute.snapshot.params.id}));
        this.characterDetail$ = this.store.pipe(select(charactersSelectors.getCharacterCurrentSelector));
    }
}