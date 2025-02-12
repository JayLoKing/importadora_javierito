import { Route, Routes } from "react-router-dom";
import AuthContainer from "../modules/auth/components/authContainer";
import Login from "../modules/auth/components/login";
import Register from "../modules/auth/components/register";
import LandingPage from "../pages/landing/components/landingPage";
import BranchOffices from "../modules/branchOffice/components/branchOffices";
import Layout from "../pages/layout/layout";
import ItemTable from "../modules/item/components/item.tsx";
import Home from "../modules/home/components/homeContainer.tsx";
import Report from "../modules/report/components/report.tsx";

export default function Routing() {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/home" element={<Layout titleComponent={'INICIO'} children={<Home/>}/>}/>
            <Route path="/branchOffice" element={<Layout titleComponent={'SUCURSALES'} children={<BranchOffices />} />} />
            <Route path="/report" element={<Layout titleComponent={'REPORTES'} children={<Report />} />} />
            <Route path="/register" element={<AuthContainer children={<Register />} />} />
            <Route path="/login" element={<AuthContainer children={<Login />} />} />
            <Route path="/items" element={<Layout titleComponent={'INVENTARIO'} children={<ItemTable />} />} />
        </Routes>
    )
}