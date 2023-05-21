import { Role } from "./role";

export type Cast = {
    map(arg0: (el: Cast) => void): unknown;
    name: string;
    photo: string;
    biography: string;
    roles: Role[];
}