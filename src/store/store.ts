import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecoder } from "../utils/jwtDecoder"; 

type AuthStore = {
    jwt: string | null;
    role: string | null;
    userId: number | null;
    userName: string | null;
    setAuthUser: (token: string) => void;
    clearUser: () => void;
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            jwt: null,
            role: null,
            userId: null,
            userName: null,
            setAuthUser: (token: string) => {
                const decoded = jwtDecoder(token);
                set({ 
                    jwt: token,
                    role: decoded.role,
                    userId: decoded.id,
                    userName: decoded.sub
                });
                localStorage.setItem("jwt", token);
            },
            
            clearUser: () => {
                set({ 
                    jwt: null,
                    role: null,
                    userId: null,
                    userName: null
                });
                localStorage.removeItem("jwt");
            },
        }),
        {
            name: "auth-storage",
        }
    )
);
