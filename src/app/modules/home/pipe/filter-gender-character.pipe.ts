import { Pipe, PipeTransform } from "@angular/core";
import { CharacterDTO, Gender, LocationDTO } from "../../../interfaces/character-interface";

@Pipe({
    name: 'filterGenderCharacter'
})
export class FilterGenderCharacterPipe implements PipeTransform {

    transform(characterDTO: CharacterDTO<LocationDTO>[], gender: Gender): CharacterDTO<LocationDTO>[] { 
        return gender === Gender.All ? characterDTO : characterDTO.filter(item => item.gender === gender);
    }
}