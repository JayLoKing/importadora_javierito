import { Route, Routes } from "react-router-dom";
import AuthContainer from "../modules/auth/components/authContainer";

export default function Routing() {
    return (
        <Routes>
            <Route index element={<AuthContainer />} />
        </Routes>
    )
}