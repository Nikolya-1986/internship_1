import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { CharacterDTO, CharactersDTO, Episode, EpisodesDTO, LocationDTO, Location } from "../../interfaces/character-interface";


@Injectable({
    providedIn: 'root'
})
export class CharacterService  {

    private readonly BASE_URL =  "https://rickandmortyapi.com/api"

    constructor(
        private httpClient: HttpClient
    ){}

    public getCharacters(): Observable<CharacterDTO<LocationDTO>[]> {
        return this.httpClient.get<CharactersDTO>(`${this.BASE_URL}/character`).pipe(
            map((data) => data.results),
        )
    };

    public getCharactersId(id: number): Observable<CharacterDTO<LocationDTO>> {
        return this.httpClient.get<CharacterDTO<LocationDTO>>(`${this.BASE_URL}/character/${id}`)
    };

    public getLocation(url: string): Observable<Location> {
        return this.httpClient.get<Location>(url);
    };

    public getEpisodes(): Observable<Episode[]> {
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
    };

    private convertToId(character: string): number {
        const urlSplit = character.split('/');
        const lastIndex = urlSplit.length - 1;
        const id = Number(urlSplit[lastIndex]);
        return id;
    }
}