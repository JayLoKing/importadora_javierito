export interface User {
    id: number;
    userName: string;
    fullname: string;
    ci: string;
    phone: string;
    role: string;
    email: string;
    status: number;
    office: string;
}

export interface GetUsers {
    first: User[];
    second: number;
}