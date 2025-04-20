import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/store";


export default function PrivateRoute() {
    const { jwt } = useAuthStore();
    const redirectTo = '/login';

    if (!jwt) {
        return <Navigate to={redirectTo} replace />;
    }
    return <Outlet />;
}