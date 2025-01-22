import { Route, Routes } from "react-router-dom";
// import AuthContainer from "../modules/auth/components/authContainer";
// import Login from "../modules/auth/components/login";
import Layout from "../pages/layout/layout";

export default function Routing() {
    return (
        <Routes>
            {/* <Route index element={<AuthContainer children={<Login />} />} /> */}
            <Route index element={<Layout />} />
        </Routes>
    )
}