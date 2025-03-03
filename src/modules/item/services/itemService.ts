import {httpClient} from "../../../api/httpClient.ts";
import { Brand, Item, ItemAddress, ItemById, NewItemDTO, SubCategory } from "../models/item.model.ts";
import { ItemUrl } from "../urls/item.url.ts";
import { loadAbort } from "../../../utils/loadAbort.utility.ts";
import { UseApiCall } from "../../../utils/useApi.model.ts";

export const getItemsAsync = (page: number, limit: number, query?: string) : UseApiCall<Item[]> => {
    const controller = loadAbort();
    return { 
        call: httpClient.get<Item[]>(ItemUrl.getAll(page, limit, query), {signal: controller.signal}), 
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
        call: httpClient.put<ItemById>(ItemUrl.update, item, {signal: controller.signal}),
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