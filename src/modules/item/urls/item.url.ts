const moduleBaseUrl = "/items";

export const ItemUrl = {
    getAll: `${moduleBaseUrl}/getAllItems`,
    getAllInfo: `${moduleBaseUrl}/getItemAllInfo`,
    getById: `${moduleBaseUrl}/getItemByItemID`,
    create: `${moduleBaseUrl}/insertItem`,
    update: `${moduleBaseUrl}/UpdateItem`,
    delete: `${moduleBaseUrl}/removeItem`,

    getAllBrands: '/brands/getAllBrands',
    getAllAddresses: '/itemAddresses/getAllItemAddresses',
    getAllSubCategories: '/subCategories/getAllSubCategories',

    getAcronym: `${moduleBaseUrl}/itemAcronym`,
} as const;
