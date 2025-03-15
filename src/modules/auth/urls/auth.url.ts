const moduleBaseUrl = "/auth";

export const AuthUrl = {
    authenticate: `${moduleBaseUrl}/authenticate`,
    resetPassword: `${moduleBaseUrl}/resetPassword`
} as const;

