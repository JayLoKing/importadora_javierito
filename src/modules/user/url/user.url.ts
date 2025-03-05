const moduleBaseUrl = "/users";

export const UserUrl = {
    getAll: `${moduleBaseUrl}/getAll`,
    getProfile: (id: number) => `${moduleBaseUrl}/getProfile/${id}`,
    create: `${moduleBaseUrl}/createUser`,
    getByEmail: `${moduleBaseUrl}/getByEmail`,
} as const;

