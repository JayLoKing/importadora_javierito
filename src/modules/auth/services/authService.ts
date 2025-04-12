/* eslint-disable no-useless-catch */
import { httpClient } from "../../../api/httpClient";
import { loadAbort } from "../../../utils/loadAbort.utility";
import { UseApiCall } from "../../../utils/useApi.model";
import { LoginDTO } from "../models/login.model";
import { AuthUrl } from "../urls/auth.url";

// export async function authenticateAsync(user: LoginDTO) {
//     try {
//         const res = await httpClient.post('/auth/authenticate', user);
//         if (res.status === 200) {
//             return res.data;
//         }

//         if (res.status === 401) {
//             return null;
//         }
//         return null;
//     } catch (error) {
//         throw error;
//     }
// }

export const authenticateAsync = (user: LoginDTO): UseApiCall<{token: string}> => {
    const controller = loadAbort();
    return {
        call: httpClient.post<{token: string}>(AuthUrl.authenticate, user, { signal: controller.signal }),
        controller
    }
}