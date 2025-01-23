import { Container, Header, Sidebar, Sidenav, Content, Nav, IconButton, HStack, Stack,  Image, Divider, Badge, Navbar, Whisper, Tooltip, Dropdown, Popover, Button, Carousel, Grid, Row, Col,  } from "rsuite";
import { FC, useEffect, useState, useRef } from "react";
import { Icon } from '@rsuite/icons';
import { FaWrench, FaFileAlt, FaShoppingCart, FaTrash, FaUsers, FaHome, FaSearch, FaSignOutAlt, FaCaretRight, FaCaretLeft, FaElementor, FaRegBell, FaShoppingBag,  FaEllipsisV, FaUser, FaMapPin, FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaTiktok } from "react-icons/fa";
import LOGO from '../../assets/LogoJavier.jpg';
import NavItem from "rsuite/esm/Nav/NavItem";
import { FaPersonCircleCheck, FaShop } from "react-icons/fa6";
import "../layout/styles/styles.css";
import SidenavBody from "rsuite/esm/Sidenav/SidenavBody";
import a from '../../assets/1.jpg'
import b from '../../assets/2.jpg'
import c from '../../assets/3.jpg'

interface LayoutProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ titleComponent, children }) => {
  const [expand, setExpand] = useState(true);
  const [expandRight, setExpandRight] = useState(true);
  const [searchVisible, setSearchVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeKey, setActiveKey] = useState<string>("1");
  const [visible, setVisible] = useState(false);
  const handleVisibility = () => setVisible(!visible);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setExpand(false);
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navRef = useRef<HTMLDivElement>(null);

