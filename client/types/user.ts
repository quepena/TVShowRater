export interface User {
    email: string;
    name: string;
    last_name: string;
    photo: string;
    password: string;
    isAdmin: boolean;
}

export interface IGenericResponse {
    status: string;
    message: string;
}