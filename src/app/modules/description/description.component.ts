import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { forkJoin, Observable, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import * as moment from "moment";

import { CharacterDTO, Location } from "../../interfaces/character-interface";
import * as charactersSelectors from "../../store/character/character.selector";
import * as charactersActions from "../../store/character/character.actions";
import AppCharactersState from "../../store/character/character.state";
import { CharacterService } from "../../services/character/character.service";


@Component({
    selector: 'app-description-character',
    templateUrl: './description.component.html',
    styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

    public characterDetail$!: Observable<CharacterDTO<Location> | null>;
    public isEdit: boolean;

    constructor(
        private store: Store<AppCharactersState>,
        private activatedRoute: ActivatedRoute,
        private characterService: CharacterService,
    ){}

    public ngOnInit(): void {

        this.characterDetail$ = this.activatedRoute.params
            .pipe(
                map(params => Number(params.id)),
                switchMap((id) => this.store.pipe(select(charactersSelectors.getCharacterCurrentSelector(id)))),
                switchMap((character) => {
                    console.log(character);
                    
                    const location$ = this.characterService.getLocation(character.location.url);
                    const character$ = of(character);
                    return forkJoin([location$, character$]);
                }),
                map(([location, character]) => {
                    const characterWithLocaton: CharacterDTO<Location> = {
                        ...character,
                        location,
                        // created: moment(character.created).format('YYYY-MM-DD, h:mm:ss a')
                    }
                    console.log("Character:", characterWithLocaton)
                    return characterWithLocaton;
                })
            );
    };

    public editCharacter(): void {
        this.isEdit = !this.isEdit;
    };

    public onChangeCharacter(character: CharacterDTO<Location>): void {
        console.log("Changed character:", character);
        this.store.dispatch(charactersActions.updateCharacter({ character }));
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
                        // created: moment(character.created).format('YYYY-MM-DD, h:mm:ss a')
                    }
                    console.log("Character:", characterWithLocaton)
                    return characterWithLocaton;
                })
            );
    };

    public onSavedCharacter(): void {
        this.isEdit = false;
    }
}