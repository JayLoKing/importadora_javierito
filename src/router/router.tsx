import { Route, Routes } from "react-router-dom";
import AuthContainer from "../modules/auth/components/authContainer";
import Login from "../modules/auth/components/login";
import Register from "../modules/auth/components/register";
import Layout from "../pages/layout/layout";


export default function Routing() {
    return (
        <Routes>
            <Route index element={<Layout />} />
            <Route path="/register" element={<AuthContainer children={<Register />} />} />
        </Routes>
    )
}