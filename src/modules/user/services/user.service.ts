import { httpClient } from "../../../api/httpClient";
import { loadAbort } from "../../../utils/loadAbort.utility";
import { UseApiCall } from "../../../utils/useApi.model";
import { UserProfile } from "../models/userProfile.model";
import { UserUrl } from "../url/user.url";

export const getAccountById = (id: number): UseApiCall<UserProfile> => {
    const controller = loadAbort();
    return {
        call: httpClient.get<UserProfile>(UserUrl.getProfile(id),{signal: controller.signal}),
        controller
    }
}