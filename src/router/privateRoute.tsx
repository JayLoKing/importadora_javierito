import { Navigate, Outlet } from "react-router-dom"

export default function PrivateRoute({ token }: { token: string }) {
    const redirectTo = '/login'

    if (token === null) {
        return <Navigate to={redirectTo} replace />
    }
    return <Outlet />
}