export interface User {
    id: number;
    email: string;
    name: string;
    last_name: string;
    photo: string;
    password: string;
    isAdmin: boolean;
    isOnboarded: boolean;
}

export interface IGenericResponse {
    status: string;
    message: string;
}