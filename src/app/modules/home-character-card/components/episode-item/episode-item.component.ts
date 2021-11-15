import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { Episode } from "src/app/interfaces/character.card.interface";

@Component({
    selector: 'app-episode-item',
    templateUrl: './episode-item.component.html',
    styleUrls: ['./episode-item.component.scss']
})
export class EpisodeItemComponent implements OnChanges {

    @Output() public episodeChange = new EventEmitter<number>();
    @Input() public episode: Episode;//name button
    @Input() public activeEpisodeId: number;

    public isActive: boolean;

    constructor(){ }


    public ngOnChanges() {
        this.isActive = this.episode.id === this.activeEpisodeId;
    }

    public episodeSelect(): void {
       this.episodeChange.emit(this.episode.id);
    }
} 