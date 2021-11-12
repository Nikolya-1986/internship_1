import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CharacterDTO } from "../../../../interfaces/character.card.interface";

@Component({
    selector: 'app-item-character-cards',
    templateUrl: './item-character-cards.component.html',
    styleUrls: ['./item-character-cards.component.scss']
})
export class ItemCharacterCardsComponent {

    @Input() public character!: CharacterDTO;
    @Output() public onDetailCharacter = new EventEmitter<number>();

    constructor() { }

    public detailCharacter(): void {
        this.onDetailCharacter.emit(this.character.id);
    }

}