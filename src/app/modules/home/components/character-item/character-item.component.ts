import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CharacterDTO, LocationDTO } from "../../../../interfaces/character-interface";

@Component({
    selector: 'app-character-item',
    templateUrl: './character-item.component.html',
    styleUrls: ['./character-item.component.scss']
})
export class CharacterItemComponent {

    @Input() public character!: CharacterDTO<LocationDTO>;
    @Output() public onDetailCharacter = new EventEmitter<number>();

    constructor() { }

    public detailCharacter(): void {
        this.onDetailCharacter.emit(this.character.id);
    }

}