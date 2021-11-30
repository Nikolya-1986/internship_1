import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, from, Observable } from "rxjs";
import { expand, map, switchMap, tap } from "rxjs/operators";

import { CharacterDTO, CharactersDTO, Episode, EpisodesDTO, LocationDTO, Location } from "../../interfaces/character-interface";

@Injectable({
    providedIn: 'root'
})
export class CharacterService  {

    private readonly BASE_URL =  "https://rickandmortyapi.com/api";

    constructor(
        private httpClient: HttpClient
    ){}

    private getCharactersPage(url: string): Observable<CharactersDTO> {
        return from(fetch(url)).pipe(
            switchMap((result) => result.json()),
        );
    }

    public getAllCharacters() {
        let characters = [];
        return this.getCharactersPage(`${this.BASE_URL}/character`).pipe(
            tap(response => {
                characters = [...response.results]
            }),
            expand((prev) => prev.info.next ? this.getCharactersPage(prev.info.next) : EMPTY),
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