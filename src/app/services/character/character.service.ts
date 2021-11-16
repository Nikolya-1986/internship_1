import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { delay, map } from "rxjs/operators";

import { CharacterDTO, CharactersDTO, Episode, EpisodesDTO } from "src/app/interfaces/character-interface";


@Injectable({
    providedIn: 'root'
})
export class CharacterService  {

    private readonly BASE_URL =  "https://rickandmortyapi.com/api"

    constructor(
        private httpClient: HttpClient
    ){}

    getCharacters(): Observable<CharacterDTO[]>{
        return this.httpClient.get<CharactersDTO>(`${this.BASE_URL}/character`).pipe(
            map((data) => data.results),
        )
    }

    getCharactersId(id: number): Observable<CharacterDTO>{
        return this.httpClient.get<CharacterDTO>(`${this.BASE_URL}/character/${id}`)
    }

    getEpisodes(): Observable<Episode[]> {
        return this.httpClient.get<EpisodesDTO>(`${this.BASE_URL}/episode`).pipe(
            map((data) => {
                const results = data.results;
                const episodes = results.map(episode => ({ 
                    ...episode, 
                    characters: episode.characters.map(character => 
                        this.convertToId(character),
                    ),
                }));
                return episodes;
            }),
        )
    }

    private convertToId(character: string): number {
        const urlSplit = character.split('/');
        const lastIndex = urlSplit.length - 1;
        const id = Number(urlSplit[lastIndex]);
        return id;
    }
}