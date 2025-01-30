import { create } from "zustand";

//Store
type AuthStore = {
    jwt: string | null;
    setAuthUser: (resource: string) => void;
    clearUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({

    //Initial Values
    jwt: null,

    //Set values
    setAuthUser: (resource: string) => {
        set(() => ({
            jwt: resource
        }))
    },
    clearUser: () => {
        set(() => ({
            jwt: null
        }))
    }
}));