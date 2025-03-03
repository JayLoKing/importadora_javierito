import {create} from "zustand";
import { ItemById } from "../models/item.model";
import { validationItemEditFormModel } from "../utils/validationForm";

interface UpdateItemFormStore {
    formData: ItemById;
    loadData: (data: ItemById) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateField: (field: keyof ItemById, value: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validationModel: any;
}

export const useUpdateItemFormStore = create<UpdateItemFormStore>((set) => ({
    formData: {
        itemID: 0,
        name: '',
        alias: '',
        description: '',
        model: '',
        price: 0,
        wholesalePrice: 0,
        barePrice: 0,
        brandID: 0,
        subCategoryID: 0,
        dateManufacture: '',
        itemAddressID: 0,
        userID: 0,
        itemImages: [],
        acronym: '',
        branchOfficeID: 0,
    }, 
    loadData: (data) => set({formData: data}),
    updateField: (field, value) =>
        set((state) => ({
            formData: { ...state.formData, [field]: value },
        })),
    validationModel: validationItemEditFormModel,
}));


