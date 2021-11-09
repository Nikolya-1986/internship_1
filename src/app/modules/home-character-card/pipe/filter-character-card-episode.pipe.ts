import { Pipe, PipeTransform } from "@angular/core";
import { CharacterDTO, Episode } from "src/app/interfaces/character.card.interface";

@Pipe({
    name: 'filterCharacterCardEpisode'
})
export class FilterCharacterCardEpisodePipe implements PipeTransform{

    transform(characters: CharacterDTO[], episode: Episode): CharacterDTO[] {
        
        if(episode) {
            const filteredCharacters = characters.filter(character => {
                const episodeCharacterIds = episode.characters.map(characterString => Number(characterString));
                return episodeCharacterIds.includes(character.id);
            })
            
            return filteredCharacters;
            
        }
        return characters;
    
    }

}