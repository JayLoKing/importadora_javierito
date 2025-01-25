import { Route, Routes } from "react-router-dom";
import AuthContainer from "../modules/auth/components/authContainer";
import Login from "../modules/auth/components/login";
import Register from "../modules/auth/components/register";
import HomeContainer from "../modules/home/components/homeContainer";
import LandingPage from "../pages/landing/components/landingPage";
import BranchOffices from "../modules/branchOffice/components/branchOffices";
import Layout from "../pages/layout/layout";


export default function Routing() {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            {/* <Route index element={<Layout titleComponent={'INICIO'} children={<HomeContainer/>}/>}/> */}
            <Route path="/branchOffice" element={<Layout titleComponent={'SUCURSALES'} children={<BranchOffices />} />} />
            <Route path="/register" element={<AuthContainer children={<Register />} />} />
            <Route path="/login" element={<AuthContainer children={<Login />} />} />
        </Routes>
    )
}