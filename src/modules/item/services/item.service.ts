/* eslint-disable @typescript-eslint/no-explicit-any */
import {httpClient} from "../../../api/httpClient.ts";
import { Brand, GetItems, ItemAcronym, ItemAddress, ItemById, NewItemDTO, SubCategory } from "../models/item.model.ts";
import { ItemUrl } from "../urls/item.url.ts";
import { loadAbort } from "../../../utils/loadAbort.utility.ts";
import { UseApiCall } from "../../../utils/useApi.model.ts";
import { GetAllItemInfo } from "../models/itemAllInfo.model.ts";

export const getItemsAsync = (offset: number, limit: number, query: string, subCategory?: string, brand?: string) : UseApiCall<GetItems> => {
    const controller = loadAbort();
    const params: Record<string, any> = {
        offset,
        limit,
    };

    if (query) params.query = query;
    if (subCategory) params.subCategory = subCategory;
    if (brand) params.brand = brand;

    return { 
        call: httpClient.get<GetItems>(ItemUrl.getAll, {signal: controller.signal, params: params}), 
        controller
    }
}

export const getItemAllInfo = (id: number) : UseApiCall<GetAllItemInfo> => {
    const controller = loadAbort();
    return {
        call: httpClient.post<GetAllItemInfo>(ItemUrl.getAllInfo, id, {signal: controller.signal}),
        controller
    }
}

export const getItemAdressesAsync = () : UseApiCall<ItemAddress[]> => {
    const controller = loadAbort();
    return {
        call: httpClient.get<ItemAddress[]>(ItemUrl.getAllAddresses, {signal: controller.signal}),
        controller
    }
}

export const getBrandsAsync = () : UseApiCall<Brand[]> => {
    const controller = loadAbort();
    return {
        call: httpClient.get<Brand[]>(ItemUrl.getAllBrands, {signal: controller.signal}),
        controller
    }
}

export const getSubCategoryAsync = () : UseApiCall<SubCategory[]>  => {
    const controller = loadAbort();
    return {
        call: httpClient.get<SubCategory[]>(ItemUrl.getAllSubCategories, {signal: controller.signal}),
        controller
    }
}

export const getItemAsyncById = (id: number): UseApiCall<ItemById> => {
    const controller = loadAbort();
    return {
        call: httpClient.post<ItemById>(ItemUrl.getById, {itemID: id} ,{signal: controller.signal}),
        controller
    }
}

export const getAcronymAsync = (id: number): UseApiCall<ItemAcronym> => {
    const controller = loadAbort();
    return {
        call: httpClient.post<ItemAcronym>(ItemUrl.getAcronym, {id: id}, {signal: controller.signal}),
        controller
    }
}



export const createItemAsync = (item: NewItemDTO): UseApiCall<NewItemDTO> => {
    const controller = loadAbort();
    return {
        call: httpClient.post<NewItemDTO>(ItemUrl.create, item, {signal: controller.signal}),
        controller
    }
}

export const updateItemAsync = (item: ItemById): UseApiCall<ItemById> => {
    const controller = loadAbort();
    return {
        call: httpClient.patch<ItemById>(ItemUrl.update, item, {signal: controller.signal}),
        controller
    }
}

export const deleteItemAsync = (id: number, userID: number): UseApiCall<null> => {
    const controller = loadAbort();
    return {
        call: httpClient.delete<null>(ItemUrl.delete, {data: {id: id, userID: userID}, signal: controller.signal}),
        controller
    }
}