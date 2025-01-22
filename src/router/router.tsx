import { Route, Routes } from "react-router-dom";
import AuthContainer from "../modules/auth/components/authContainer";
import Login from "../modules/auth/components/login";
import Register from "../modules/auth/components/register";


export default function Routing() {
    return (
        <Routes>
            <Route index element={<AuthContainer children={<Login />} />} />
            <Route path="/register" element={<AuthContainer children={<Register />} />} />
        </Routes>
    )
}