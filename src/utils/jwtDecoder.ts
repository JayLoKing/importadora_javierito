import { jwtDecode, JwtPayload } from "jwt-decode";

export function jwtDecoder(token: string): JwtPayload {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded;
    } catch (error) {
        throw error
    }
}