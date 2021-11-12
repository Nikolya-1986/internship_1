import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Episode } from "../../../../interfaces/character.card.interface";

@Component({
    selector: 'app-episode-character-cards',
    templateUrl: './episode-character-cards.component.html',
    styleUrls: ['./episode-character-cards.component.scss']
})
export class EpisodeCharacterCardsComponent {

    @Output() episodeSelect = new EventEmitter<number>();
    @Input() public episodes: Episode[];//array with name episode (button name)
    @Input() public activeEpisodeId: number;
    
    constructor(){}
    
    public onEpisodeChange(id: number) {
        this.episodeSelect.emit(id);
    }
}

