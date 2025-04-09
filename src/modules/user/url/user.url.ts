const moduleBaseUrl = "/users";

export const UserUrl = {
    getAll: (limit: number, page: number) => `${moduleBaseUrl}/getAll?limit=${limit}&offset=${page}`,
    getProfile: (id: number) => `${moduleBaseUrl}/getProfile/${id}`,
    updateProfile: `${moduleBaseUrl}/updateProfile`,
    create: `${moduleBaseUrl}/createUser`,
    getByEmail: `${moduleBaseUrl}/getByEmail`,
} as const;

