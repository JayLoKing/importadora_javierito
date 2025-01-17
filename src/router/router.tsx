import { Route, Routes } from "react-router-dom";
//import AuthContainer from "../modules/auth/components/authContainer";
import Layout from "../pages/layout/layout";


export default function Routing() {
    return (
        <Routes>
            <Route index element={<Layout />} />
            
        </Routes>
    )
}