  const handleSelect = (key: string) => {
    setActiveKey(key);
    const selectedItem = document.querySelector(`#nav-item-${key}`);

    if (selectedItem && navRef.current) {
      selectedItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center', // Centrar ítem seleccionado
      });
    }
  };
  
  const navItems = [
    { key: '1', icon: FaHome, label: 'Inicio' },
    { key: '2', icon: FaShoppingCart, label: 'Carrito' },
    { key: '3', icon: FaWrench, label: 'Inventario' },
    { key: '4', icon: FaShop, label: 'Sucursales' },
    { key: '5', icon: FaFileAlt, label: 'Reportes' },
    { key: '6', icon: FaElementor, label: 'Movimientos' },
    { key: '7', icon: FaUsers, label: 'Vendedores' },
    { key: '8', icon: FaTrash, label: 'Papelera' },
  ];
  
  const handleGoogleMaps = () => {
    window.open('https://maps.app.goo.gl/ouHB1jvoa9gGgYEFA');
  };
  const handleFacebook = () => {
    window.open('https://www.facebook.com/Importadora.Javierito');
  };
  const handleWhatsapp = () => {
    window.open('https://api.whatsapp.com/send?phone=%2B59165517570&context=ARAOgxZu0AlTjE3D0HiYiy6wqAptPW-HWrQppSrFkc7mtYLCdmhNaqf7Bd_sihzOz9aK-A515Oj4k_VXhSUpEKx7QADXlr6nT7KVaWeYYshysnyGPnEyDtEujhMEbvDbb1vumPu-0hs5AUrn4xEL_PB_Ag&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwY2xjawH-ahZleHRuA2FlbQIxMAABHWNUxixkD1GxddjQcxR5Zid36ff7zroZOTgkZP9CliakbGdhq_R8CDvqnw_aem_J_W1zcNSJZiWnSz-wp_wQA');
  };
  const handleInstagram = () => {
    window.open('https://maps.app.goo.gl/ouHB1jvoa9gGgYEFA');
  };
  const handleTikTok = () => {
    window.open('https://www.tiktok.com/@importjavierito?is_from_webapp=1&sender_device=pc');
  };
  const Email = () => {
    window.open('https://www.tiktok.com/@importjavierito?is_from_webapp=1&sender_device=pc');
  };

  function signOut() {}

  if(!isMobile){
  return (
    <Container >
      <Sidebar className="sidebar" width={expand ? 300 : 120} collapsible style={{ backgroundColor: '#f5f5f5', borderRight: '1px solid #e5e5e5', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
        <Sidenav.Header style={{backgroundColor: '#f5f5f5', padding:"10px", marginTop:"10px"}}>
          <Brand expand={expand} />
        </Sidenav.Header>
        <Divider style={{height:'0px'}}></Divider>
        <Divider style={{height:'0px'}}></Divider>
        <Sidenav expanded={expand} appearance="subtle" style={{ height: '100%' , overflow:'hidden' }}>
          <Sidenav.Body style={{flexGrow: 1, }}>
            <Nav defaultActiveKey="1" activeKey={activeKey} onSelect={(key) => setActiveKey(key)} >                  
              <Nav.Item eventKey="1" style={{borderRadius:"10px"}} icon={<Icon as={FaHome} />} className={`navItem ${expand? "": "collapsed"} ${activeKey === "1" ? "active" : ""}`}>Inicio</Nav.Item>
              <Nav.Item eventKey="2" style={{borderRadius:"10px"}} icon={<Icon as={FaShoppingCart} />} className={`navItem ${expand? "": "collapsed"} ${activeKey === "2" ? "active" : ""}`}>Carrito</Nav.Item>
              <Nav.Item eventKey="3" style={{borderRadius:"10px"}} icon={<Icon as={FaWrench} />} className={`navItem ${expand? "": "collapsed"} ${activeKey === "3" ? "active" : ""}`}>Inventario</Nav.Item>
              <Nav.Item eventKey="4" style={{borderRadius:"10px"}} icon={<Icon as={FaShop} />} className={`navItem ${expand? "": "collapsed"} ${activeKey === "4" ? "active" : ""}`}>Sucursales</Nav.Item>
              <Nav.Item eventKey="5" style={{borderRadius:"10px"}} icon={<Icon as={FaFileAlt} />} className={`navItem ${expand? "": "collapsed"} ${activeKey === "5" ? "active" : ""}`}>Reportes</Nav.Item>
              <Nav.Menu eventKey="6" title="Movimientos" icon={<Icon as={FaElementor} />}  >
              <Nav.Item eventKey="6-1" style={{borderRadius:"10px"}} icon={<Icon as={FaShoppingBag} style={{marginRight:"5px"}}/>} className={`navmenu ${expand? "": "collapsed"} ${activeKey === "5" ? "active" : ""}`}>Ventas</Nav.Item>
              <Nav.Item eventKey="6-2" style={{borderRadius:"10px"}} icon={<Icon as={FaPersonCircleCheck} style={{marginRight:"5px"}}/>} className={`navmenu ${expand? "": "collapsed"} ${activeKey === "5" ? "active" : ""}`}>Clientes</Nav.Item>
              </Nav.Menu>
                <Nav.Item eventKey="7" style={{borderRadius:"10px"}} icon={<Icon as={FaUsers} />} className={`navItem ${expand? "": "collapsed"} ${activeKey === "7" ? "active" : ""}`}>Vendedores</Nav.Item>
                <Nav.Item eventKey="8" style={{borderRadius:"10px"}} icon={<Icon as={FaTrash} />} className={`navItem ${expand? "": "collapsed"} ${activeKey === "8" ? "active" : ""}`}>Papelera</Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
        <Divider style={{height:'3px', color:'black'}}></Divider>
        <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
      </Sidebar>
      
      <Container>
        <Container style={{display:"flex", flexDirection:"row"}}>
        <Header style={{flex: 0.75}}>
          <Navbar appearance="inverse" className="navbar" style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', borderBottom: '1px solid #e5e5e5', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
            <Nav  >
              <NavItem disabled className="headerNav" style={{color:"black",}}>{titleComponent}</NavItem>
            </Nav>
          </Navbar>
        </Header>
        <Header style={{flex:0.25}}>
          <Navbar className="navbar2" style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', borderBottom: '1px solid #e5e5e5', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}}>
            <Nav pullRight style={{position:"relative"}}>
            {isMobile ? (
              <Dropdown trigger="click" placement="bottomEnd" icon={<FaEllipsisV style={{color:"black"}}/>} noCaret>
                <Dropdown.Item onClick={() => setSearchVisible(!searchVisible)}>
                  <FaSearch style={{ marginRight: 8 }} />
                  Buscar
                </Dropdown.Item>
                <Dropdown.Item>
                  <Badge >
                    <FaRegBell style={{ marginRight: 8 }} />
                  </Badge>
                  Notificaciones
                </Dropdown.Item>
                <Dropdown.Item onClick={signOut}>
                  <FaUser style={{ marginRight: 8 }} />
                  Perfil
                </Dropdown.Item>
                </Dropdown>
            ) : (
            <>
              <IconButton style={{ marginRight:"10px", fontSize:'20px'}} icon={<FaSearch />} appearance="subtle" onClick={() => setSearchVisible(!searchVisible)}  />
              <Whisper trigger="click"  placement="bottomEnd" speaker={
              <Popover title="Notificaciones">
                <div style={{ padding: "10px" }}>
                  <p><strong>Notificación 1:</strong> Pedido recibido</p>
                  <Divider></Divider>
                  <p><strong>Notificación 2:</strong> Inventario actualizado</p>
                  <Divider></Divider>
                  <p><strong>Notificación 3:</strong> Juan Registro un motor</p>
                </div>
              </Popover>
              }
              open={visible}
              onClick={() => setVisible(false)} 
              >
              <IconButton className="notificationIcon" icon={<Badge content={7}><FaRegBell /></Badge>} appearance="subtle" onClick={handleVisibility}/>
              </Whisper>
                {/* <Whisper trigger={'hover'} placement="left" speaker={<Tooltip>Cerrar sesión</Tooltip>}>
                  <IconButton icon={<FaSignOutAlt />} onClick={() => signOut()} appearance="ghost" className="toggleButton" aria-label="Toggle Sidebar"/>
                </Whisper> */}
                <Whisper trigger="click" placement="bottomEnd" speaker={
                  <Popover title="Perfil">
                  </Popover>
                }
                >
                  <IconButton icon={<FaUser />} appearance="ghost" style={{borderRadius:"20px", fontSize:'20px'}}/>
                </Whisper>
              </>
              )}
            </Nav>
          </Navbar>
        </Header>
        </Container>
        <Container style={{ display: "flex", flexDirection:"row", flex:60}}>
          <Content style={{ flex:expandRight? 0.75: 1, marginLeft:"10px", marginRight:"10px", marginBottom:"10px", borderRadius:"20px", background:"orange"}}>
          {children}
          </Content>
          <Sidebar style={{ flex: expandRight? 0.25 : 0.040, marginRight:"10px", marginBottom:"10px", borderRadius:"20px", background:"#f5f5f5", transition:"all 0.3s", overflow:"hidden", border: '1px solid #e5e5e5', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', position: "relative"}}>
            {expandRight &&(
              <>
              <div style={{ flexDirection:"column", borderRadius:"10px", margin:"10px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                
                <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                  <FaShop style={{fontSize:"22px"}}/>
                  <h4 style={{marginLeft:"7px"}}>Sucursales</h4>
                </div>
                <Carousel autoplay className="h-48 mb-4 " shape="bar" style={{margin:"0px 10px 5px", borderRadius:"10px"}}>
                  <img src={a} alt="Sucursal 1" style={{objectFit: 'cover', width: '100%', height: '100%'}}/>
                  <img src={b} alt="Sucursal 2" style={{objectFit: 'cover', width: '100%', height: '100%'}}/>
                  <img src={c} alt="Sucursal 2" style={{objectFit: 'cover', width: '100%', height: '100%'}}/>
                </Carousel>
                <Button onClick={handleGoogleMaps} style={{ background:"#de7214", color:"white", display:"flex", alignItems:"center", justifyContent:"center" , width:"90%", height:"7%", fontSize:"16px"}}>
                  <FaMapPin />Ver ubicación
                </Button>
              </div>
              <div style={{flexDirection:"column", borderStyle:"dashed", display:"flex", margin:"0px 15px 5px 15px", borderRadius:"10px", alignItems:"center", background:"#D9D9D9", justifyContent:"center"}}>
                <h4 style={{fontWeight: 'bold', padding:"10px 5px 0px"}}>Quienes Somos?</h4>
                <p style={{fontSize: '14px', color: 'black', padding:"0px 20px 0px 20px", textAlign:"center"}}>
                  Importadora Javierito la excelencia en repuestos originales americanos: 
                  motores, suspensiones, cajas, inyectores, aros, alternadores y mucho más. Su 
                  vehículo merece lo mejor, garantizamos calidad 100% en vida garantizado en 
                  nuestros productos.
                </p>
                <p style={{fontSize: '14px', marginBottom: '10px'}}>¿No encontraste lo que buscabas?<strong> Contáctanos:</strong></p>
                <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginBottom:"10px"}}>
                  <IconButton style={{fontSize:"24px"}} icon={<FaFacebook />} appearance="subtle" onClick={handleFacebook}/>
                  <IconButton style={{fontSize:"24px"}} icon={<FaWhatsapp />} appearance="subtle" onClick={handleWhatsapp}/>
                  <IconButton style={{fontSize:"24px"}} icon={<FaInstagram />} appearance="subtle" />
                  <IconButton style={{fontSize:"24px"}} icon={<FaTiktok />} appearance="subtle" onClick={handleTikTok}/>
                  <IconButton style={{fontSize:"24px"}} icon={<FaEnvelope />} appearance="subtle" />
                </div>
              </div>
              </>
            )}
            <div style={{ position: 'absolute', bottom:8, width: '100%',background: '#f5f5f5' }}>              
            <IconButton style={{marginLeft:"15px"}} onClick={() => setExpandRight(!expandRight)} appearance="subtle" size="lg" icon={expandRight ? <FaCaretRight /> : <FaCaretLeft />}/>

            </div>
          </Sidebar>
        </Container>
      </Container>
    </Container>
  );
  }else {
    return (
      <Container className="container-mobile">
        <Grid>
          <Row>
            <Col sm={24} xs={24}></Col>
            <Col sm={24} xs={24}></Col>
            <Col sm={24} xs={24}>
              <Navbar appearance="subtle" className="navbarM">
                <div className="navbar-containerMF">
                  <Nav className="navM">
                    {navItems.map((item) => (
                      <Nav.Item 
                        id={`nav-item-${item.key}`}
                        key={item.key}
                        icon={<Icon as={item.icon}  />} 
                        onSelect={() => handleSelect(item.key)}
                        className={`nav-itemM ${activeKey === item.key ? 'active' : ''}`}
                      >
                        {item.label}
                      </Nav.Item>
                    ))}
                  </Nav>
                </div>
              </Navbar>
            </Col>
          </Row>
        </Grid>
      </Container>

      );
    }
  }
const NavToggle = ({ expand, onChange }: { expand: boolean; onChange: () => void }) => {
    return (
      <Stack className="navToggle" >
        <IconButton style={{fontSize:"22px"}} onClick={onChange} appearance="subtle" size="lg" icon={expand ? <FaCaretRight/> : <FaCaretLeft />} />
      </Stack>
    );
};

const Brand = ({}: { expand: boolean }) => {
    return (
      <HStack className="pagebrand" >
        <div style={{borderRadius:"50%", backgroundColor:"#f08b33" }} >
          <Image circle src={LOGO} width={120} style={{padding:"3px", cursor:"pointer"}} />
        </div>
        {/* {expand && <Text style={{fontWeight:"bold", textAlign:"left", color:"black"}}>IMPORTADORA JAVIERITO</Text>} */}
      </HStack>
    );
  };
  
export default Layout;
