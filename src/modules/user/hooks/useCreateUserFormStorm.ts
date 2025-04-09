/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from "zustand";
import { NewUserDTO } from "../models/userDto.model";
import { validationUserCreateFormModel } from "../utils/userForm.validation";

interface CreateUserFormStore {
    formData: NewUserDTO;
    resetForm: () => void;
    updateField: (field: keyof NewUserDTO, value: any) => void;
    validationModel: any;
}

export const useCreateUserFormStore = create<CreateUserFormStore>((set) => ({
    formData: {
        role: '',
        email: '',
        name: '',
        lastName: '',
        secondLastName: '',
        ci: '',
        phoneNumber: '',
        branchOfficeId: 0,
    }, 
    resetForm: () => {
        set({
            formData: {
                role: '',
                email: '',
                name: '',
                lastName: '',
                secondLastName: '',
                ci: '',
                phoneNumber: '',
                branchOfficeId: 0,
            },
        })
    }, 
    updateField: (field, value) =>
        set((state) => ({
            formData: { ...state.formData, [field]: value },
        })),
    validationModel: validationUserCreateFormModel,
}));


