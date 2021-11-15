import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

import { CharacterDTO, Episode, Gender } from "../../../../interfaces/character.card.interface";
import AppCharactersState from "../../../../store/character-card/character-card.state";
import * as charactersActions from "../../../../store/character-card/character-card.actions";
import * as charactersSelectors from "../../../../store/character-card/character-card.selector";
import { CharacterCardService } from "../../../../services/character-card/character-card.service";

@Component({
    selector: 'app-character-cards',
    templateUrl: './character-card.component.html',
    styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {
    
    public loading$!: Observable<string | any>;
    public characters$!: Observable<CharacterDTO[]>;
    public error$!: Observable<Error>;

    public episodes: Episode[] = [];//array episode from server
    public episodeCharacter: Episode | any;//current episodeID
    public activeEpisodeId: number;//active episode ID
    public characterIds: number[];//pipe for episode cards
    public filterGender: Gender = Gender.All;//pipe for filter gender
    public gender: Gender[] = [Gender.Male, Gender.Female, Gender.All];//show all gender
    public searchName: string = '';//pipe for fiter name
    public filterName: string = '';//pipe for fiter Alphabet
    public valueName: string[] = ['Default', 'Alphabet(Aa-Zz)', 'Alphabet(Zz-Aa)']//value age for filter
    
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
            this.activeEpisodeId = episodes[0].id;
            this.characterIds = episodes[0].characters;
            this.episodes = episodes;
        });
    }


    public onEpisodeSelect(episodeId: number) {
        this.activeEpisodeId = episodeId;
        this.characterIds = this.episodes.find(episode => episode.id === episodeId).characters;
    }

    public onCurrentGender(currentSelectGender) {
        this.filterGender = currentSelectGender;
    }

    public onChangeCurrentName(currentSelectName) {
        this.filterName = currentSelectName;
    }

    public onCurrentName(currentInputName) {
        this.searchName = currentInputName;
    }

    public detailCharacter(id: number) {
        this.router.navigate(['/', id]);
    }
}