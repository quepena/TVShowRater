import { TvShow } from "./tvShow";
import { User } from "./user";

export type List = {
    id: number;
    name: string;
    user: User;
    tvShows: TvShow[];
}