import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landing/components/landingPage";
import AuthContainer from "../modules/auth/components/authContainer";
import Login from "../modules/auth/components/login";
import Layout from "../pages/layout/layout";
import Home from "../modules/home/components/homeContainer.tsx";
import ItemTable from "../modules/item/components/item.tsx";
import BranchOffices from "../modules/branchOffice/components/branchOffices";
import Report from "../modules/report/components/inventoryReport.tsx";
import Register from "../modules/user/components/userContainer";
import Profile from "../modules/user/components/profile.tsx";
import SaleForm from "../modules/sale/components/sale_form.tsx";
import SaleTable from "../modules/sale/components/saleTable.tsx";
import PrivateRoute from "./privateRoute.tsx";
import RoleBasedRoute from "./roleBases.Route.tsx";
import Unauthorized from "../pages/layout/components/unauthorized.tsx";

export default function Routing() {
    return (
        <Routes>
            {/* Rutas públicas */}
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<AuthContainer children={<Login />} />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Rutas protegidas (requieren autenticación) */}
            <Route element={<PrivateRoute />}>
                <Route path="/home" element={<Layout titleComponent={'INICIO'} children={<Home/>}/>}/>
                <Route path="/profile" element={<Layout titleComponent={'PERFIL'} children={<Profile />} />} />
                
                {/* Rutas para ADMIN */}
                <Route element={<RoleBasedRoute allowedRoles={['ROLE_Admin']} />}>
                    <Route path="/register" element={<Layout titleComponent={'USUARIOS'} children={<Register />} />} />
                    <Route path="/branchOffice" element={<Layout titleComponent={'SUCURSALES'} children={<BranchOffices />} />} />
                </Route>
                
                {/* Rutas para ADMIN y MANAGER */}
                <Route element={<RoleBasedRoute allowedRoles={['ROLE_Admin', 'manager']} />}>
                    <Route path="/items" element={<Layout titleComponent={'INVENTARIO'} children={<ItemTable />} />} />
                    <Route path="/report" element={<Layout titleComponent={'REPORTES DE INVENTARIO'} children={<Report />} />} />
                </Route>
                
                {/* Rutas para ADMIN, MANAGER y SALES */}
                <Route element={<RoleBasedRoute allowedRoles={['ROLE_Admin', 'manager', 'sales']} />}>
                    <Route path="/sale" element={<Layout titleComponent={'VENTAS'} children={<SaleForm />} />} />
                    <Route path="/saleTable" element={<Layout titleComponent={'HISTORIAL DE VENTAS'} children={<SaleTable />} />} />
                </Route>
            </Route>
        </Routes>
    )
}