import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

import { CharacterDTO, Episode } from "../../../../interfaces/character.card.interface";
import AppCharactersState from "../../../../store/character-card/character-card.state";
import * as charactersActions from "../../../../store/character-card/character-card.actions";
import * as charactersSelectors from "../../../../store/character-card/character-card.selector";
import { CharacterCardService } from "../../../../services/character-card/character-card.service";

@Component({
    selector: 'app-page-character-card',
    templateUrl: './page-character-card.component.html',
    styleUrls: ['./page-character-card.component.scss']
})
export class PageharacterCardComponent implements OnInit {

    public loading$!: Observable<string | any>;
    public characters$!: Observable<CharacterDTO[]>;
    public error$!: Observable<Error>;
    public episodes: Episode[] = [];//array episode from server
    public episodeCharacter: Episode | any;//current episodeID
    public activeEpisodeId: number;//active episode ID
    public characterIds: number[];//pipe for episode cards

    
    constructor(
        private store: Store<AppCharactersState>,
        private characterCardService: CharacterCardService,
        private router: Router,
    ){}

    public ngOnInit(): void {
        this.store.dispatch(charactersActions.loadCharactersRequest());
        this.loading$ = this.store.pipe(select(charactersSelectors.getCharactersLoadingSelector));
        this.characters$ = this.store.pipe(select(charactersSelectors.getCharactersListSelector));
        this.error$ = this.store.pipe(select(charactersSelectors.getCharactersFailSelector));
    
        this.characterCardService.getEpisodes().subscribe((episodes) => {
            this.activeEpisodeId = episodes[0].id
            this.characterIds = episodes[0].characters;
            this.episodes = episodes;
        });
    }


    public onEpisodeSelect(episodeId: number) {
        this.activeEpisodeId = episodeId;
        this.characterIds = this.episodes.find(episode => episode.id === episodeId).characters;
    }

    public detailCharacter(id: number) {
        this.router.navigate(['/', id]);
    }
}