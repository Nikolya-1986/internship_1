import { Component, EventEmitter, Input, Output, } from "@angular/core";
import { CharacterDTO, Gender, LocationDTO } from "../../../../interfaces/character-interface";

@Component({
    selector: 'app-character-list',
    templateUrl: './character-list.component.html',
    styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent {

    @Output() public onDetailCharacter = new EventEmitter<number>();
    @Output() public openedModal = new EventEmitter<CharacterDTO<LocationDTO>>();
    @Input() public characters!: CharacterDTO<LocationDTO>[];
    @Input() public error: string | any;
    @Input() public characterIds: number[];//for pipe Episode
    @Input() public filterGender: Gender;//for pipe filterGender
    @Input() public searchName: string;//for pipe searchName
    @Input() public filterName: string;//for pipe filterName

    public detailCharacter(id: number): void {
        this.onDetailCharacter.emit(id);
    };

    public onShowModal(character: CharacterDTO<LocationDTO>): void {
        this.openedModal.emit(character);
    };
}