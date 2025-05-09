import { httpClient } from "../../../api/httpClient";
import { loadAbort } from "../../../utils/loadAbort.utility";
import { UseApiCall } from "../../../utils/useApi.model";
import { GetUsers } from "../models/user.model";
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

export const getAllUsersAsync = (limit: number, page: number, status?: number | null, role?: string | null, officeId?: number | null, someName?: string | null) : UseApiCall<GetUsers> => {
    const controller = loadAbort();
    return {
        call: httpClient.post<GetUsers>(UserUrl.getAll(limit, page), {status: status, role: role, officeId: officeId, someName: someName}, {signal: controller.signal}),
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

export const editProfileAsync = (profile: UserProfile) : UseApiCall<UserProfile> => {
    const controller = loadAbort();
    return {
        call: httpClient.patch<UserProfile>(UserUrl.updateProfile, profile, {signal: controller.signal}),
        controller
    }
}