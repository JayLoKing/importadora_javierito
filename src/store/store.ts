import { create } from "zustand";
import { AuthUser } from "../modules/auth/models/auth.model";

//Store
type AuthStore = {
    user: AuthUser | null;
    setAuthUser: (resource: AuthUser) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({

    //Initial Values
    user: null,

    //Set values
    setAuthUser: (resource: AuthUser) => {
        set(() => ({
            user: resource
        }))
    }
}));