import { Genre } from "./genre"

export type TvShow = {
    id: number,
    name: string,
    photo: string,
    year: string,
    description: string,
    length: number,
    trailer: string,
    country: string,
    genres: Genre[]
}