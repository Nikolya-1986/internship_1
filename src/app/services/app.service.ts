import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character, CharactersDTO } from '../model/app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl =  "https://rickandmortyapi.com/api/"

  constructor(
    private httpClient: HttpClient
  ) { }
  // this.baseUrl.concat('character')
  getCharacters(): Observable<Character[]>{
    return this.httpClient.get<CharactersDTO>(`${this.baseUrl}/character`)
      .pipe(map((data) => data.results.map((item, index) => ({...item, id: index}))));
  }
}
