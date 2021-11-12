export interface CharactersDTO {
    results: CharacterDTO[];
}

export interface EpisodesDTO {
    results: EpisodeDTO[]
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
    location: Location,
    episode: Episode
}

export enum Gender{
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
    All = 'All'
}

export interface Origin {
    name: string,
    url: string
}

export interface Location {
    name: string,
    url: string
}

export interface EpisodeDTO {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string,
    created: string
}

export interface Episode {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: number[],
    url: string,
    created: string
}



// export interface Character extends CharacterDTO {
//     id: number;
// }
