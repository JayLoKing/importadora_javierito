import {create} from "zustand";
import { NewItemDTO } from "../models/item.model";
import { validationItemCreateFormModel } from "../utils/validationForm";

interface CreateItemFormStore {
    formData: NewItemDTO;
    resetForm: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateField: (field: keyof NewItemDTO, value: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        purchasePrice: 0,
        subCategoryID: 0,
        dateManufacture: '',
        itemAddressID: 0,
        pathItems: [],
        branchOfficeID: 0,
        quantity: 0,
        acronym: '',
        itemStatus: '',
        fuel: '',
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
                purchasePrice: 0,
                subCategoryID: 0,
                dateManufacture: '',
                itemAddressID: 0,
                pathItems: [],
                branchOfficeID: 0,
                quantity: 0,
                acronym: '',
                itemStatus: '',
                fuel: '',
            },
        })
    }, 
    updateField: (field, value) =>
        set((state) => ({
            formData: { ...state.formData, [field]: value },
        })),
    validationModel: validationItemCreateFormModel,
}));


