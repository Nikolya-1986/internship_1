import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CharacterDTO, Gender } from "../../../../interfaces/character.card.interface";

@Component({
    selector: 'app-list-character-cards',
    templateUrl: './list-character-cards.component.html',
    styleUrls: ['./list-character-cards.component.scss']
})
export class ListCharacterCartsComponent implements OnInit {

    @Output() public onDetailCharacter = new EventEmitter<number>();
    @Input() public loading : string | any;
    @Input() public characters!: CharacterDTO[];
    @Input() public error: string | any;
    @Input() public characterIds: number[];//filter for pipe

    public filterGerder: Gender = Gender.All;
    public gerder: Gender[] = [Gender.Male, Gender.Female, Gender.All];
    public searchName: string = '';

    constructor(){}

    ngOnInit() {
     
        
    }

    public detailCharacter(id: number) {
        this.onDetailCharacter.emit(id);
    }
}