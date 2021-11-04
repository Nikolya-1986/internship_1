export interface CharactersDTO {
    results: CharacterDTO[];
}

export interface CharacterDTO {
    name: string,
    status: string,
    species: string,
    gender: string,
    image: string,
    created: Date
}

export interface Character extends CharacterDTO {
    id: number;
}