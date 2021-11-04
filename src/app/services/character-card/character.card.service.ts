import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Character, CharactersDTO } from "src/app/interfaces/character.card.interface";


@Injectable({
    providedIn: 'root'
})
export class CharacterCardService  {

    private readonly BASE_URL =  "https://rickandmortyapi.com/api/"

    constructor(
        private httpClient: HttpClient
    ){}

    getCharacters(): Observable<Character[]>{
        return this.httpClient.get<CharactersDTO>(`${this.BASE_URL}/character`).pipe(
            map((data) => data.results.map((item, index) => ({
                ...item,
                id: index
            })))
        )
    }
}