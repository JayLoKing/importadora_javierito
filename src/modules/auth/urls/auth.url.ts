const moduleBaseUrl = "/auth";

export const AuthUrl = {
    authenticate: `${moduleBaseUrl}/authenticate`,
    resetPassword: `${moduleBaseUrl}/resetPassword`,
    getRecoveryCode: `${moduleBaseUrl}/getRecoveryCode`
} as const;

