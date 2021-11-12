import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import { Episode } from "src/app/interfaces/character.card.interface";

@Component({
    selector: 'app-button-episode',
    templateUrl: './button-episode.component.html',
    styleUrls: ['./button-episode.component.scss']
})
export class ButtonEpisodeComponent implements OnChanges {

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