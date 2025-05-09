/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Grid, Stack, Row, Col, Panel, InputGroup, Input, Table, Whisper, IconButton, Tooltip, Content, Tabs, InputNumber, Loader } from "rsuite";
import { useEffect, useState } from "react";
import PlusIcon from '@rsuite/icons/Plus';
import { FaCamera, FaHistory,  FaLine, FaSearch, FaWrench } from "react-icons/fa";
import { FaBarcode, FaTrash, FaPrint, } from "react-icons/fa6";
import { CiCircleInfo } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import ModalInfoProduct from "./modal_infoProduct";
import { useSaleForm } from "../hooks/useSaleForm";

const { Column, HeaderCell, Cell } = Table;

export default function SaleForm(){
    const [currentDate, setCurrentDate] = useState<string>("");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState<boolean>(false)
    const [expandSidebar, setExpandSidebar] = useState(window.innerWidth > 768);
    const {
        handleConfigSound,
        handleInitializeCamera,
        handleManualSubmit,
        removeProduct,
        cameraStatus,
        lastScanned,
        isScanning,
        setIsScanning,
        videoRef,
        keyTab,
    } = useSaleForm();



    useEffect(() => {
        const now = new Date();
        const day = now.getDate();
        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        const month = months[now.getMonth()];
        const year = now.getFullYear();
        setCurrentDate(`${day} de ${month} de ${year}`);
    },[])

    useEffect(() => {
        handleConfigSound();
    },[]);

    useEffect(() => {
        handleInitializeCamera(isScanning);
    },[isScanning]);

    useEffect(() => {
    const handleResize = () => {
      setExpandSidebar(window.innerWidth > 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    }, []);
    

    const data = [
        {
          code: "P001",
          name: "Producto 1",
          price: 10.5,
          discount: 0,
          quantity: 1,
          total: 10.5
        },
        {
          code: "P002",
          name: "Producto 2",
          price: 20.0,
          discount: 5,
          quantity: 2,
          total: 40.0
        },
        {
            code: "P002",
            name: "Producto 2",
            price: 20.0,
            discount: 5,
            quantity: 2,
            total: 40.0
          },

      ];
    
    function handleModal(hidde: boolean): void {
        setShowModal(hidde)
    }
    
    const subtotal = data.reduce((sum, item) => sum + item.total, 0);
    const discountTotal = data.reduce((sum, item) => sum + (item.discount * item.price * item.quantity / 100), 0);
    const total = subtotal - discountTotal;

    return(
        <div style={{ height: "100%", overflow: "hidden"}}>
            <Grid fluid style={{ height: "100%", margin: 0, padding: 0 }}>
                <Row style={{ height: "100%", margin: 0 }}>
                    <Col xs={24} md={expandSidebar ? 16 : 24} style={{ height: "100%", padding: "20px", overflow: "auto" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
                            <div>
                                <h4>Registro de Ventas</h4>
                                <p style={{ color: '#878787' }}>Registra, visualiza e imprime tus ventas</p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                <div style={{ display: "flex", gap: 7 }}>
                                <strong>Vendedor:</strong>
                                <p>JUANITO</p>
                                </div>
                                <div>
                                <strong>{currentDate}</strong>
                                </div>
                            </div>
                        </div>                
                        
                            <Panel bordered style={{ marginBottom: 25 }}>
                                <div style={{justifyContent:"flex-start", display:"flex", gap:"5px", marginBottom:15}}>
                                    <FaCamera style={{width:"20px", height:"20px"}}/>
                                    <h5>Lector de Códigos de Barras</h5>
                                </div>
                                <div style={{marginBottom:25, display:"flex", gap:"10px", justifyContent:"space-between", alignItems: 'center', flexWrap: 'wrap'}}>
                                    <Button onClick={() => setIsScanning(!isScanning)} color={isScanning ? "red" : "green"} style={{ backgroundColor: "#1a1a1a", color: "white", fontWeight: "bold", margin: '5px 0', flexShrink: 0}}> {isScanning ? "Detener Cámara" : "Activar Cámara"} </Button>
                                        <Form.Group style={{ flex: 1, minWidth: 200 }}>
                                            <InputGroup inside style={{ width: "100%" }}>
                                                <InputGroup.Addon>
                                                    <FaBarcode />
                                                </InputGroup.Addon>
                                                <Input name="barcode" onChange={(value) => handleManualSubmit(value)} placeholder="Ingresar código manual"></Input>
                                            </InputGroup>
                                        </Form.Group>
                                    <Button appearance="primary" style={{ minWidth: '150px', margin: '5px 0', flexShrink: 0 }} >Agregar Repuesto</Button>
                                </div>
                                <h6 style={{display:"flex", justifyContent:"center", marginBottom:"20px"}}>Tabla de Productos Seleccionados</h6>
                                <Table cellBordered bordered height={300} data={data} rowHeight={60} style={{marginBottom:20, borderRadius:"5px",  }}>
                                    <Column width={75} align="center" fixed resizable>
                                        <HeaderCell style={{  fontWeight: "bold", background:"#16151A", color:"white" }}>Acciones</HeaderCell>
                                        <Cell style={{alignItems:"center"}}>
                                        {rowData => (
                                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Quitar</Tooltip>} >
                                                
                                            <IconButton onClick={() => removeProduct(rowData.id)} style={{ background:"transparent" }} icon={<FaTrash />} />
                                            </Whisper>
                                        )}
                                        </Cell>
                                    </Column>
                                    <Column width={150} align="center" fixed resizable>
                                        <HeaderCell style={{  fontWeight: "bold", background:"#16151A", color:"white" }}>Código</HeaderCell>
                                        <Cell dataKey="code" style={{alignItems:"center"}}>
                                        </Cell>
                                    </Column>
                                    <Column width={240} align="center" resizable>
                                        <HeaderCell style={{  fontWeight: "bold", background:"#16151A", color:"white" }}>Repuesto</HeaderCell>
                                        <Cell dataKey="name" style={{alignItems:"center"}}>
                                        {rowData => (
                                            <div>
                                                {rowData.name}
                                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Información</Tooltip>} >
                                                    <Button appearance="subtle" size="xs" style={{ background:"transparent" }} onClick={() => handleModal(true)}>
                                                        <CiCircleInfo style={{ fontSize:"15px", fontWeight:"bold" }}/>
                                                    </Button>
                                                </Whisper>
                                            </div>
                                        )}
                                        </Cell>
                                    </Column>
                                    <Column width={100} align="center" resizable>
                                        <HeaderCell style={{  fontWeight: "bold", background:"#16151A", color:"white" }}>Precio Público</HeaderCell>
                                        <Cell dataKey="price" style={{alignItems:"center"}}>
                                            {rowData => `$${rowData.price.toFixed(2)}`}
                                        </Cell>
                                    </Column>
                                    <Column width={120} align="center" resizable>
                                        <HeaderCell style={{  fontWeight: "bold", background:"#16151A", color:"white" }}>Precio por Mayor</HeaderCell>
                                        <Cell dataKey="price" style={{alignItems:"center"}}>
                                            {rowData => `$${rowData.price.toFixed(2)}`}
                                        </Cell>
                                    </Column>
                                    <Column width={98} align="center" fixed resizable>
                                        <HeaderCell style={{  fontWeight: "bold", background:"#16151A", color:"white" }}>Descuento (%)</HeaderCell>
                                        <Cell dataKey="discount" style={{alignItems:"center"}}>
                                            <InputNumber type="number" style={{ width: 70 }} />
                                        </Cell>
                                    </Column>
                                    <Column width={90} align="center" resizable>
                                        <HeaderCell style={{  fontWeight: "bold", background:"#16151A", color:"white" }}>Cantidad</HeaderCell>
                                        <Cell dataKey="quantity" style={{alignItems:"center"}}>
                                            <p>1</p>
                                        </Cell>
                                    </Column>
                                    <Column width={100} align="center" resizable>
                                        <HeaderCell style={{  fontWeight: "bold", background:"#16151A", color:"white" }}>Total</HeaderCell>
                                        <Cell dataKey="total" style={{alignItems:"center"}}>
                                            {rowData => `$${rowData.price.toFixed(2)}`}
                                        </Cell>
                                    </Column>
                                    <Column width={110} align="center" resizable>
                                        <HeaderCell style={{  fontWeight: "bold", background:"#16151A", color:"white" }}>Precio pelado</HeaderCell>
                                        <Cell dataKey="price" style={{alignItems:"center"}}>
                                            {rowData => `$${rowData.price.toFixed(2)}`}
                                        </Cell>
                                    </Column>
                                    
                                </Table>
                                <Stack style={{ display:"flex", alignItems:"center", justifyContent:"end"}}>
                                    <IconButton appearance="primary" icon={<PlusIcon/>}>Registrar Venta</IconButton>
                                </Stack>
                            </Panel>
                        
                        <div >
                            <Panel bordered>
                                <div style={{ justifyContent:"space-between", display:"flex", alignItems:"center", flexWrap: "wrap", gap: "15px"}}>
                                    <div >
                                        <Stack style={{marginBottom:10, fontWeight:"bold", fontSize:"18px", gap:10 }}>
                                            <span>Subtotal:</span>
                                            <span>Bs.{subtotal.toFixed(2)}</span>
                                        </Stack>
                                        <Stack style={{color:"red", fontWeight:"bold", fontSize:"18px", gap:10}}>
                                            <span>Descuento Total:</span>
                                            <span>Bs.{discountTotal.toFixed(2)}</span>
                                        </Stack>
                                    </div>
                                    <div style={{ display:"flex", alignItems:"center", fontWeight:"bolder", fontSize:"22px", gap:10}}>
                                        <span >Total: </span>
                                        <span>Bs.{total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                    </Col>
                    <Col xs={8} style={{ display:"flex", flexDirection:"column", justifyContent: "space-between", background:"#f6f6f6", height:"100%", padding:"20px", borderLeft:"1px solid #e0e0e0", borderBottom:"1px solid #e0e0e0", borderRadius:"7px 0 0 7px"}}>
                        <div style={{ width: "100%" }} >
                            <Tabs className="tab" defaultActiveKey="1" appearance="pills" style={{ textWrap:'wrap'}}>
                                <Tabs.Tab eventKey={keyTab} title="Camara" icon={<FaCamera/>}>
                                    <Content style={{ flex: 1, overflow: 'hidden', paddingTop: '15px' }}>
                                        {isScanning && (
                                        <div style={{ 
                                            position: "relative",
                                            width: "100%",
                                            height: "400px",
                                            margin: "20px 0",
                                            border: "2px solid #ddd",
                                            borderRadius: "8px",
                                            overflow: "hidden",
                                            backgroundColor: "#000"
                                        }}>
                                            <video
                                            ref={videoRef}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                //transform: "scaleX(-1)", // Efecto espejo
                                            }}
                                            muted
                                            playsInline
                                            />
                                            
                                            {cameraStatus === "starting" && (
                                            <div style={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                backgroundColor: "rgba(0,0,0,0.7)",
                                                color: "white"
                                            }}>
                                                <Loader size="lg" />
                                                <span style={{ marginLeft: "15px" }}>Iniciando cámara...</span>
                                            </div>
                                            )}
                                            {lastScanned && (
                                            <div style={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "50%",
                                                transform: "translate(-50%, -50%)",
                                                backgroundColor: "rgba(76, 175, 80, 0.9)",
                                                color: "white",
                                                padding: "15px 30px",
                                                borderRadius: "8px",
                                                fontSize: "1.3rem",
                                                fontWeight: "bold",
                                                boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                                                zIndex: 100,
                                                animation: "fadeInOut 1.5s ease-in-out"
                                            }}>
                                                ✓ Escaneo exitoso
                                            </div>
                                            )}
                                            {cameraStatus === "ready" && !lastScanned && (
                                            <div style={{
                                                position: "absolute",
                                                bottom: "20px",
                                                left: 0,
                                                right: 0,
                                                textAlign: "center",
                                                color: "white",
                                                textShadow: "0 0 5px rgba(0,0,0,0.8)",
                                                fontSize: "1.1rem"
                                            }}>
                                                Enfoca un código de barras en el área
                                            </div>
                                            )}
                                        </div>
                                        )}
                                    </Content>
                                </Tabs.Tab>
                                <Tabs.Tab eventKey="1" title="Buscar Repuestos" icon={<FaWrench />}>
                                    <Content style={{ flex: 1, overflow:"auto", padding: 5 }}>
                                        <InputGroup style={{ marginBottom: '15px' }}>
                                            <InputGroup.Addon style={{background:"#16151A", color:"white"}}>
                                                <FaSearch />
                                            </InputGroup.Addon>
                                            <Input placeholder="Buscar por nombre o código..."/>
                                        </InputGroup>
                                    </Content>
                                </Tabs.Tab>
                                <Tabs.Tab eventKey="2" title="Detalles de Repuesto" icon={<FaLine />}>
                                    <Content style={{ flex: 1, overflow: 'auto', paddingTop: '15px' }}>

                                    </Content>
                                </Tabs.Tab>
                                
                            </Tabs>
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            {/* Detalles del producto */}
                        </div>
                        <div style={{  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop:20 }}>
                            <Button appearance="primary" style={{ display: 'flex', flex:1, alignItems: 'center', justifyContent: 'center', fontWeight:'bold', gap:10 }}>
                                <FaPrint  />
                                Imprimir Recibo
                            </Button>
                            <Button onClick={() => navigate('/saleTable')} style={{ display: 'flex', flex:1, alignItems: 'center', justifyContent: 'center', gap:10, background:"black", fontWeight:"bold", color:'white' }} >
                                <FaHistory /> Historial de Ventas 
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Grid>
            <ModalInfoProduct open={showModal} hiddeModal={() => handleModal(false)} />
        </div>
    ) 
}