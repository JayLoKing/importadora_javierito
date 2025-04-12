import {create} from "zustand";
import { validationStockEditFormModel } from "../utils/validationForm";
import { NewStockDTO } from "../models/stock.model";


interface UpdateStockFormStore {
    formData: NewStockDTO;
    resetForm: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateField: (field: keyof NewStockDTO, value: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validationModel: any;
}

export const useUpdateStockFormStore = create<UpdateStockFormStore>((set) => ({
    formData: {
        branchOfficeId: 0,
        quantity: 0,
        acronym: ''
    }, 
    resetForm: () => {
        set({
            formData: {
                branchOfficeId: 0,
                quantity: 0,
                acronym: ''
            },
        })
    }, 
    updateField: (field, value) =>
        set((state) => ({
            formData: { ...state.formData, [field]: value },
        })),
    validationModel: validationStockEditFormModel,
}));


