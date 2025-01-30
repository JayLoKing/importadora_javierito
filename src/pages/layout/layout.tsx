import { Container, Header, Sidebar, Sidenav, Content, Nav, IconButton, HStack, Stack, Image, Divider, Badge, Navbar, Whisper, Dropdown, Popover, Grid, Row, Col, Avatar, Footer, Toggle, } from "rsuite";
import { FC, useEffect, useState, useRef } from "react";
import { Icon, Search } from '@rsuite/icons';
import { FaWrench, FaFileAlt, FaShoppingCart, FaTrash, FaUsers, FaHome, FaSearch, FaElementor, FaRegBell, FaShoppingBag, FaEllipsisV, FaUser, FaHistory, FaAngleLeft, FaAngleRight, FaEdit, FaPowerOff } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import LOGO from '../../assets/LogoJavier.jpg';
import NavItem from "rsuite/esm/Nav/NavItem";
import { FaPersonCircleCheck, FaShop } from "react-icons/fa6";
import "../layout/styles/styles.css";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/store";
import { jwtDecoder } from "../../utils/jwtDecoder";
import { AuthUser } from "../../modules/auth/models/auth.model";

interface LayoutProps {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ titleComponent, children }) => {
  const [expand, setExpand] = useState(true);
  const [searchVisible, setSearchVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeKey, setActiveKey] = useState<string>("1");
  const [visible, setVisible] = useState(false);
  const handleVisibility = () => setVisible(!visible);
  const navigate = useNavigate();

  const jwt = useAuthStore(state => state.jwt);
  const [user, setUser] = useState<AuthUser>({ id: 0, username: '', role: '' });

