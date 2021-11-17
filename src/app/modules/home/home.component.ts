import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { CharacterService } from "src/app/services/character/character.service";
import AppCharactersState from "src/app/store/character-card/character-card.state";
import { CharacterDTO, Episode, Gender } from "../../interfaces/character-interface";
import * as charactersActions from "../../store/character-card/character-card.actions";
import * as charactersSelectors from "../../store/character-card/character-card.selector";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
    public sortAlfabet: string[] = ['Default', 'Alphabet(Aa-Zz)', 'Alphabet(Zz-Aa)']//sort name alphabet for filter
    
    constructor(
        private store: Store<AppCharactersState>,
        private characterService: CharacterService,
        private router: Router,
    ){}

    public ngOnInit(): void {
        this.store.dispatch(charactersActions.loadCharactersRequest());
        this.loading$ = this.store.pipe(select(charactersSelectors.getCharactersLoadingSelector));
        this.characters$ = this.store.pipe(select(charactersSelectors.getCharactersListSelector));
        this.error$ = this.store.pipe(select(charactersSelectors.getCharactersFailSelector));
    
        this.characterService.getEpisodes().subscribe((episodes) => {
            this.activeEpisodeId = episodes[0].id;
            this.characterIds = episodes[0].characters;
            this.episodes = episodes;
        });
    }


    public onEpisodeSelect(episodeId: number): void {
        this.activeEpisodeId = episodeId;
        this.characterIds = this.episodes.find(episode => episode.id === episodeId).characters;
    }

    public onCurrentGender(currentSelectGender): void {
        this.filterGender = currentSelectGender;
    }

    public onChangeCurrentName(currentSelectName): void {
        this.filterName = currentSelectName;
    }

    public onCurrentName(currentInputName): void {
        this.searchName = currentInputName;
    }

    public detailCharacter(id: number): void {
        this.router.navigate(['description', id]);
    }
}