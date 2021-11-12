import { Pipe, PipeTransform } from "@angular/core";
import { CharacterDTO, Episode } from "src/app/interfaces/character.card.interface";

@Pipe({
    name: 'filterCharacterEpisodePipe'
})
export class FilterCharacterCardEpisodePipe implements PipeTransform { 

    transform(characters: CharacterDTO[], characterIds: number[]): CharacterDTO[] {
        
        if(characterIds) {
            console.log(1);
                        
            const filteredCharacters = characters.filter(character =>     
                characterIds.includes(character.id)
            )
            return filteredCharacters;
        }
        return characters;
    }
}