  useEffect(() => {
    getRoleNUsername();
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

  function getRoleNUsername() {
    if (jwt) {
      let decode = jwtDecoder(jwt);
      decode.role = setRole(decode.role)
      setUser({
        id: decode.id,
        username: decode.sub,
        role: decode.role
      })
    } else {
      console.error("User authentication token is null");
    }
  }

  function setRole(role: string): string {
    if (role === 'ROLE_Admin') {
      role = 'Administrador';
    } else if (role === 'ROLE_Owner') {
      role = 'Dueño';
    } else {
      role = 'Vendedor';
    }
    return role
  }

  const navRef = useRef<HTMLDivElement>(null);

  const handleSelect = (key: string) => {
    setActiveKey(key);
    const selectedItem = document.querySelector(`#nav-item-${key}`);

    switch (key) {
      case '1':
        navigate('/');
        break;
      case '2':
        navigate('/buys');
        break;
      case '3':
        navigate('/inventory');
        break;
      case '4':
        navigate('/branchOffice');
        break;
      default:
        break;
    }


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

  // const handleGoogleMaps = () => {
  //   window.open('https://maps.app.goo.gl/ouHB1jvoa9gGgYEFA');
  // };
  // const handleFacebook = () => {
  //   window.open('https://www.facebook.com/Importadora.Javierito');
  // };
  // const handleWhatsapp = () => {
  //   window.open('https://api.whatsapp.com/send?phone=%2B59165517570&context=ARAOgxZu0AlTjE3D0HiYiy6wqAptPW-HWrQppSrFkc7mtYLCdmhNaqf7Bd_sihzOz9aK-A515Oj4k_VXhSUpEKx7QADXlr6nT7KVaWeYYshysnyGPnEyDtEujhMEbvDbb1vumPu-0hs5AUrn4xEL_PB_Ag&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwY2xjawH-ahZleHRuA2FlbQIxMAABHWNUxixkD1GxddjQcxR5Zid36ff7zroZOTgkZP9CliakbGdhq_R8CDvqnw_aem_J_W1zcNSJZiWnSz-wp_wQA');
  // };
  // const handleInstagram = () => {
  //   window.open('https://maps.app.goo.gl/ouHB1jvoa9gGgYEFA');
  // };
  // const handleTikTok = () => {
  //   window.open('https://www.tiktok.com/@importjavierito?is_from_webapp=1&sender_device=pc');
  // };
  // const Email = () => {
  //   window.open('https://www.tiktok.com/@importjavierito?is_from_webapp=1&sender_device=pc');
  // };

  function signOut() { }
  if (!isMobile) {
    return (
      <Container style={{ display: "flex", height: '100vh' }}>
        <Sidebar className="sidebar" width={expand ? 300 : 120} collapsible style={{ backgroundColor: '#f5f5f5', borderRight: '1px solid #e5e5e5', borderBottom: "1px solid #e5e5e5", boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <Sidenav.Header style={{ backgroundColor: '#f5f5f5', padding: "10px", marginTop: "10px" }}>
            <Brand expand={expand} />
          </Sidenav.Header>
          <Divider style={{ height: '0px' }}></Divider>
          <Sidenav expanded={expand} appearance="subtle" style={{ height: '100vh', overflow: "auto" }} >
            <Sidenav.Body style={{ flexGrow: 1, fontSize: "20px" }}>
              <Nav defaultActiveKey="1" activeKey={activeKey} onSelect={(key) => setActiveKey(key)} >
                <Nav.Item eventKey="1" style={{ borderRadius: "5px", }} icon={<Icon as={FaHome} style={{ height: "20px", width: "20px" }} />} className={`navItem ${expand ? "" : "collapsed"} ${activeKey === "1" ? "active" : ""}`} >Inicio</Nav.Item>
                <Nav.Item eventKey="2" style={{ borderRadius: "5px", }} icon={<Icon as={FaShoppingCart} style={{ height: "20px", width: "20px" }} />} className={`navItem ${expand ? "" : "collapsed"} ${activeKey === "2" ? "active" : ""}`}>Carrito</Nav.Item>
                <Nav.Item eventKey="3" onClick={() => navigate('/items')} style={{ borderRadius: "5px", }} icon={<Icon as={FaWrench} style={{ height: "20px", width: "20px" }} />} className={`navItem ${expand ? "" : "collapsed"} ${activeKey === "3" ? "active" : ""}`}>Inventario</Nav.Item>
                <Nav.Item eventKey="4" onClick={() => navigate('/branchOffice')} style={{ borderRadius: "5px", }} icon={<Icon as={FaShop} style={{ height: "20px", width: "20px" }} />} className={`navItem ${expand ? "" : "collapsed"} ${activeKey === "4" ? "active" : ""}`}>Sucursales</Nav.Item>
                <Nav.Item eventKey="5" style={{ borderRadius: "5px" }} icon={<Icon as={FaFileAlt} style={{ height: "20px", width: "20px" }} />} className={`navItem ${expand ? "" : "collapsed"} ${activeKey === "5" ? "active" : ""}`} onClick={() => navigate('/report')}>Reportes</Nav.Item>
                <Nav.Menu eventKey="6" placement="rightStart" trigger="hover" title="Movimientos" icon={<Icon as={FaHistory} style={{ height: "20px", width: "20px" }} />}  >
                  <Nav.Item eventKey="6-1" style={{ borderRadius: "5px", }} icon={<Icon as={FaShoppingBag} style={{ marginRight: "7px", height: "18px", width: "18px" }} />} className={`navmenu ${expand ? "" : "collapsed"} ${activeKey === "6-1" ? "active" : ""}`}>Ventas</Nav.Item>
                  <Nav.Item eventKey="6-2" style={{ borderRadius: "5px", }} icon={<Icon as={FaPersonCircleCheck} style={{ marginRight: "7px", height: "18px", width: "18px" }} />} className={`navmenu ${expand ? "" : "collapsed"} ${activeKey === "6-2" ? "active" : ""}`}>Clientes</Nav.Item>
                </Nav.Menu>
                <Nav.Item eventKey="7" style={{ borderRadius: "5px", }} icon={<Icon as={FaUsers} style={{ height: "20px", width: "20px" }} />} className={`navItem ${expand ? "" : "collapsed"} ${activeKey === "7" ? "active" : ""}`}>Vendedores</Nav.Item>
                <Nav.Item eventKey="8" style={{ borderRadius: "5px", }} icon={<Icon as={FaTrash} style={{ height: "20px", width: "20px" }} />} className={`navItem ${expand ? "" : "collapsed"} ${activeKey === "8" ? "active" : ""}`}>Papelera</Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          {/* <Divider style={{ height: '2px', color: 'black' }}></Divider> */}

        </Sidebar>

        <Container style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header >
            <Navbar appearance="inverse" className="navbar1" style={{ borderBottom: '1px solid #e5e5e5', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <Nav style={{ display: "flex", justifyContent: "space-between" }}>
                <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
                <NavItem disabled className="headerNav" style={{ color: "white" }}>{titleComponent}</NavItem>
              </Nav>
              <Nav pullRight style={{ position: "relative" }}>
                {isMobile ? (
                  <Dropdown trigger="click" placement="bottomEnd" icon={<FaEllipsisV style={{ color: "black" }} />} noCaret>
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
                    <Whisper trigger="click" placement="bottomEnd" speaker={
                      <Popover title="Notificaciones">
                        <div style={{ padding: "10px" }}>
                          <p><strong>Notificación 1:</strong> Pedido recibido</p>
                          <Divider></Divider>
                          <p><strong>Notificación 2:</strong> Inventario actualizado</p>
                          <Divider></Divider>
                          <p><strong>Notificación 3:</strong> Juan Registro un motor</p>
                        </div>
                      </Popover>
                    }>
                      <IconButton style={{ marginRight: "15px", fontSize: '24px', background: "transparent", color: "white" }} icon={<Badge content={7}><FaRegBell /></Badge>} appearance="subtle" onClick={handleVisibility} />
                    </Whisper>
                    <Whisper trigger="click" placement="bottomEnd" speaker={
                      <Popover style={{ textAlign: "center" }}>
                        <div style={{ padding: "5px", fontSize: "13px" }}>
                          <Toggle style={{ background: "white", fontSize: "13px", padding: "3px", }}>Modo Oscuro</Toggle>
                        </div>
                      </Popover>
                    }>
                      <IconButton style={{ marginRight: "20px", fontSize: '25px', background: "transparent", color: "white" }} icon={<IoMdSettings />} appearance="subtle" onClick={handleVisibility} />
                    </Whisper>
                    <Whisper trigger="click" placement="bottomEnd" speaker={
                      <Popover >
                        <div style={{ padding: "5px", fontSize: "13px" }}>
                          <p>{user.username}</p>
                          <strong>{user.role}</strong>
                          <hr />
                          <IconButton icon={<FaEdit style={{ marginRight: "5px", fontSize: "12px" }} />} style={{ background: "white", fontSize: "13px", padding: "3px", textAlign: "center" }}>Editar Perfil</IconButton>
                          <hr />
                          <IconButton icon={<FaPowerOff style={{ marginRight: "5px", fontSize: "12px" }} />} style={{ background: "white", fontSize: "13px", padding: "3px", textAlign: "center" }}>Cerrar Sesión</IconButton>
                        </div>
                      </Popover>
                    }>
                      <IconButton icon={<FaUser />} appearance="ghost" style={{ borderRadius: "20px", fontSize: '20px', color: "white", borderColor: "white" }} />
                    </Whisper>
                  </>
                )}
              </Nav>
            </Navbar>
          </Header>
          <Content style={{ margin: "5px 10px 0px 10px", borderRadius: "20px 20px 0px 0px", background: "#f5f5f5", height: "100vh", overflow: "hidden", borderRight: '1px solid #e5e5e5', borderLeft: '1px solid #e5e5e5', borderTop: '1px solid #e5e5e5' }}>
            {children}
          </Content>
          <Footer style={{ borderLeft: '1px solid #e5e5e5', borderRight: '1px solid #e5e5e5', textAlign: "center", fontSize: "16px", fontWeight: "bold", marginLeft: "10px", marginRight: "10px", borderRadius: "0px 0px 20px 20px", background: '#f5f5f5' }}>IMPORTADORA JAVIERITO ®</Footer>
        </Container>
      </Container>
    );
  } else {
    return (
      <Container >
        <Grid fluid>
          <Row>
            <Col xs={24} >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", width: '100%', height: '70px', marginTop: '5px', position: 'fixed', left: '0' }}>
                <div className="container-logo-header-mobile">
                  <Image circle src="src\assets\LogoJavier.jpg" width={10} />
                </div>
                <div className="container-search-custom">
                  <div className="container-icon-search">
                    <Search style={{ fontSize: "24px", color: "white" }} />
                  </div>
                  <div>
                    <input className="search-input" placeholder="Buscar repuesto..." />
                  </div>
                </div>
                <div className="container-icon-user-mobile">
                  <Avatar size="lg" circle />
                </div>
              </div>
            </Col>
          </Row>
          <Row >
            <Col xs={24}>
              <div style={{ position: 'fixed', left: '0', marginTop: '95px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "white", width: ' 100%', height: '80vh' }}>
                {children}
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={24}>
              <div style={{ overflow: 'hidden', flexWrap: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: "center", width: '100%', height: '85px', marginTop: '5px', position: 'fixed', left: '0', bottom: '0', backgroundColor: 'white' }} >
                <Navbar appearance="subtle" className="navbarM">
                  <div className="navbar-containerMF">
                    <Nav className="navM">
                      {navItems.map((item) => (
                        <Nav.Item
                          id={`nav-item-${item.key}`}
                          key={item.key}
                          icon={<Icon as={item.icon} />}
                          onClick={() => handleSelect(item.key)}
                          className={`nav-itemM ${activeKey === item.key ? 'active' : ''}`}
                        >
                          {item.label}
                        </Nav.Item>
                      ))}
                    </Nav>
                  </div>
                </Navbar>
              </div>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}
const NavToggle = ({ expand, onChange }: { expand: boolean; onChange: () => void }) => {
  return (
    <Stack >
      <IconButton style={{ fontSize: "22px", background: "transparent", color: "white" }} onClick={onChange} appearance="subtle" size="lg" icon={expand ? <FaAngleLeft /> : <FaAngleRight />} />
    </Stack>
  );
};

const Brand = ({ }: { expand: boolean }) => {
  return (
    <HStack className="pagebrand" >
      <div style={{ borderRadius: "50%", backgroundColor: "#f08b33" }} >
        <Image circle src={LOGO} width={120} style={{ padding: "3px", cursor: "pointer" }} />
      </div>
      {/* {expand && <Text style={{fontWeight:"bold", textAlign:"left", color:"black"}}>IMPORTADORA JAVIERITO</Text>} */}
    </HStack>
  );
};

export default Layout;
