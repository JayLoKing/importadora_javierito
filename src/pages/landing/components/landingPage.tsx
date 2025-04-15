import { Container, Content, Footer, Header, Nav, Navbar, Image, Divider, Dropdown, Button, IconButton, Row, Col, Panel, Tag } from "rsuite";
import "../styles/styles.css"
import LOGO from '../../../assets/LogoJavier.jpg';
import VIDEO from '../../../assets/VideoJavier.mp4';
import AdminIcon  from '@rsuite/icons/Admin';
import { FaEnvelope, FaFacebook, FaTiktok, FaWhatsapp, FaWrench } from "react-icons/fa";

export default function LandingPage(){
    const handleFacebook = () => {
    window.open('https://www.facebook.com/Importadora.Javierito');
  };
  const handleWhatsapp = () => {
    window.open('https://api.whatsapp.com/send?phone=%2B59165517570&context=ARAOgxZu0AlTjE3D0HiYiy6wqAptPW-HWrQppSrFkc7mtYLCdmhNaqf7Bd_sihzOz9aK-A515Oj4k_VXhSUpEKx7QADXlr6nT7KVaWeYYshysnyGPnEyDtEujhMEbvDbb1vumPu-0hs5AUrn4xEL_PB_Ag&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwY2xjawH-ahZleHRuA2FlbQIxMAABHWNUxixkD1GxddjQcxR5Zid36ff7zroZOTgkZP9CliakbGdhq_R8CDvqnw_aem_J_W1zcNSJZiWnSz-wp_wQA');
  };
  const handleTikTok = () => {
    window.open('https://www.tiktok.com/@importjavierito?is_from_webapp=1&sender_device=pc');
  };
  const handleEmail = () => {
    window.open('https://www.tiktok.com/@importjavierito?is_from_webapp=1&sender_device=pc');
  };

  const products = [
    {
        id: 1,
        name: "Motorcycle Helmet",
        category: "EQUIPMENT",
        price: 320.00,
        oldPrice: 300.00,
        image: LOGO,
        special: false,
        isNew: false
    },
    {
        id: 2,
        name: "Motosport Exhaust",
        category: "MOTORCYCLE",
        price: 400.00,
        oldPrice: null,
        image: LOGO,
        special: false,
        isNew: false
    },
    {
        id: 3,
        name: "UTV Sprocket",
        category: "SPROCKETS",
        price: 80.00,
        oldPrice: null,
        image: LOGO,
        special: false,
        isNew: false
    },
    {
        id: 4,
        name: "Bright Lights",
        category: "LIGHTS",
        price: 890.00,
        oldPrice: null,
        image: LOGO,
        special: false,
        isNew: true
    },
    {
        id: 5,
        name: "Pressure Meter",
        category: "GAUGES",
        price: 40.00,
        oldPrice: null,
        image: LOGO,
        special: false,
        isNew: false
    },
    {
        id: 6,
        name: "Buggy Sprocket",
        category: "SPROCKETS",
        price: 80.00,
        oldPrice: null,
        image: LOGO,
        special: true,
        isNew: false
    },
    {
        id: 7,
        name: "Sport Shoes",
        category: "EQUIPMENT",
        price: 210.00,
        oldPrice: null,
        image: LOGO,
        special: false,
        isNew: false
    },
    {
        id: 8,
        name: "Sport Filter",
        category: "FILTRES",
        price: 290.00,
        oldPrice: 190.00,
        image: LOGO,
        special: false,
        isNew: false
    }
];

// Array de artículos del blog
const blogPosts = [
    {
        id: 1,
        title: "How A Motorcycle Engine Works",
        category: "WORKSHOP",
        date: "February 10, 2019",
        image: LOGO,
        description: "Progresivamente maintain extensive infomediaries via extensible niches. Dramatically disseminate standardized metrics after resource-leveling processes."
    },
    {
        id: 2,
        title: "Sportcar Showcase",
        category: "SPORT",
        date: "February 10, 2019",
        image: LOGO,
        description: "Credibly reintermediate backend ideas for cross-platform models. Continually reintermediate integrated processes through technically sound intellectual capital. Holistically foster."
    },
    {
        id: 3,
        title: "Air Filters for Tuners",
        category: "TUNING",
        date: "February 10, 2019",
        image: LOGO,
        description: "Phosfluorescently engage worldwide methodologies with web-enabled technology. Interactively coordinate proactive e-commerce via process-centric \"outside the box\" thinking."
    },
    {
        id: 4,
        title: "Top 10 Sportcar Dashboards",
        category: "SPORT",
        date: "February 10, 2019",
        image: LOGO,
        description: "Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain."
    }
];

    return(
        <Container>
            <Header >
                <Navbar appearance="inverse" style={{ position:"fixed", top:0, width:"100%", zIndex:1000, display: "flex", justifyContent: "space-between", height: "80px", padding: "10px", alignItems: "center", borderBottom: '1px solid #e5e5e5', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
                    <div style={{ display:"flex", alignItems:"center" }}>
                        <Image circle src={LOGO} style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                        <Divider vertical style={{fontSize:"300%"}}/>
                        <label style={{fontSize:"24px", fontWeight:"bold" }}>IMPORTADORA JAVIERITO</label>
                    </div>
                    <Nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <IconButton icon={<FaWrench style={{marginRight:"5px"}}/>} style={{ fontSize:"19px", fontWeight:"bold", color:"white", background:"transparent"}}>Catálogo de Repuestos</IconButton>
                    <Dropdown trigger="hover" title="Categorías" placement="bottomStart" style={{ fontSize:"19px",}} >
                        <div style={{ 
                            display: "grid", 
                            gridTemplateColumns: "repeat(4, 1fr)", 
                            gap: "20px",
                            padding: "20px",
                            width: "800px",
                            backgroundColor: "white"
                        }}>
                            <div>
                            <h4 style={{ borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "15px", color:"black" }}>Categoría</h4>
                            <Dropdown.Item>Top</Dropdown.Item>
                            <Dropdown.Item>Bottom</Dropdown.Item>
                            <Dropdown.Item>Middle</Dropdown.Item>
                            <Dropdown.Item>Under</Dropdown.Item>
                            <Dropdown.Item>Under Framed</Dropdown.Item>
                            <Dropdown.Item>Bottom Framed</Dropdown.Item>
                            </div>
                            <div>
                            <h4 style={{ borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "15px", color:"black" }}>Categoría</h4>
                            <Dropdown.Item>Top</Dropdown.Item>
                            <Dropdown.Item>Bottom</Dropdown.Item>
                            <Dropdown.Item>Middle</Dropdown.Item>
                            <Dropdown.Item>Under</Dropdown.Item>
                            <Dropdown.Item>Under Framed</Dropdown.Item>
                            <Dropdown.Item>Bottom Framed</Dropdown.Item>
                            </div>
                            <div>
                            <h4 style={{ borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "15px", color:"black" }}>Categoría</h4>
                            <Dropdown.Item>Top</Dropdown.Item>
                            <Dropdown.Item>Bottom</Dropdown.Item>
                            <Dropdown.Item>Middle</Dropdown.Item>
                            <Dropdown.Item>Under</Dropdown.Item>
                            <Dropdown.Item>Under Framed</Dropdown.Item>
                            <Dropdown.Item>Bottom Framed</Dropdown.Item>
                            </div>
                            <div>
                            <h4 style={{ borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "15px", color:"black" }}>Categoría</h4>
                            <Dropdown.Item>Top</Dropdown.Item>
                            <Dropdown.Item>Bottom</Dropdown.Item>
                            <Dropdown.Item>Middle</Dropdown.Item>
                            <Dropdown.Item>Bottom Border</Dropdown.Item>
                            <Dropdown.Item>Bottom Framed</Dropdown.Item>
                            <Dropdown.Item>Middle Border</Dropdown.Item>
                            </div>
                        </div>
                    </Dropdown>
                    <Dropdown title="Empresa" trigger="hover" placement="bottomStart" style={{fontSize:"19px"}} >
                        <Dropdown.Item>Sobre Nosotros</Dropdown.Item>
                        <Dropdown.Item>Contacto</Dropdown.Item>
                    </Dropdown>
                    </Nav>
                    <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
                        <IconButton appearance="primary" icon={< AdminIcon style={{ fontWeight:"bold", background:"transparent" }}/>} style={{ fontSize:"16px", fontWeight:"bold", border:"1px solid white", color:"white" }} onClick={()=> window.open("/login", "_blank", "noopener,noreferrer")}>Iniciar Sesión</IconButton>
                        {/* <Button appearance="primary" style={{ background:"transparent", color:"black", fontWeight:"bold", border:"1px solid #1a1a1a" }} onClick={()=> window.open("/register", "_blank", "noopener,noreferrer")}>Registrarse</Button> */}
                        <Button appearance="primary" style={{ fontSize:"15px", backgroundColor: "#1a1a1a", color: "white", fontWeight: "bold" }} onClick={handleWhatsapp}>Contactar con Ventas</Button>
                    </div>
                </Navbar>
            </Header>
            <Content >
                <div style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden" }}>
                    <video autoPlay muted style={{width: "100%", height: "100%", objectFit: "cover"}}>
                        <source src={VIDEO} type="video/mp4" /> Tu Navegador no soporta la reproducción de videos.
                    </video>
                </div>
                {/* Sección de productos populares */}
                <div style={{ padding: "40px 20px", backgroundColor: "#f8f9fa" }}>
                    <Container>
                        <div style={{ textAlign: "left", marginBottom: "30px" }}>
                            <h3 style={{ fontSize: "36px", fontWeight: "bold", color: "#333", marginBottom: "5px" }}>POPULAR</h3>
                            <p style={{ color: "#ff4500", fontWeight: "bold" }}>{products.length} ITEMS</p>
                        </div>
                        <Row>
                            {products.map((product) => (
                                <Col key={product.id} xs={24} sm={12} md={6} style={{ padding: "10px" }}>
                                    <Panel shaded bodyFill style={{ transition: "transform 0.3s", cursor: "pointer", position: "relative" }}
                                        onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-5px)" }}
                                        onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)" }}>
                                        
                                        {product.isNew && (
                                            <Tag color="green" style={{ position: "absolute", top: "10px", right: "10px", zIndex: "1" }}>NUEVO</Tag>
                                        )}
                                        
                                        {product.special && (
                                            <Tag color="blue" style={{ position: "absolute", top: "10px", right: "10px", zIndex: "1" }}>ESPECIAL</Tag>
                                        )}
                                        
                                        <div style={{ height: "200px", overflow: "hidden" }}>
                                            <Image src={product.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        </div>
                                        <Panel header={
                                            <div>
                                                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "5px" }}>{product.name}</h3>
                                                <div style={{ color: "#888", fontSize: "14px" }}>{product.category}</div>
                                            </div>
                                        }>
                                            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                                                {product.oldPrice && (
                                                    <span style={{ textDecoration: "line-through", color: "#888", marginRight: "10px" }}>${product.oldPrice.toFixed(2)}</span>
                                                )}
                                                <span style={{ color: "#ff4500", fontWeight: "bold" }}>${product.price.toFixed(2)}</span>
                                            </div>
                                        </Panel>
                                    </Panel>
                                </Col>
                            ))}
                        </Row>
                        <div style={{ textAlign: "center", marginTop: "30px" }}>
                            <Button appearance="primary" style={{ fontSize: "16px", backgroundColor: "#ff4500", color: "white", padding: "10px 30px" }}>VER TODOS LOS PRODUCTOS</Button>
                        </div>
                    </Container>
                </div>

                {/* Sección de blog */}
                <div style={{ padding: "40px 20px", backgroundColor: "white" }}>
                    <Container>
                        <div style={{ textAlign: "left", marginBottom: "30px" }}>
                            <h3 style={{ fontSize: "36px", fontWeight: "bold", color: "#333" }}>Blog</h3>
                        </div>
                        
                        {/* Banner con video y título */}
                        <div style={{ position: "relative", width: "100%", height: "400px", marginBottom: "40px" }}>
                            <div style={{ position: "absolute", height: "100%", backgroundColor: "rgba(0,0,0,0.6)", zIndex: "1", display: "flex", alignItems: "center", justifyContent: "flex-start", padding: "0 50px" }}>
                                <div>
                                    <h1 style={{ color: "white", fontSize: "64px", fontWeight: "900", marginBottom: "20px" }}>KEEP IT<br/>STREET</h1>
                                    <Button appearance="ghost" style={{ borderColor: "white", color: "white" }}>LEER MÁS</Button>
                                </div>
                                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                    <IconButton icon={<i className="rs-icon rs-icon-play" style={{ fontSize: "36px" }}></i>} circle size="lg" style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "white" }} />
                                </div>
                            </div>
                            <Image src="/path/to/banner.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        
                        {/* Artículos del blog */}
                        <Row>
                            {blogPosts.map((post) => (
                                <Col key={post.id} xs={24} sm={12} md={6} style={{ padding: "10px" }}>
                                    <Panel bodyFill style={{ transition: "transform 0.3s", cursor: "pointer" }}
                                        onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-5px)" }}
                                        onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)" }}>
                                        <div style={{ height: "200px", overflow: "hidden" }}>
                                            <Image src={post.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        </div>
                                        <Panel>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                                <Tag color="blue">{post.category}</Tag>
                                                <small style={{ color: "#888" }}>{post.date}</small>
                                            </div>
                                            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>{post.title}</h3>
                                            <p style={{ color: "#666", fontSize: "14px", height: "80px", overflow: "hidden" }}>{post.description}</p>
                                            <Button appearance="link" style={{ padding: "0", color: "#ff4500" }}>Leer más</Button>
                                        </Panel>
                                    </Panel>
                                </Col>
                            ))}
                        </Row>
                        <div style={{ textAlign: "center", marginTop: "30px" }}>
                            <Button appearance="primary" style={{ fontSize: "16px", backgroundColor: "#ff4500", color: "white", padding: "10px 30px" }}>VER TODOS LOS ARTÍCULOS</Button>
                        </div>
                    </Container>
                </div>
            </Content>
            <Footer style={{ padding: "20px", backgroundColor: "#f8f8f8", borderTop: "1px solid #e5e5e5" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <Divider></Divider>
                    <div style={{ display: "flex", gap: "15px", alignItems:"center"}}>
                        <label style={{fontSize:"18px"}}><strong>¿No encontraste lo que buscabas?</strong> Contáctanos:</label>
                        <IconButton style={{fontSize:"30px"}} icon={<FaFacebook />} appearance="subtle" onClick={handleFacebook} />
                        <IconButton style={{fontSize:"30px"}} icon={<FaWhatsapp />} appearance="subtle" onClick={handleWhatsapp} />
                        <IconButton style={{fontSize:"30px"}} icon={<FaTiktok />} appearance="subtle" onClick={handleTikTok} />
                        <IconButton style={{fontSize:"30px"}} icon={<FaEnvelope />} appearance="subtle" onClick={handleEmail} />
                    </div>
                    <div style={{ display: "flex", alignItems:"center"}}>
                        <label style={{fontSize:"20px", fontWeight:"bold",}}>IMPORTADORA JAVIERITO</label>
                        <Divider vertical style={{fontSize:"300%"}}/>
                        <Image circle src={LOGO} style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                    </div>
                    <Divider></Divider>
                </div>
                <div style={{ textAlign: "center",  }}>        
                    <p>©2025 Importadora Javierito. Todos los derechos reservados.</p>
                </div>
            </Footer>
        </Container>
    )
    
}

