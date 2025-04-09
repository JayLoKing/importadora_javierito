import {create} from "zustand";
import { UserProfile } from "../models/userProfile.model";

interface UpdateProfileFormStore {
    formData: UserProfile;
    loadData: (data: UserProfile) => void;
    resetForm: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateField: (field: keyof UserProfile, value: any) => void;
}

export const useUpdateProfileFormStore = create<UpdateProfileFormStore>((set) => ({
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


