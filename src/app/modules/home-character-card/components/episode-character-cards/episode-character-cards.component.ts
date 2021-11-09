import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { CharacterDTO, Episode } from "../../../../interfaces/character.card.interface";
import { CharacterCardService } from "../../../../services/character-card/character-card.service";

@Component({
    selector: 'app-episode-character-cards',
    templateUrl: './episode-character-cards.component.html',
    styleUrls: ['./episode-character-cards.component.scss']
})
export class EpisodeCharacterCardsComponent implements OnInit{

    @Output() onEpisodeSelect = new EventEmitter<number>()
    public episodes: Episode[];
    public characterDTO: CharacterDTO
    public episodeID: any

    constructor(
        private characterCardService: CharacterCardService,
    ){}
    
    public ngOnInit(): void {
    
        this.characterCardService.getEpisodes().subscribe(result => {
            this.episodes = result;
            this.episodeID = result.map(episode => ({ 
                ...episode, 
                characters: episode.characters.map(character => 
                    this.convertToId(character)
                )
            }));
            console.log(this.episodeID);       
            
        }, error => {
            console.log(error);
        })
        // this.episode$ = this.characterCardService.getEpisodes();
    }

    private convertToId(character: string): number {
        const urlSplit = character.split('/');
        const lastIndex = urlSplit.length - 1;
        const id = Number(urlSplit[lastIndex]);
        return id;
    }


    public episodeSelect(item: number) {
        this.onEpisodeSelect.emit(item);
    }
}