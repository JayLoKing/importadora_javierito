import { Route, Routes } from "react-router-dom";
import AuthContainer from "../modules/auth/components/authContainer";
import Login from "../modules/auth/components/login";
import Register from "../modules/auth/components/register";
import Layout from "../pages/layout/layout";
import HomeContainer from "../modules/home/components/homeContainer";
import LandingPage from "../pages/landing/components/landingPage";

export default function Routing() {
    return (
        <Routes>
            <Route index element={<LandingPage  />} />
            {/* <Route index element={<Layout titleComponent={'INICIO'} children={<HomeContainer/>}/>}/> */}
            <Route path="/register" element={<AuthContainer children={<Register />} />} />
            <Route path="/login" element={<AuthContainer children={<Login/>}/>} />
        </Routes>
    )
}