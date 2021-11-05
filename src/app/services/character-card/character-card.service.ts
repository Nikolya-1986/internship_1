import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { CharacterDTO, CharactersDTO } from "src/app/interfaces/character.card.interface";


@Injectable({
    providedIn: 'root'
})
export class CharacterCardService  {

    private readonly BASE_URL =  "https://rickandmortyapi.com/api/"

    constructor(
        private httpClient: HttpClient
    ){}

    getCharacters(): Observable<CharacterDTO[]>{
        return this.httpClient.get<CharactersDTO>(`${this.BASE_URL}/character`).pipe(
            map((data) => data.results.map((item) => ({...item,})))
        )
    }

    getCharactersId(id: number): Observable<CharacterDTO>{
        return this.httpClient.get<CharacterDTO>(`${this.BASE_URL}/character/${id}`)
    }
}