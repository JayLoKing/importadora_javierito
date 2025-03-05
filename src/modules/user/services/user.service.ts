import { httpClient } from "../../../api/httpClient";
import { loadAbort } from "../../../utils/loadAbort.utility";
import { UseApiCall } from "../../../utils/useApi.model";
import { User } from "../models/user.model";
import { NewUserDTO } from "../models/userDto.model";
import { UserProfile } from "../models/userProfile.model";
import { UserUrl } from "../url/user.url";

export const getAccountByIdAsync = (id: number): UseApiCall<UserProfile> => {
    const controller = loadAbort();
    return {
        call: httpClient.get<UserProfile>(UserUrl.getProfile(id),{signal: controller.signal}),
        controller
    }
}

export const createUserAsync = (user: NewUserDTO): UseApiCall<NewUserDTO> => {
    const controller = loadAbort();
    return {
        call: httpClient.post<NewUserDTO>(UserUrl.create, user, {signal: controller.signal}),
        controller
    }
}

export const getAllUsersAsync = () : UseApiCall<User[]> => {
    const controller = loadAbort();
    return {
        call: httpClient.get<User[]>(UserUrl.getAll, {signal: controller.signal}),
        controller
    }
}

export const getUserByEmailAsync = (email: string) : UseApiCall<null> => {
    const controller = loadAbort();
    return {
        call: httpClient.post<null>(UserUrl.getByEmail, {email: email}, {signal: controller.signal}),
        controller
    }
}