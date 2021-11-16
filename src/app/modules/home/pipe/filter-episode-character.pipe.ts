import { Pipe, PipeTransform } from "@angular/core";
import { CharacterDTO } from "../../../interfaces/character-interface";

@Pipe({
    name: 'filterEpisodeCharacter'
})
export class FilterEpisodeCharacterPipe implements PipeTransform { 

    transform(characters: CharacterDTO[], characterIds: number[]): CharacterDTO[] {
        
        if(characterIds) {
                        
            const filteredCharacters = characters.filter(character =>     
                characterIds.includes(character.id)
            )
            return filteredCharacters;
        }
        return characters;
    }
}