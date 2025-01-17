import { Container, Sidenav, Nav } from "rsuite";
import { useState } from "react";
import { FaBell, FaFileAlt, FaHome, FaRegClipboard, FaShoppingCart, FaTrash, FaUsers } from "react-icons/fa";



export default function Layout() {
    const [activeKey, setActiveKey] = useState<string | number | undefined>('');

    const handleSelect = (eventKey: string | number | undefined, event: React.SyntheticEvent) => {
        setActiveKey(eventKey);
    };

    return (
        <>
            <Container>
                <Sidenav
                    appearance="subtle"
                    onSelect={handleSelect}
                    activeKey={activeKey}
                    style={{ position: 'fixed', right: 0, top: 0, height: '100vh', width: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <div style={{ margin: '10px 0' }}>
                        <img alt="Importadora Javierito" style={{ borderRadius: '50%', width: '40px', height: '40px' }} />
                    </div>
                    <Sidenav.Body>
                        <Nav>
                            <Nav.Item 
                                eventKey="1" 
                                icon={<FaHome />} 
                                style={{ backgroundColor: activeKey === '1' ? 'black' : 'transparent', color: activeKey === '1' ? 'white' : 'inherit' }}
                            />
                            <Nav.Item 
                                eventKey="2" 
                                icon={<FaShoppingCart />} 
                                style={{ backgroundColor: activeKey === '2' ? 'black' : 'transparent', color: activeKey === '2' ? 'white' : 'inherit' }}
                            />
                            <Nav.Item 
                                eventKey="3" 
                                icon={<FaRegClipboard />} 
                                style={{ backgroundColor: activeKey === '3' ? 'black' : 'transparent', color: activeKey === '3' ? 'white' : 'inherit' }}
                            />
                            <Nav.Item 
                                eventKey="4" 
                                icon={<FaFileAlt />} 
                                style={{ backgroundColor: activeKey === '4' ? 'black' : 'transparent', color: activeKey === '4' ? 'white' : 'inherit' }}
                            />
                            <Nav.Item 
                                eventKey="5" 
                                icon={<FaBell />} 
                                style={{ backgroundColor: activeKey === '5' ? 'black' : 'transparent', color: activeKey === '5' ? 'white' : 'inherit' }}
                            />
                            <Nav.Item 
                                eventKey="6" 
                                icon={<FaUsers />} 
                                style={{ backgroundColor: activeKey === '6' ? 'black' : 'transparent', color: activeKey === '6' ? 'white' : 'inherit' }}
                            />
                            <Nav.Item 
                                eventKey="7" 
                                icon={<FaTrash />} 
                                style={{ backgroundColor: activeKey === '7' ? 'black' : 'transparent', color: activeKey === '7' ? 'white' : 'inherit' }}
                            />
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </Container>
        </>
    );
}
