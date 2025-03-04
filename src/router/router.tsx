import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landing/components/landingPage";
import AuthContainer from "../modules/auth/components/authContainer";
import Login from "../modules/auth/components/login";
import Layout from "../pages/layout/layout";
import Home from "../modules/home/components/homeContainer.tsx";
import ItemTable from "../modules/item/components/item.tsx";
import BranchOffices from "../modules/branchOffice/components/branchOffices";
import InventoryReport from "../modules/report/components/inventoryReport.tsx";
import IncomeReport from "../modules/report/components/incomeReport.tsx";
import TrashTable from "../modules/trash/components/trash.tsx";
import Register from "../modules/user/components/userContainer";
import Profile from "../modules/user/components/profile.tsx";

export default function Routing() {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<AuthContainer children={<Login />} />} />
            <Route path="/home" element={<Layout titleComponent={'INICIO'} children={<Home/>}/>}/>
            <Route path="/items" element={<Layout titleComponent={'INVENTARIO'} children={<ItemTable />} />} />
            <Route path="/branchOffice" element={<Layout titleComponent={'SUCURSALES'} children={<BranchOffices />} />} />
            <Route path="/inventoryreport" element={<Layout titleComponent={'REPORTES DE INVENTARIO'} children={<InventoryReport />} />} />
            <Route path="/incomereport" element={<Layout titleComponent={'REPORTES DE INGRESOS'} children={<IncomeReport />} />} />
            <Route path="/trash" element={<Layout titleComponent={'PAPELERA'} children={<TrashTable />} />} />
            <Route path="/register" element={<Layout titleComponent={'USUARIOS'} children={<Register />} />} />
            <Route path="/profile" element={<Layout titleComponent={'PERFIL'} children={<Profile />} />} />
        </Routes>
    )
}