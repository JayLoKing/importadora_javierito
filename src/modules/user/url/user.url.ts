const moduleBaseUrl = "/users";

export const UserUrl = {
    getProfile: (id: number) => `${moduleBaseUrl}/getProfile/${id}`,
} as const;

