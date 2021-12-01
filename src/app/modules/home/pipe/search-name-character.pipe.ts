import { Pipe, PipeTransform } from "@angular/core";

import { CharacterDTO, LocationDTO } from "../../../interfaces/character-interface";

@Pipe({
    name: 'sortCharacterName'
})
export class SearchCharacterNamePipe implements PipeTransform {

    transform(characterDTO: CharacterDTO<LocationDTO>[], searchName: string = ''): CharacterDTO<LocationDTO>[] {
        if(searchName.trim()) {
            const filteredCharacters = characterDTO.filter(character => {
                const lowerName = character.name.toLowerCase();
                const lowerSearchString = searchName.toLowerCase();
                const isNameIncludes = lowerName.includes(lowerSearchString);
                return isNameIncludes;
            });
            return filteredCharacters;
        } 
        return characterDTO;
    }
}