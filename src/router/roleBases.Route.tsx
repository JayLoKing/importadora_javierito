import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/store";


interface RoleBasedRouteProps {
    allowedRoles: string[];
}

export default function RoleBasedRoute({ allowedRoles }: RoleBasedRouteProps) {
    const { jwt, role} = useAuthStore();
    

    if (!jwt) {
        return <Navigate to="/login" replace />;
    } 

    if (!role || !allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}