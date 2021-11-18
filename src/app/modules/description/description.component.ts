import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { forkJoin, Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import * as moment from "moment";

import { CharacterDTO, Location } from "../../interfaces/character-interface";
import *as charactersSelectors from "../../store/character-card/character-card.selector";
import * as charactersActions from "../../store/character-card/character-card.actions";
import AppCharactersState from "../../store/character-card/character-card.state";
import { CharacterService } from "../../services/character/character.service";


@Component({
    selector: 'app-description-character',
    templateUrl: './description.component.html',
    styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

    public characterDetail$!: Observable<CharacterDTO<Location> | null>;

    constructor(
        private store: Store<AppCharactersState>,
        private activatedRoute: ActivatedRoute,
        private characterService: CharacterService,
    ){}

    public ngOnInit(): void {
        this.store.dispatch(charactersActions.loadCharactersRequest());
        this.characterDetail$ = this.activatedRoute.params
            .pipe(
                map(params => Number(params.id)),
                switchMap((id) => this.store.pipe(select(charactersSelectors.getCharacterCurrentSelector(id)))),
                switchMap((character) => {
                    const location$ = this.characterService.getLocation(character.location.url);
                    const character$ = of(character);
                    return forkJoin([location$, character$]);
                }),
                map(([location, character]) => {
                    const characterWithLocaton: CharacterDTO<Location> = {
                        ...character,
                        location,
                        created: moment(character.created).format('YYYY-MM-DD, h:mm:ss a')
                    }
                    console.log("Character:", characterWithLocaton)
                    return characterWithLocaton;
                })
            );
    }
}