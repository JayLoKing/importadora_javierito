import { Container, Header, Sidebar, Sidenav, Content, Nav, IconButton, HStack, Stack, Text, Image, Divider, InputGroup, Input, Carousel, Badge, Navbar, Whisper, Tooltip, Dropdown, Popover, Grid, Row, Col, Button } from "rsuite";
import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { Icon } from '@rsuite/icons';
import { FaWrench, FaFileAlt, FaShoppingCart, FaTrash, FaUsers, FaHome, FaSearch, FaSignOutAlt, FaCaretRight, FaCaretLeft, FaElementor, FaRegBell, FaShoppingBag,  FaEllipsisV, FaAngleRight } from "react-icons/fa";
import LOGO from '../../assets/LogoJavier.jpg';
import a from '../../assets/1.jpg';
import b from '../../assets/2.jpg';
import c from '../../assets/3.jpg';
import NavItem from "rsuite/esm/Nav/NavItem";
import { FaPersonCircleCheck, FaShop } from "react-icons/fa6";
import "../layout/styles/styles.css";
import FormControl from "rsuite/esm/FormControl";

const Layout = () => {
  const [expand, setExpand] = useState(true);
  const [searchVisible, setSearchVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeKey, setActiveKey] = useState<string>("1");
  const [visible, setVisible] = useState(false);
  const handleVisibility = () => setVisible(!visible);
  //const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function signOut() {}

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
              <NavItem disabled className="headerNav" style={{color:"black",}}>REPUESTOS</NavItem>
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
                  <FaSignOutAlt style={{ marginRight: 8 }} />
                  Cerrar sesión
                </Dropdown.Item>
                </Dropdown>
            ) : (
            <>

              <IconButton style={{ width:'40px', marginTop:'-5px', marginRight:'15px', fontSize:'18px'}} icon={<FaSearch />} appearance="subtle" onClick={() => setSearchVisible(!searchVisible)}  />
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
                <Whisper trigger={'hover'} placement="left" speaker={<Tooltip>Cerrar sesión</Tooltip>}>
                  <IconButton icon={<FaSignOutAlt />} onClick={() => signOut()} appearance="ghost" className="toggleButton" aria-label="Toggle Sidebar"/>
                </Whisper>
              </>
              )}
            </Nav>
          </Navbar>
        </Header>
        </Container>
        <Container style={{ display: "flex", flexDirection:"row", flex:60 }}>
          <Content style={{ flex:0.75, marginLeft:"10px", marginRight:"10px", marginBottom:"10px", borderRadius:"20px", background:"orange"}}>

          </Content>
          <Sidebar style={{ flex:0.25 , marginRight:"10px", marginBottom:"10px", borderRadius:"20px", background:"#f5f5f5"}}>

          </Sidebar>
        </Container>
      </Container>
    </Container>
  );
}

const NavToggle = ({ expand, onChange }: { expand: boolean; onChange: () => void }) => {
    return (
      <Stack className="navToggle"  >
        <IconButton onClick={onChange} appearance="subtle" size="lg" icon={expand ? <FaCaretLeft/> : <FaCaretRight />} />
      </Stack>
    );
};

const Brand = ({ expand}: { expand: boolean }) => {
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
