import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";

import { CharacterService } from "src/app/services/character/character.service";
import AppCharactersState from "src/app/store/character/character.state";
import { CharacterDTO, Episode, Gender, LocationDTO } from "../../interfaces/character-interface";
import { ModalService } from "./components/services/modal.service";
import * as charactersActions from "../../store/character/character.actions";
import * as charactersSelectors from "../../store/character/character.selector";
import { switchMap, takeUntil } from "rxjs/operators";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    @ViewChild('modal', { read: ViewContainerRef, static: false })

    private viewContainerRef: ViewContainerRef;
    private destroy$ = new Subject();
    public loading$!: Observable<string | any>;
    public characters$!: Observable<CharacterDTO<LocationDTO>[]>;
    public error$!: Observable<Error>;
    public episodes: Episode[] = [];//array episode from server
    public episodeCharacter: Episode | any;//current episodeID
    public activeEpisodeId: number;//active episode ID
    public characterIds: number[];//pipe for episode cards
    public filterGender: Gender = Gender.All;//pipe for filter gender
    public gender: Gender[] = [Gender.Male, Gender.Female, Gender.All];//show all gender
    public searchName: string = '';//pipe for fiter name
    public filterName: string = '';//pipe for fiter Alphabet
    public sortAlfabet: string[] = ['Default', 'Alphabet(Aa-Zz)', 'Alphabet(Zz-Aa)'];//sort name alphabet for filter

    constructor(
        private store: Store<AppCharactersState>,
        private characterService: CharacterService,
        private activateRoute: ActivatedRoute,
        private router: Router,
        private modalService: ModalService
    ){}

    public ngOnInit(): void {
        this.store.dispatch(charactersActions.loadCharactersRequest());
        this.loading$ = this.store.pipe(select(charactersSelectors.getIsLoading));
        this.characters$ = this.store.pipe(select(charactersSelectors.getCharactersListSelector));
        this.error$ = this.store.pipe(select(charactersSelectors.getCharactersFailSelector));

        this.saveQueryparams();
    };

    private saveQueryparams(): void {
        const episodes$ = this.characterService.getEpisodes();
        const routerQueryParams$ = this.activateRoute.queryParamMap;

        episodes$.pipe(switchMap((episodes) => {
            this.episodes = episodes;
            const episodesId = Math.random();
            const allCharacters = episodes.reduce((acc, item) => {
                const uniqueCharacters = [...new Set(acc.concat(item.characters))];
                return uniqueCharacters;
            }, []);
            const episodeAll: Episode = {
                id: episodesId,
                episode: 'SAllEAll',
                characters: allCharacters,
                url: `'https://rickandmortyapi.com/api/episode/${episodesId}'`
            };
            this.episodes = [episodeAll, ...this.episodes]
            console.log(this.episodes);
            return routerQueryParams$;
        }))
        .pipe(takeUntil(this.destroy$))
        .subscribe(params => {
            const episodeId = Number(params.get('episode'));
            const genderSelected = params.get('selectedGender') as Gender || Gender.All;
            const nameSelected = params.get('selectedSortName') || 'Default';
            const nameSearch = params.get('selectedSearchName') || '';
            this.filterGender = genderSelected;
            this.filterName = nameSelected;
            this.searchName = nameSearch;

            if(episodeId) {
                this.activeEpisodeId = episodeId;
                this.characterIds = this.episodes.find(episode => episode.id === this.activeEpisodeId).characters;
            }
            else {
                this.activeEpisodeId = this.episodes[0].id;
            }
        })
    };

    public onCurrentGender(currentSelectGender): void {
        this.filterGender = currentSelectGender;
    };

    public onChangeCurrentName(currentSelectName): void {
        this.filterName = currentSelectName;
    };

    public onCurrentName(currentInputName): void {
        this.searchName = currentInputName;
    };

    public detailCharacter(id: number): void {
        this.router.navigate(['description', id]);
    };

    public onOpenedModal(character: CharacterDTO<LocationDTO>): void  {
        console.log("Delete id:", character.id);
        this.modalService.openModal(
            this.viewContainerRef, 
            'Are you sure you want to delete the current character?', 
            'Click confirm if you want otherwise close',
            character,
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe((item) => {
            this.store.dispatch(charactersActions.deleteCharacter({id: character.id}));
            console.log(item);
        });
    };

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}