const moduleBaseUrl = "/branchOffice";

export const BranchOfficeUrl = {
    getAll: `${moduleBaseUrl}/getAll`,
    getById: (id: number) => `${moduleBaseUrl}/getBranchOfficeDetails/${id}`,
    create: `${moduleBaseUrl}/createBranchOffice`,
    update: `${moduleBaseUrl}/editBranchOffice`,
    delete: (id: number) => `${moduleBaseUrl}/removeBranchOffice/${id}`,
} as const;

