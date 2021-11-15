import { Pipe, PipeTransform } from "@angular/core";
import { CharacterDTO } from "src/app/interfaces/character.card.interface";

@Pipe({
    name: 'filterNameCharacter'
})
export class FilterNameCharacterPipe implements PipeTransform {

    transform(characterDTO: CharacterDTO[], value: Object): CharacterDTO[] {
        
        characterDTO.sort((a: any, b: any) => {

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
        return characterDTO;
    }
}