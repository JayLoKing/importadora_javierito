/* eslint-disable no-useless-catch */
import { jwtDecode, JwtPayload } from "jwt-decode";

export interface DecodedJwt extends JwtPayload {
    id: number;
    sub: string;
    role: string;
}

export function jwtDecoder(token: string): DecodedJwt {
    try {
        const decoded = jwtDecode<DecodedJwt>(token);
        return decoded;
    } catch (error) {
        throw error
    }
}