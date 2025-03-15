import { httpClient } from "../../../api/httpClient";
import { loadAbort } from "../../../utils/loadAbort.utility";
import { UseApiCall } from "../../../utils/useApi.model";
import { UserUrl } from "../../user/url/user.url";
import { ResetPassword } from "../models/resetPassword.model";
import { AuthUrl } from "../urls/auth.url";

export const getCodeByEmailAsync = (email: string): UseApiCall<string> => {
    const controller = loadAbort();
    return {
        call: httpClient.post<string>(UserUrl.getByEmail, email, {signal: controller.signal, headers: {'Content-Type': 'text/plain'}, transformRequest: [(data) => data]}),
        controller
    }
}

export const resetPasswordAsync = (data: ResetPassword) : UseApiCall<null> => {
    const controller = loadAbort();
    return {
        call: httpClient.post<null>(AuthUrl.resetPassword, data, {signal: controller.signal}),
        controller
    }
}