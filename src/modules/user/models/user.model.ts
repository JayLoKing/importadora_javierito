export interface User {
    id: number;
    userName: string;
    password: string;
    role: string;
    email: string;
    status: number;
    registerDate: string;
    lastUpdate?: string;
}