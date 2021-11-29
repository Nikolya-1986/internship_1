export interface CharactersDTO {
    results: CharacterDTO<LocationDTO>[],
    info: {
        next: string
    }
};

export interface EpisodesDTO {
    results: EpisodeDTO[],
};

export interface CharacterDTO<T> {
    id: number,
    name: string,
    status: string,
    species: string,
    gender: Gender,
    image: string,
    created: string,
    origin: Origin,
    location: T,
    episode: Episode,
};

export enum Gender{
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
    All = 'All',
};

export interface Origin {
    name: string,
    url: string,
};

export interface LocationDTO {
    name: string,
    url: string,
};

export interface Location {
    id: number,
    name: string,
    type: string,
    dimension: string,
    created: string,
    url: string;
} 

export interface EpisodeDTO {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string,
    created: string,
};

export interface Episode {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: number[],
    url: string,
    created: string,
};