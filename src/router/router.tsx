import { Route, Routes } from "react-router-dom";
import AuthContainer from "../modules/auth/components/authContainer";
import Login from "../modules/auth/components/login";

export default function Routing() {
    return (
        <Routes>
            <Route index element={<AuthContainer children={<Login />} />} />
        </Routes>
    )
}