import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CharacterDTO, Gender } from "../../../../interfaces/character.card.interface";

@Component({
    selector: 'app-list-character-cards',
    templateUrl: './list-character-cards.component.html',
    styleUrls: ['./list-character-cards.component.scss']
})
export class ListCharacterCartsComponent {

    @Input() public loading : string | any;
    @Input() public characters!: CharacterDTO[];
    @Input() public error: string | any;
    @Output() public onDetailCharacter = new EventEmitter<number>();

    public filterGerder: Gender = Gender.All;
    public gerder: Gender[] = [Gender.Male, Gender.Female, Gender.All];
    public searchName: string = '';

    constructor(){}

    public detailCharacter(id: number) {
        this.onDetailCharacter.emit(id);
    }
}