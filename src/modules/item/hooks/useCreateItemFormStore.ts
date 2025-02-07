import {create} from "zustand";
import { NewItemDTO } from "../models/item.model";
import { validationItemCreateFormModel } from "../utils/validationForm";

interface CreateItemFormStore {
    formData: NewItemDTO;
    resetForm: () => void;
    updateField: (field: keyof NewItemDTO, value: any) => void;
    validationModel: any;
}

export const useCreateItemFormStore = create<CreateItemFormStore>((set) => ({
    formData: {
        name: '',
        alias: '',
        description: '',
        model: '',
        price: 0,
        wholesalePrice: 0,
        barePrice: 0,
        brandID: 0,
        subCategoryID: 0,
        weight: 0,
        dateManufacture: '',
        itemAddressID: 0,
        userID: 0,
        pathItems: [],
        branchOfficeID: 0,
        quantity: 0,
        acronym: ''
    }, 
    resetForm: () => {
        set({
            formData: {
                name: '',
                alias: '',
                description: '',
                model: '',
                price: 0,
                wholesalePrice: 0,
                barePrice: 0,
                brandID: 0,
                subCategoryID: 0,
                weight: 0,
                dateManufacture: '',
                itemAddressID: 0,
                userID: 0,
                pathItems: [],
                branchOfficeID: 0,
                quantity: 0,
                acronym: ''
            },
        })
    }, 
    updateField: (field, value) =>
        set((state) => ({
            formData: { ...state.formData, [field]: value },
        })),
    validationModel: validationItemCreateFormModel,
}));


