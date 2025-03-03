import {create} from "zustand";
import { UserProfile } from "../models/userProfile.model";

interface UpdateItemFormStore {
    formData: UserProfile;
    loadData: (data: UserProfile) => void;
    resetForm: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateField: (field: keyof UserProfile, value: any) => void;
}

export const useUpdateProfileFormStore = create<UpdateItemFormStore>((set) => ({
    formData: {
        id: 0,
        name: '',
        lastName: '',
        secondLastName: '',
        ci: '',
        phoneNumber: '',
        email: ''
    },
    loadData: (data) => set({formData: data}),
    resetForm: () => {
        set({
            formData: {
                id: 0,
                name: '',
                lastName: '',
                secondLastName: '',
                ci: '',
                phoneNumber: '',
                email: ''
            },
        })
    }, 
    updateField: (field, value) =>
        set((state) => ({
            formData: { ...state.formData, [field]: value },
        })),
}));


