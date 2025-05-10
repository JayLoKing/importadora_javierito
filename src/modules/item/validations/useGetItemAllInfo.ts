import {create} from "zustand";
import { GetAllItemInfo } from "../models/itemAllInfo.model";


interface GetItemAllInfoFormStore {
    formData: GetAllItemInfo;
    loadData: (data: GetAllItemInfo) => void;
    resetForm: () => void;
}

export const useGetItemAllInfoFormStore = create<GetItemAllInfoFormStore>((set) => ({
    formData: {
        itemId: 0,
        name: '',
        alias: '',
        description: '',
        model: '',
        price: 0,
        wholesalePrice: 0,
        barePrice: 0,
        purchasePrice: 0,
        brandName: '',
        subCategoryName: '',
        dateManufacture: '',
        itemAddressName: '',
        acronym: '',
        itemStatus: '',
        transmission: '',
        cylinderCapacity: '',
        traction: '',
        itemSeries: '',
        fuel: '',
        itemImages: [],
        totalStock: 0,
        branchStocks: [],
        registerDate: '',
    }, 
    loadData: (data) => set({formData: data}),
    resetForm: () => {
        set({
            formData: {
                itemId: 0,
                name: '',
                alias: '',
                description: '',
                model: '',
                price: 0,
                wholesalePrice: 0,
                barePrice: 0,
                purchasePrice: 0,
                brandName: '',
                subCategoryName: '',
                dateManufacture: '',
                itemAddressName: '',
                acronym: '',
                itemStatus: '',
                transmission: '',
                cylinderCapacity: '',
                traction: '',
                itemSeries: '',
                fuel: '',
                itemImages: [],
                totalStock: 0,
                branchStocks: [],
                registerDate: '',
            },
        })
    }, 
}));