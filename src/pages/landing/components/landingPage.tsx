import { Container, Content, Footer, Header, Nav, Navbar, Image, Divider, Dropdown, Button, IconButton } from "rsuite";
import "../styles/styles.css"
import LOGO from '../../../assets/LogoJavier.jpg';
import { FaEnvelope, FaFacebook, FaTiktok, FaUser, FaWhatsapp, FaWrench } from "react-icons/fa";

export default function LandingPage(){
    const handleWhatsapp = () => {
        window.open('https://api.whatsapp.com/send?phone=%2B59165517570&context=ARAOgxZu0AlTjE3D0HiYiy6wqAptPW-HWrQppSrFkc7mtYLCdmhNaqf7Bd_sihzOz9aK-A515Oj4k_VXhSUpEKx7QADXlr6nT7KVaWeYYshysnyGPnEyDtEujhMEbvDbb1vumPu-0hs5AUrn4xEL_PB_Ag&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwY2xjawH-ahZleHRuA2FlbQIxMAABHWNUxixkD1GxddjQcxR5Zid36ff7zroZOTgkZP9CliakbGdhq_R8CDvqnw_aem_J_W1zcNSJZiWnSz-wp_wQA');
    };
    return(
        <Container>
            <Header >
                <Navbar className="navbar" appearance="inverse" style={{ display: "flex", justifyContent: "space-between",  padding: "20px", alignItems: "center", borderBottom: '1px solid #e5e5e5', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <Image circle src={LOGO} style={{ width: "90px", height: "90px", objectFit: "cover" }} />
                        <Divider vertical style={{fontSize:"400%"}}/>
                        <label style={{fontSize:"28px", fontWeight:"bold"}}>IMPORTADORA JAVIERITO</label>
                    </div>
                    <Nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <IconButton icon={<FaWrench style={{marginRight:"5px"}}/>} style={{ fontSize:"20px", fontWeight:"bold", color:"white", background:"transparent"}}>Catálogo de Repuestos</IconButton>
                    <Dropdown className="dropdown" title="Categorías" trigger="click" placement="bottomStart" style={{fontSize:"20px"}} >
                        <Dropdown.Item>Puertas</Dropdown.Item>
                        <Dropdown.Item>Cajas</Dropdown.Item>
                        <Dropdown.Item>Motores</Dropdown.Item>
                        <Dropdown.Item>Inyectores</Dropdown.Item>
                        <Dropdown.Item>Aros</Dropdown.Item>
                        <Dropdown.Item>Sensores</Dropdown.Item>
                        <Dropdown.Item>Faroles</Dropdown.Item>
                        <Dropdown.Item>Frontales</Dropdown.Item>
                        <Dropdown.Item disabled>Y mucho mas..</Dropdown.Item>
                    </Dropdown>
                    <Dropdown title="Empresa" trigger="hover" placement="bottomStart" style={{fontSize:"20px"}} >
                        <Dropdown.Item>Sobre Nosotros</Dropdown.Item>
                        <Dropdown.Item>Contacto</Dropdown.Item>
                    </Dropdown>
                    </Nav>
                    <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                        <IconButton icon={<FaUser style={{marginRight:"5px"}}/>} style={{fontWeight:"bold", color:"white", background:"transparent"}} onClick={()=> window.open("/login", "_blank", "noopener,noreferrer")}>Iniciar Sesión</IconButton>
                        <Button appearance="primary" style={{ background:"transparent", color:"black", fontWeight:"bold", border:"1px solid #1a1a1a" }} onClick={()=> window.open("/register", "_blank", "noopener,noreferrer")}>Registrarse</Button>
                        <Button appearance="primary" style={{ backgroundColor: "#1a1a1a", color: "white", fontWeight: "bold" }} onClick={handleWhatsapp}>Contactar con Ventas</Button>
                    </div>
                </Navbar>
            </Header>
            <Content>
                {/* <Carousel style={{width:"100%", height:"100vh"}} shape="bar" autoplay>
                    <div>
                        <img src={a} alt="Sucursal 1" style={{ width: '100%', height: '100%' }} />
                        <div className="carousel-caption">
                            <h2>Sucursal 1</h2>
                            <p>Marca Modelo 1</p>
                            <Button appearance="primary">Cotizar con Vendedor</Button>
                        </div>
                    </div>
                    <div>
                        <img src={b} alt="Sucursal 2" style={{ width: '100%', height: '100%' }} />
                        <div className="carousel-caption">
                            <h2>Sucursal 2</h2>
                            <p>Marca Modelo 2</p>
                            <Button appearance="primary">Cotizar con Vendedor</Button>
                        </div>
                    </div>
                    <div>
                        <img src={c} alt="Sucursal 3" style={{ width: '100%', height: '100%' }} />
                        <div className="carousel-caption">
                            <h2>Sucursal 3</h2>
                            <p>Marca Modelo 3</p>
                            <Button appearance="primary">Cotizar con Vendedor</Button>
                        </div>
                    </div>
                </Carousel> */}
            </Content>
            <Footer style={{ padding: "20px", backgroundColor: "#f8f8f8", borderTop: "1px solid #e5e5e5" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <Divider></Divider>
                <div style={{ display: "flex", gap: "15px", alignItems:"center"}}>
                    <label style={{fontSize:"18px"}}>¿No encontraste lo que buscabas? <strong>Contáctanos:</strong></label>
                    <IconButton style={{fontSize:"30px"}} icon={<FaFacebook />} appearance="subtle" />
                    <IconButton style={{fontSize:"30px"}} icon={<FaWhatsapp />} appearance="subtle" />
                    <IconButton style={{fontSize:"30px"}} icon={<FaTiktok />} appearance="subtle" />
                    <IconButton style={{fontSize:"30px"}} icon={<FaEnvelope />} appearance="subtle" />
                </div>
                <div style={{ display: "flex", alignItems:"center"}}>
                    <label style={{fontSize:"20px", fontWeight:"bold",}}>IMPORTADORA JAVIERITO</label>
                    <Divider vertical style={{fontSize:"400%"}}/>
                    <Image circle src={LOGO} style={{ width: "70px", height: "70px", objectFit: "cover" }} />
                </div>
                <Divider></Divider>
            </div>
            <div style={{ textAlign: "center" }}>        
                <p>©2025 Importadora Javierito. Todos los derechos reservados.</p>
            </div>
            </Footer>
        </Container>
    )
    
}

