/* eslint-disable no-useless-catch */
import { httpClient } from "../../../api/httpClient";
import { RegisterUserDTO } from "../models/register.user.model";

export async function registerClientAsync(client: RegisterUserDTO) {
    try{
        const response = await httpClient.post('/users/createClientUser', client);
        
        if(response.status === 200){
            return response.data;
        }
        return null;
    } catch (error) {
        throw error;
    }
}

export async function registerEmployeeAsync(employee: RegisterUserDTO) {
    try{
        const response = await httpClient.post('/users/createEmployeeUser', employee);
        if(response.status === 200){
            return response.data;
        }
        return null;
    } catch (error) {
        throw error;
    }
}