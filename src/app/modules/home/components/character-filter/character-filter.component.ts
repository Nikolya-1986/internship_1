import { Component, Output, EventEmitter, Input } from "@angular/core";
import { Gender } from "../../../../interfaces/character-interface";

@Component({
    selector: 'app-character-filter',
    templateUrl: './character-filter.component.html',
    styleUrls: ['./character-filter.component.scss']
})
export class CharacterFilterComponent {

    @Output() public currentGender = new EventEmitter<string>();
    @Output() public currentName = new EventEmitter<string>();
    @Output() public changeCurrentName = new EventEmitter<string>();
    @Input() public gender: Gender[];
    @Input() public filterGender: Gender = Gender.All;
    @Input() public searchName: string;
    @Input() public filterName = 'Default';
    @Input() public sortAlfabet: string[];

    constructor(){}

    changeGender() {
        this.currentGender.emit(this.filterGender)
    }

    changeName() {
        this.changeCurrentName.emit(this.filterName)
    }

    searchCurrentName() {
        this.currentName.emit(this.searchName)
    }
}