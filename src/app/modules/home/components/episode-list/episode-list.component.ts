import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Episode } from "../../../../interfaces/character-interface";

@Component({
    selector: 'app-episode-list',
    templateUrl: './episode-list.component.html',
    styleUrls: ['./episode-list.component.scss']
})
export class EpisodeListComponent {

    @Output() public episodeSelect = new EventEmitter<number>();
    @Input() public episodes: Episode[];//array with name episode (button name)
    @Input() public activeEpisodeId: number;
    
    constructor(){}
    
    public onEpisodeChange(id: number): void {
        this.episodeSelect.emit(id);
    }
}

