import { useAuthStore } from "../../../store/store";

export const useLayaout = () => {
    const { clearUser } = useAuthStore();

    const handleLogout = () => {
        clearUser();
    }

    return {
        handleLogout
    }
}