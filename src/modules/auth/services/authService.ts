/* eslint-disable no-useless-catch */
import { httpClient } from "../../../api/httpClient";
import { loadAbort } from "../../../utils/loadAbort.utility";
import { UseApiCall } from "../../../utils/useApi.model";
import { LoginDTO } from "../models/login.model";
import { ResetPassword } from "../models/resetPassword.model";
import { AuthUrl } from "../urls/auth.url";


export const authenticateAsync = (user: LoginDTO): UseApiCall<{token: string}> => {
    const controller = loadAbort();
    return {
        call: httpClient.post<{token: string}>(AuthUrl.authenticate, user, { signal: controller.signal }),
        controller
    }
}

export const getCodeByEmailAsync = (email: string): UseApiCall<string> => {
    const controller = loadAbort();
    return {
        call: httpClient.post<string>(AuthUrl.getRecoveryCode,  email, {signal: controller.signal, headers: {'Content-Type': 'text/plain'}, transformRequest: [(data) => data]}),
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