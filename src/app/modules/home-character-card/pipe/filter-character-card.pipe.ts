import { Pipe, PipeTransform } from "@angular/core";
import { CharacterDTO, Gender } from "../../../interfaces/character.card.interface";

@Pipe({
    name: 'filterCharacterCard'
})
export class FilterCharacterCardPipe implements PipeTransform {

    transform(characterDTO: CharacterDTO[], gender: Gender): CharacterDTO[] { 
        return gender === Gender.All ? characterDTO : characterDTO.filter(item => item.gender === gender);
    }
}