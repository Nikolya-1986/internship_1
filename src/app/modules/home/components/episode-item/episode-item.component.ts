import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Episode } from "src/app/interfaces/character-interface";

@Component({
    selector: 'app-episode-item',
    templateUrl: './episode-item.component.html',
    styleUrls: ['./episode-item.component.scss']
})
export class EpisodeItemComponent {

    @Output() public episodeChange = new EventEmitter<number>();
    @Input() public episode: Episode;//name button
    @Input('activeEpisodeId') set activeEpisodeId(value: number) {
        this.isActive = this.episode.id === value;
    };

    public isActive: boolean;

    constructor(){ }

    public episodeSelect(): void {
       this.episodeChange.emit(this.episode.id);
    }
} 