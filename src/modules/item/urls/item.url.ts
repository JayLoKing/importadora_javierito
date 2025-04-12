const moduleBaseUrl = "/items";

export const ItemUrl = {
    getAll: (page: number, limit: number, query?:string) => `${moduleBaseUrl}/getAllItems?offset=${page}&limit=${limit}&param=${query}`,
    getById: `${moduleBaseUrl}/getItemByItemID`,
    create: `${moduleBaseUrl}/insertItem`,
    update: `${moduleBaseUrl}/UpdateItem`,
    delete: `${moduleBaseUrl}/removeItem`,

    getAllBrands: '/brands/getAllBrands',
    getAllAddresses: '/itemAddresses/getAllItemAddresses',
    getAllSubCategories: '/subCategories/getAllSubCategories'
} as const;
