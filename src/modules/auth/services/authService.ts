/* eslint-disable no-useless-catch */
import { httpClient } from "../../../api/httpClient";
import { LoginDTO } from "../models/login.model";

export async function authenticateAsync(user: LoginDTO) {
    try {
        const res = await httpClient.post('/auth/authenticate', user);
        if (res.status === 200) {
            return res.data;
        }
        return null;
    } catch (error) {
        throw error;
    }
}