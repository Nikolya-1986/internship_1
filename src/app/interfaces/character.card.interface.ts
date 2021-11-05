export interface CharactersDTO {
    results: CharacterDTO[];
}

export interface CharacterDTO {
    id: number;
    name: string,
    status: string,
    species: string,
    gender: Gender,
    image: string,
    created: Date,
    origin: Origin,
    location: Location
}

// export interface Character extends CharacterDTO {
//     id: number;
// }

export enum Gender{
    Male,
    Female,
    Other
}

export interface Origin {
    name: string,
    url: string
}

export interface Location {
    name: string,
    url: string
}