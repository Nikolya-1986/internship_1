import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CharacterDTO } from "../../../../interfaces/character.card.interface";

@Component({
    selector: 'app-character-item',
    templateUrl: './character-item.component.html',
    styleUrls: ['./character-item.component.scss']
})
export class CharacterItemComponent {

    @Input() public character!: CharacterDTO;
    @Output() public onDetailCharacter = new EventEmitter<number>();

    constructor() { }

    public detailCharacter(): void {
        this.onDetailCharacter.emit(this.character.id);
    }

}