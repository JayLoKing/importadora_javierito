/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from "zustand";
import { NewBranchOfficeDTO } from "../models/branchOffice.model";
import { validationBranchOfficeCreateFormModel } from "../validations/createForm.validate";

interface CreateBranchOfficeFormStore {
    formData: NewBranchOfficeDTO;
    resetForm: () => void;
    updateField: (field: keyof NewBranchOfficeDTO, value: any) => void;
    validationModel: any;
}

export const useCreateBranchOfficeFormStore = create<CreateBranchOfficeFormStore>((set) => ({
    formData: {
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        pathImages: [],
        
    }, 
    resetForm: () => {
        set({
            formData: {
                name: '',
                address: '',
                latitude: '',
                longitude: '',
                pathImages: [],
            },
        })
    }, 
    updateField: (field, value) =>
        set((state) => ({
            formData: { ...state.formData, [field]: value },
        })),
    validationModel: validationBranchOfficeCreateFormModel,
}));


