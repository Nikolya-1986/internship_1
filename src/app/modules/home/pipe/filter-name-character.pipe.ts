import { Pipe, PipeTransform } from "@angular/core";
import { CharacterDTO } from "src/app/interfaces/character-interface";

@Pipe({
    name: 'filterNameCharacter'
})
export class FilterNameCharacterPipe implements PipeTransform {

    transform(characterDTO: CharacterDTO[], value: Object): CharacterDTO[] {
        
        const characterSort = [...characterDTO];
        characterSort.sort((a: CharacterDTO, b: CharacterDTO) => {

            if(value === 'Default') {
                return a.id - b.id;
            }

            if(value === 'Alphabet(Aa-Zz)') {
                return a.name.localeCompare(b.name);
            }

            if(value === 'Alphabet(Zz-Aa)') {
                return b.name.localeCompare(a.name);
            }
            return null;
        })
        return characterSort;
    }
}