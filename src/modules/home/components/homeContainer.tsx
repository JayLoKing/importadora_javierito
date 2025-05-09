import { Col, Grid, Panel, Row } from "rsuite";
import { FaShoppingCart, FaUsers, FaHome, FaShoppingBag } from "react-icons/fa";
import { BsGraphUpArrow, BsWrenchAdjustable } from "react-icons/bs";
import { FaShop } from "react-icons/fa6";
import { MdOutlineInventory } from "react-icons/md";
import "../styles/styles.css"
import { useNavigate } from "react-router-dom";


export default function HomeContainer(){
    const cardOptions = [
        { title: "Dashboard", icon: FaHome, text: "Visualiza estadísticas gráficos y métricas importantes del rendimiento del negocio.", color: "gradient1", open: "/dashboard" },
        { title: "Inventario", icon: BsGraphUpArrow, text: "Registra repuestos, visualiza el inventario de manera general, y recupera repuestos eliminados.", color: "gradient2", open: "/items"},
        { title: "Ventas", icon: BsWrenchAdjustable, text: "Registra, visualiza e imprime tus ventas.", color: "gradient3", open: "/sale"},
        { title: "Reservas", icon: FaShoppingCart, text: "Registra y gestiona las reservas.", color: "gradient1", open:"/reservation"},
        { title: "Sucursales", icon: FaShoppingBag, text: "Crea sucursales y visualiza el inventario de cada sucursal.", color: "gradient2", open:"/branchOffice" },
        { title: "Reportes", icon: FaShop, text: "Crea, visualiza y descarga reportes de inventario y ventas.", color: "gradient3", open:"/report" },
        { title: "Usuarios", icon: MdOutlineInventory, text: "Administra los usuarios del sistema.", color: "gradient1", open:"/register" },
        { title: "Cuenta", icon: FaUsers, text: "Modifica tu perfil de usuario.", color: "gradient2", open:"/profile" },
    ];
    
    
    const firstRowCards = cardOptions.slice(0, 4);
    const secondRowCards = cardOptions.slice(4);

    const navigate = useNavigate();
    
    return(
        <div style={{ padding:30 }} >
            <div className="welcome-section">
                <h4>¡BIENVENIDOS AL SISTEMA DE GESTIÓN DE IMPORTADORA JAVIERITO!</h4>
                <p style={{ textWrap:'balance' }}>Utiliza las tarjetas a continuación para acceder rápidamente a las diferentes secciones del sistema</p>
            </div>
            <Grid fluid>
                <Row gutter={20}>
                    {firstRowCards.map((item, index) => (
                        <Col key={index} xs={24} sm={12} md={12} lg={6} >
                            <Panel className={`card-panel ${item.color}`} onClick={() => navigate(item.open)} bordered shaded style={{ textAlign: "center", borderRadius: 10, padding: 20, height: 300,  marginBottom:40, cursor:'pointer' }}>
                                <h5>{item.title}</h5>
                                {/* <img src={item.icon} alt={item.title} style={{ width: "80px", height: "80px", objectFit: "contain", margin: "10px 0", filter: item.color === "gray" ? "none" : "brightness(0) invert(1)"}} /> */}
                                <div style={{ fontSize: "60px", margin: "15px 0" }}>
                                    <item.icon color="white" />
                                </div>
                                <p>{item.text}</p>
                            </Panel>
                        </Col>
                   ))} 
                </Row>
                <Row gutter={20}>
                    {secondRowCards.map((item, index) => (
                        <Col key={index} xs={24} sm={12} md={12} lg={6} >
                            <Panel className={`card-panel ${item.color}`} onClick={() => navigate(item.open)} bordered shaded style={{ textAlign: "center", borderRadius: 10, padding: 20, height: 300, cursor:'pointer' }}>
                                <h5>{item.title}</h5>
                                {/* <img src={item.icon} alt={item.title} style={{ width: "80px", height: "80px", objectFit: "contain", margin: "10px 0", filter: item.color === "gray" ? "none" : "brightness(0) invert(1)"}} /> */}
                                <div style={{ fontSize: "60px", margin: "15px 0" }}>
                                    <item.icon color="white" />
                                </div>
                                <p>{item.text}</p>
                            </Panel>
                        </Col>
                   ))} 
                </Row>
            </Grid>
        </div>
    )
}