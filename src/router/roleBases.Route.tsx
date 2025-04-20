import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/store";
import { jwtDecoder } from "../utils/jwtDecoder";


interface RoleBasedRouteProps {
    allowedRoles: string[];
}

export default function RoleBasedRoute({ allowedRoles }: RoleBasedRouteProps) {
    const { jwt } = useAuthStore();
    

    if (!jwt) {
        return <Navigate to="/login" replace />;
    } else {
        const decode = jwtDecoder(jwt);
        const role = decode?.role;
       
        if (!role || !allowedRoles.includes(role)) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return <Outlet />;
}