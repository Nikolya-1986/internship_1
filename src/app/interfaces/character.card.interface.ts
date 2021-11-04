export interface CharactersDTO {
    results: CharacterDTO[];
}

export interface CharacterDTO {
    name: string,
    status: string,
    species: string,
    gender: Gender,
    image: string,
    created: Date,
    origin: Origin[],
    location: Location[]
}

export interface Character extends CharacterDTO {
    id: number;
}

export enum Gender{
    Male,
    Female,
    Other
}

export interface Origin {
    nameOrigin: string,
    urlOrigin: string
}

export interface Location {
    nameLocation: string,
    urlLocation: string
}