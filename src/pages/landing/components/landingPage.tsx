import { Container, Content, Footer, Header, Nav, Navbar, Image, Divider, Button, IconButton, Grid, Row, Col, Panel, } from "rsuite";
import "../styles/styles.css"
import LOGO from '../../../assets/LogoJavier.jpg';
import AdminIcon  from '@rsuite/icons/Admin';
import { FaFacebook, FaHome, FaTiktok, FaTools, FaWhatsapp, FaSearchDollar, FaShieldAlt, FaFileContract, FaHandHoldingUsd, } from "react-icons/fa";
import { FaCar, FaPhone, FaShop, FaUsers } from "react-icons/fa6";
import { useEffect, useState } from "react";
import NavItem from "rsuite/esm/Nav/NavItem";
import BranchOfficeSection from "./branchOffice";
import BrandSection from './brand';

export default function LandingPage(){

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        document.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const handleFacebook = () => {
    window.open('https://www.facebook.com/Importadora.Javierito');
    };
    const handleWhatsapp = () => {
        window.open('https://api.whatsapp.com/send?phone=%2B59165517570&context=ARAOgxZu0AlTjE3D0HiYiy6wqAptPW-HWrQppSrFkc7mtYLCdmhNaqf7Bd_sihzOz9aK-A515Oj4k_VXhSUpEKx7QADXlr6nT7KVaWeYYshysnyGPnEyDtEujhMEbvDbb1vumPu-0hs5AUrn4xEL_PB_Ag&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwY2xjawH-ahZleHRuA2FlbQIxMAABHWNUxixkD1GxddjQcxR5Zid36ff7zroZOTgkZP9CliakbGdhq_R8CDvqnw_aem_J_W1zcNSJZiWnSz-wp_wQA');
    };
    const handleTikTok = () => {
        window.open('https://www.tiktok.com/@importjavierito?is_from_webapp=1&sender_device=pc');
    };
    // const handleEmail = () => {
    //     window.open('https://www.tiktok.com/@importjavierito?is_from_webapp=1&sender_device=pc');
    // };
    
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return(
        <Container  style={{ maxWidth: '100%', padding: 0 }}>
            <Header style={{ position: 'fixed', width: '100%', zIndex: 1000, background: "transparent", transition:"all 0.3s ease" }}>
                <Navbar  style={{ background: scrolled ? 'rgba(0, 0, 0, 0.1)' : 'rgba(192, 180, 180, 0.53)', backdropFilter: "blur(10px)", height: "80px", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: '1px solid white'}}>
                    <div style={{ display:"flex", alignItems:"center" }}>
                        <Image circle src={LOGO} style={{ width: "4rem", height: "4rem", objectFit:"cover", padding:1, border:'1px solid #1a1a1a'}} />
                        <label style={{marginLeft:"10px", fontSize:"22px", fontWeight:"bold", color:"black", fontFamily:"calibri", textWrap:'balance'}}>IMPORTADORA JAVIERITO</label>
                    </div>
                    <Nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        <NavItem icon={<FaHome />} onClick={() => scrollToSection('inicio')} style={{ color: 'Black', fontWeight: 'bold' }}>Inicio</NavItem>
                        <NavItem icon={<FaCar />} onClick={() => scrollToSection('catalogo')} style={{ color: 'Black', fontWeight: 'bold' }}>Catálogo</NavItem>
                        <NavItem icon={<FaShop />} onClick={() => scrollToSection('sucursales')} style={{ color: 'Black', fontWeight: 'bold' }}>Sucursales</NavItem>
                        <NavItem icon={<FaTools />} onClick={() => scrollToSection('servicios')} style={{ color: 'Black', fontWeight: 'bold' }}>Servicios</NavItem>
                        <NavItem icon={<FaUsers />} onClick={() => scrollToSection('nosotros')} style={{ color: 'Black', fontWeight: 'bold' }}>Nosotros</NavItem>
                        <NavItem icon={<FaPhone />} onClick={() => scrollToSection('contacto')} style={{ color: 'Black', fontWeight: 'bold' }}>Contacto</NavItem>
                    </Nav>
                    <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                        <IconButton appearance="primary" icon={< AdminIcon style={{ fontWeight:"bold", background:"transparent" }}/>} style={{ fontSize:"14px", fontWeight:"bold", border:"1px solid white", color:"white" }} onClick={()=> window.open("/login", "_blank", "noopener,noreferrer")}>Iniciar Sesión</IconButton>
                        <Button style={{ fontSize:"14px", backgroundColor: "black", color: "white", fontWeight: "bold",  border: '1px solid white' }} onClick={handleWhatsapp}>Contactar con Ventas</Button>
                    </div>
                </Navbar>
            </Header>
            <Content style={{marginTop:"80px", scrollBehavior:"smooth" }}>
                <section id="inicio" style={{ 
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3')",
                    backgroundSize: "cover",
                    backgroundPosition: 'center',
                    color: 'white',
                    padding: '100px 20px',
                    textAlign: 'center'
                }}>
                    <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>IMPORTADORA JAVIERITO</h1>
                    <h4>Repuestos Americanos y Japoneses</h4>
                    <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto 30px' }}> Ofrecemos los mejores repuestos importados con garantía, entrega rápida y asesoramiento especializado. </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Button size="lg" appearance="primary" style={{ border: '2px solid white', color: 'white', fontWeight: 'bold' }} onClick={() => scrollToSection('catalogo')}>
                            Ver Catálogo
                        </Button>
                        <Button size="lg" style={{ backgroundColor: 'black', border: '2px solid white', color: 'white', fontWeight: 'bold' }} onClick={handleWhatsapp}>
                            Contactar Asesor
                        </Button>

                    </div>
                </section>
                <section id="catalogo" style={{ padding: '80px 20px', backgroundColor: '#f8f8f8' }}>
                    <Container>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '36px' }}>Categorías</h2>
                        <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 30px', fontSize: '18px' }}>
                            Ofrecemos una amplia gama de repuestos para vehículos americanos y japoneses, incluyendo motores, transmisiones, frenos y más.
                        </p>
                        <Grid fluid>
                            <Row gutter={30} >

                            </Row>
                        </Grid>
                        <Container>
                            <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '36px' }}>Marcas</h2>
                            <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 30px', fontSize: '18px' }}>
                                Explore las marcas de repuestos que ofrecemos.
                            </p>
                            <BrandSection />
                        </Container>
                    </Container>
                    <Container>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Catálogo de Productos</h2>
                        <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 30px', fontSize: '18px' }}>
                            Descubra nuestra selección de repuestos importados de alta calidad, con garantía y documentación completa.
                        </p>
                        <Grid fluid>
                            <Row gutter={30}>
                                <Col xs={24} md={12} lg={8}>
                                    <Panel shaded bordered bodyFill style={{ marginBottom: '30px' }}>
                                        <div style={{ padding: '20px', textAlign: 'center' }}>
                                            <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Motor Completo</h3>
                                            <p style={{ marginBottom: '15px' }}>Año: 2023</p>
                                            <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>$1,200</p>
                                            <Button 
                                                appearance="primary" 
                                                style={{ backgroundColor: '#f08b33' }}
                                                onClick={() => window.open('/catalogo/motor', '_self')}
                                            >
                                                Ver Detalles
                                            </Button>
                                        </div>
                                    </Panel>
                                </Col>
                                
                                <Col xs={24} md={12} lg={8}>
                                    <Panel shaded bordered bodyFill style={{ marginBottom: '30px' }}>
                                        <div style={{ padding: '20px', textAlign: 'center' }}>
                                            <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Sistema de Frenos</h3>
                                            <p style={{ marginBottom: '15px' }}>Año: 2023</p>
                                            <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>$450</p>
                                            <Button 
                                                appearance="primary" 
                                                style={{ backgroundColor: '#f08b33' }}
                                                onClick={() => window.open('/catalogo/frenos', '_self')}
                                            >
                                                Ver Detalles
                                            </Button>
                                        </div>
                                    </Panel>
                                </Col>
                                
                                <Col xs={24} md={12} lg={8}>
                                    <Panel shaded bordered bodyFill style={{ marginBottom: '30px' }}>
                                        <div style={{ padding: '20px', textAlign: 'center' }}>
                                            <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Suspensión</h3>
                                            <p style={{ marginBottom: '15px' }}>Año: 2022</p>
                                            <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>$680</p>
                                            <Button 
                                                appearance="primary" 
                                                style={{ backgroundColor: '#f08b33' }}
                                                onClick={() => window.open('/catalogo/suspension', '_self')}
                                            >
                                                Ver Detalles
                                            </Button>
                                        </div>
                                    </Panel>
                                </Col>
                                
                                <Col xs={24} md={12} lg={8}>
                                    <Panel shaded bordered bodyFill style={{ marginBottom: '30px' }}>
                                        <div style={{ padding: '20px', textAlign: 'center' }}>
                                            <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Transmisión</h3>
                                            <p style={{ marginBottom: '15px' }}>Año: 2023</p>
                                            <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>$1,500</p>
                                            <Button 
                                                appearance="primary" 
                                                style={{ backgroundColor: '#f08b33' }}
                                                onClick={() => window.open('/catalogo/transmision', '_self')}
                                            >
                                                Ver Detalles
                                            </Button>
                                        </div>
                                    </Panel>
                                </Col>
                                
                                <Col xs={24} md={12} lg={8}>
                                    <Panel shaded bordered bodyFill style={{ marginBottom: '30px' }}>
                                        <div style={{ padding: '20px', textAlign: 'center' }}>
                                            <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Sistema Eléctrico</h3>
                                            <p style={{ marginBottom: '15px' }}>Año: 2023</p>
                                            <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>$320</p>
                                            <Button 
                                                appearance="primary" 
                                                style={{ backgroundColor: '#f08b33' }}
                                                onClick={() => window.open('/catalogo/electrico', '_self')}
                                            >
                                                Ver Detalles
                                            </Button>
                                        </div>
                                    </Panel>
                                </Col>
                                
                                <Col xs={24} md={12} lg={8}>
                                    <Panel shaded bordered bodyFill style={{ marginBottom: '30px' }}>
                                        <div style={{ padding: '20px', textAlign: 'center' }}>
                                            <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Carrocería</h3>
                                            <p style={{ marginBottom: '15px' }}>Año: 2023</p>
                                            <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>$580</p>
                                            <Button 
                                                appearance="primary" 
                                                style={{ backgroundColor: '#f08b33' }}
                                                onClick={() => window.open('/catalogo/carroceria', '_self')}
                                            >
                                                Ver Detalles
                                            </Button>
                                        </div>
                                    </Panel>
                                </Col>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button appearance="primary" style={{ border: '2px solid white' }} >
                                        Ver Más Productos
                                    </Button>
                                </div>
                            </Row>
                        </Grid>
                    </Container>
                </section>
                <BranchOfficeSection />
                <section id="servicios" style={{ padding: '80px 20px', backgroundColor: 'white' }}>
                    <Container>
                        <h2 style={{ textAlign: 'center', marginBottom: '50px', fontSize: '36px' }}>Nuestros Servicios</h2>
                        <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px', fontSize: '18px' }}>
                            Ofrecemos un servicio integral para la importación de repuestos y vehículos, desde la selección hasta la entrega.
                        </p>
                        
                        <Grid fluid>
                            <Row gutter={30} style={{ justifyContent: 'space-around' }}>
                                <Col xs={24} md={12} lg={6}>
                                    <Panel shaded bordered style={{ height: '100%', textAlign: 'center',  }}>
                                        <div style={{ backgroundColor: '#f08b33', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems:"center", justifyContent:"center", margin: '0 auto 20px' }}>
                                            <FaSearchDollar style={{ fontSize: '30px', color: 'white' }} />
                                        </div>
                                        <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>Importación a Medida</h3>
                                        <p>Importamos el repuesto que necesita siguiendo sus especificaciones y presupuesto.</p>
                                    </Panel>
                                </Col>
                                
                                <Col xs={24} md={12} lg={6}>
                                    <Panel shaded bordered style={{ height: '100%', textAlign: 'center' }}>
                                        <div style={{ backgroundColor: '#f08b33', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems:"center", justifyContent:"center", margin: '0 auto 20px' }}>
                                            <FaShieldAlt style={{ fontSize: '30px', color: 'white' }} />
                                        </div>
                                        <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>Garantía</h3>
                                        <p>Todos nuestros repuestos cuentan con garantía para su tranquilidad.</p>
                                    </Panel>
                                </Col>
                                
                                <Col xs={24} md={12} lg={6}>
                                    <Panel shaded bordered style={{ height: '100%', textAlign: 'center' }}>
                                        <div style={{ backgroundColor: '#f08b33', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems:"center", justifyContent:"center", margin: '0 auto 20px' }}>
                                            <FaFileContract style={{ fontSize: '30px', color: 'white' }} />
                                        </div>
                                        <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>Trámites Aduaneros</h3>
                                        <p>Nos encargamos de todos los trámites de importación y documentación.</p>
                                    </Panel>
                                </Col>
                                
                                <Col xs={24} md={12} lg={6}>
                                    <Panel shaded bordered style={{ height: '100%', textAlign: 'center' }}>
                                        <div style={{ backgroundColor: '#f08b33', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems:"center", justifyContent:"center", margin: '0 auto 20px' }}>
                                            <FaHandHoldingUsd style={{ fontSize: '30px', color: 'white' }} />
                                        </div>
                                        <h3 style={{ fontSize: '22px', marginBottom: '15px' }}>Financiamiento</h3>
                                        <p>Opciones de financiamiento flexibles adaptadas a sus necesidades.</p>
                                    </Panel>
                                </Col>
                            </Row>
                        </Grid>
                    </Container>
                </section>
                <section id="nosotros" style={{ 
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('src/assets/prueba3.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    padding: '80px 20px',
                    textAlign: 'center'
                }}>
                    <Container>
                        <h2 style={{ fontSize: '36px', marginBottom: '30px' }}>Sobre Nosotros</h2>
                        <p style={{ maxWidth: '800px', margin: '0 auto 40px', fontSize: '18px' }}>
                            Con más de 15 años de experiencia en el mercado, somos líderes en la importación de repuestos de vehículos de alta calidad. Nuestro compromiso es ofrecer a nuestros clientes los mejores repuestos con garantía y respaldo.
                        </p>
                        
                        <Grid fluid>
                            <Row gutter={30}>
                                <Col xs={24} md={12} lg={6}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>✓</p>
                                        <p>Más de 10,000 repuestos importados con éxito</p>
                                    </div>
                                </Col>
                                
                                <Col xs={24} md={12} lg={6}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>✓</p>
                                        <p>Red de proveedores internacionales certificados</p>
                                    </div>
                                </Col>
                                
                                <Col xs={24} md={12} lg={6}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>✓</p>
                                        <p>Equipo de profesionales especializados</p>
                                    </div>
                                </Col>
                                
                                <Col xs={24} md={12} lg={6}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>✓</p>
                                        <p>Servicio post-venta personalizado</p>
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white', fontWeight: 'bold', marginTop: '20px', width:"200px"}} onClick={() => scrollToSection('contacto')}>
                                Conocer Más
                            </Button>
                        </div>
                    </Container>
                </section>
                <section id="contacto" style={{ padding: '80px 20px', background: "linear-gradient(to bottom right, #f97316 10%, #bd2828 90%)", color: 'white', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '36px', marginBottom: '30px' }}>¿Listo para encontrar su repuesto ideal?</h2>
                    <p style={{ maxWidth: '800px', margin: '0 auto 40px', fontSize: '18px' }}>
                        Contáctenos hoy mismo y un asesor especializado le guiará en todo el proceso.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                        <Button 
                            size="lg" 
                            style={{ 
                                backgroundColor: 'white', 
                                color: "#db7114", 
                                fontWeight: 'bold' 
                            }}
                            onClick={handleWhatsapp}
                        >
                            Solicitar Cotización
                        </Button>
                        <Button 
                            size="lg" 
                            style={{ 
                                backgroundColor: 'transparent', 
                                border: '2px solid white', 
                                color: 'white', 
                                fontWeight: 'bold' 
                            }}
                            onClick={() => scrollToSection('catalogo')}
                        >
                            Ver Catálogo
                        </Button>
                    </div>
                </section>
                {/* <section  style={{ padding: '80px 20px', backgroundColor: '#f8f8f8' }}>
                    
                </section> */}
            </Content>
            <Footer style={{ padding: "20px", backgroundColor: "#f5f5f5", borderTop: "1px solid #e5e5e5" }}>
            <Container>
                    <Grid fluid>
                        <Row gutter={30}>
                            <Col xs={24} md={8}>
                                <h3 style={{ fontSize: '22px', marginBottom: '20px' }}>IMPORTADORA JAVIERITO</h3>
                                <p>Importación de repuestos de vehículos de alta calidad con garantía y respaldo.</p>
                                <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                                    <IconButton 
                                        icon={<FaFacebook />} 
                                        appearance="subtle" 
                                        style={{ color: 'black' }} 
                                        onClick={handleFacebook} 
                                    />
                                    <IconButton 
                                        icon={<FaWhatsapp />} 
                                        appearance="subtle" 
                                        style={{ color: 'black' }} 
                                        onClick={handleWhatsapp} 
                                    />
                                    <IconButton 
                                        icon={<FaTiktok />} 
                                        appearance="subtle" 
                                        style={{ color: 'black' }} 
                                        onClick={handleTikTok} 
                                    />
                                </div>
                            </Col>
                            
                            <Col xs={24} md={8}>
                                <h3 style={{ fontSize: '22px', marginBottom: '20px' }}>Enlaces Rápidos</h3>
                                <Nav vertical>
                                    <NavItem onClick={() => scrollToSection('inicio')}>Inicio</NavItem>
                                    <NavItem onClick={() => scrollToSection('catalogo')}>Catálogo</NavItem>
                                    <NavItem onClick={() => scrollToSection('servicios')}>Servicios</NavItem>
                                    <NavItem onClick={() => scrollToSection('nosotros')}>Nosotros</NavItem>
                                    <NavItem onClick={() => scrollToSection('contacto')}>Contacto</NavItem>
                                </Nav>
                            </Col>
                            
                            <Col xs={24} md={8}>
                                <h3 style={{ fontSize: '22px', marginBottom: '20px' }}>Horario de Atención</h3>
                                <p style={{ marginBottom: '15px' }}><strong>Lunes - Viernes:</strong> 8:00 AM - 18:00 PM</p>
                                <p style={{ marginBottom: '15px' }}><strong>Sábado:</strong> 9:00 AM - 15:00 PM</p>
                                <p style={{ marginBottom: '15px' }}><strong>Domingo:</strong> Cerrado</p>
                            </Col>
                        </Row>
                        
                        <Divider style={{ margin: '30px 0', borderColor: '#444' }} />
                        
                        <div style={{ textAlign: 'center' }}>
                            <p>© 2025 Importadora Javierito. Todos los derechos reservados.</p>
                        </div>
                    </Grid>
                </Container>
            </Footer>
        </Container>
    );
};


