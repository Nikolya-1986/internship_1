import { Component, EventEmitter, Input, OnInit, Output, } from "@angular/core";
import { CharacterDTO, Gender } from "../../../../interfaces/character-interface";

@Component({
    selector: 'app-character-list',
    templateUrl: './character-list.component.html',
    styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

    @Output() public onDetailCharacter = new EventEmitter<number>();
    @Input() public characters!: CharacterDTO[];
    @Input() public error: string | any;
    @Input() public characterIds: number[];//for pipe Episode
    @Input() public filterGender: Gender;//for pipe filterGender
    @Input() public searchName: string;//for pipe searchName
    @Input() public filterName: string;//for pipe filterName

    constructor(){}

    ngOnInit() {
        
    }

    public detailCharacter(id: number) {
        this.onDetailCharacter.emit(id);
    }
}