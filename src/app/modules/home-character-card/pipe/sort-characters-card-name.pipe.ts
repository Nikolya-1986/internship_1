import { Pipe, PipeTransform } from "@angular/core";
import { CharacterDTO } from "../../../interfaces/character.card.interface";

@Pipe({
    name: 'sortCharacterCardName'
})
export class SortCharacterCardNamePipe implements PipeTransform {

    transform(characterDTO: CharacterDTO[], searchName: string = ''): CharacterDTO[] {
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