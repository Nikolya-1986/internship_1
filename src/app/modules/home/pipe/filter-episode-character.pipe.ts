import { Pipe, PipeTransform } from "@angular/core";
import { CharacterDTO, LocationDTO } from "../../../interfaces/character-interface";

@Pipe({
    name: 'filterEpisodeCharacter'
})
export class FilterEpisodeCharacterPipe implements PipeTransform { 

    transform(characters: CharacterDTO<LocationDTO>[], characterIds: number[]): CharacterDTO<LocationDTO>[] {
        
        if(characterIds) {
                        
            const filteredCharacters = characters.filter(character =>     
                characterIds.includes(character.id)
            )
            return filteredCharacters;
        }
        return characters;
    }
}