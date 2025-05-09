import {  Stack, IconButton, Table,  Pagination, Input, InputGroup, Panel, FlexboxGrid, Whisper, Tooltip, Form, Dropdown, Button, Modal } from "rsuite";
import { FaArrowLeft, FaSearch, FaRegCalendar, FaExclamationTriangle } from "react-icons/fa";
import { useEffect, useState } from "react";
import "../../item/styles/styles.css";
import { FaPrint } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { CiCircleInfo } from "react-icons/ci";
import SaleModalProduct from "./saleModal_product";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const { Column, HeaderCell, Cell } = Table;

export default function SaleTable(){
    const [showModal, setShowModal] = useState<boolean>(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    const [salesData] = useState([
        { id: 'V-2025-0001', date: '28/4/2025 10:15:00', user: 'Juan Pérez', products: '2 productos', discount: '20', total: 26.34 },
        { id: 'V-2025-0002', date: '29/4/2025 11:45:00', user: 'Maria López', products: '1 productos', discount: '20', total: 8.90 },
        { id: 'V-2025-0003', date: '29/4/2025 14:20:00', user: 'Carlos Rodriguez', products: '2 productos', discount: '20', total: 10.80 },
        { id: 'V-2025-0004', date: '29/4/2025 9:30:00', user: 'Ana Martínez', products: '2 productos', discount: '20', total: 14.89 },
        { id: 'V-2025-0005', date: '29/4/2025 6:35:00', user: 'Juan Pérez', products: '1 productos', discount: '20', total: 12.00 }
    ]);
    
    useEffect(() => {
        
    }, []);
    
    function handleModal(hidde: boolean): void {
        setShowModal(hidde)
    }

    return(
        <div style={{ padding:30 }} >
            <Panel bordered style={{ marginBottom:15 }}>
                <Stack spacing={10} style={{ marginBottom: 15 }}>
                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Volver</Tooltip>}>
                        <IconButton icon={<FaArrowLeft style={{fontSize:"16px"}}/>} style={{ backgroundColor: "transparent", color:"black"}} onClick={() => navigate('/sale')}/>
                    </Whisper>
                    <div>
                        <h4 style={{ margin: 0 }}>Ventas Realizadas</h4>
                        <p style={{ color:'#878787' }}>Visualiza, filtra y devuelve las ventas</p>
                    </div>
                </Stack>
                <div style={{ marginBottom: 20, gap:"10px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <Form.Group style={{ flex: 1, minWidth: 200 }}>      
                            <InputGroup style={{ width: "100%" }}>
                                <InputGroup.Addon style={{background:"#16151A", color:"white"}}>
                                    <FaSearch />
                                </InputGroup.Addon>
                                <Input placeholder="Buscar por ID Venta, vendedor, cliente... " />
                            </InputGroup>
                        </Form.Group>
                       <Dropdown title="Todas las fechas" placement="bottomEnd" icon={<FaRegCalendar />}>
                            <Dropdown.Item>Todas las fechas</Dropdown.Item>
                            <Dropdown.Item>Hoy</Dropdown.Item>
                            <Dropdown.Item>Última semana</Dropdown.Item>
                            <Dropdown.Item>Último mes</Dropdown.Item>
                            <Dropdown.Item>Último año</Dropdown.Item>
                       </Dropdown>
                </div>
                <Table cellBordered bordered data={salesData} autoHeight rowHeight={70} style={{ background: "white", fontSize:"14px", borderRadius:"5px"}} height={590} headerHeight={50}>
                    <Column flexGrow={1} minWidth={190} align="center" fixed resizable>
                        <HeaderCell style={{ backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize:"14px", textAlign:"center"}} >ID Venta</HeaderCell>
                        <Cell dataKey="id" style={{alignItems:"center"}} />
                    </Column>
                    <Column width={200} align="center" resizable>
                        <HeaderCell style={{ backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize:"14px", textAlign:"center"}} >Fecha</HeaderCell>
                        <Cell dataKey="date" style={{alignItems:"center"}} />
                    </Column>
                    <Column flexGrow={1} minWidth={190} align="center" resizable>
                        <HeaderCell style={{ backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize:"14px", textAlign:"center"}} >Vendedor</HeaderCell>
                        <Cell dataKey="user" style={{alignItems:"center"}}/>
                    </Column>
                    <Column flexGrow={1} minWidth={190} align="center" resizable>
                        <HeaderCell style={{ backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize:"14px", textAlign:"center"}} >Cliente</HeaderCell>
                        <Cell dataKey="user" style={{alignItems:"center"}}/>
                    </Column>
                    <Column width={210} align="center" resizable>
                        <HeaderCell style={{ backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize:"14px", textAlign:"center"}} >Repuestos</HeaderCell>
                        <Cell dataKey="products" style={{alignItems:"center"}} >
                            {rowData => (
                                <div>
                                    {rowData.products}
                                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Ver Repuestos</Tooltip>} >
                                        <Button appearance="subtle" size="xs" style={{ background:"transparent" }} onClick={() => handleModal(true)}>
                                            <CiCircleInfo style={{ fontSize:"15px", fontWeight:"bold" }}/>
                                        </Button>
                                    </Whisper>
                                </div>
                            )}
                        </Cell>
                    </Column>
                    <Column width={200} align="center" resizable>
                        <HeaderCell style={{ backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize:"14px", textAlign:"center"}}>Descuento Total (%)</HeaderCell>
                        <Cell dataKey="discount" style={{alignItems:"center"}} />
                    </Column>
                    <Column width={150} align="center" resizable>
                        <HeaderCell style={{ backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize:"14px", textAlign:"center"}}>Total</HeaderCell>
                        <Cell style={{alignItems:"center"}}>
                            {rowData => `$${rowData.total.toFixed(2)}`}
                        </Cell>
                    </Column>
                    <Column width={130} align="center" resizable>
                        <HeaderCell style={{ backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize:"14px", textAlign:"center"}}>Acciones</HeaderCell>
                        <Cell>
                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Imprimir venta</Tooltip>}>
                                <IconButton appearance="link" icon={<FaPrint style={{color:"black"}}/>} />
                            </Whisper>
                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Devolución</Tooltip>}>
                                <IconButton appearance="link" icon={<MdOutlineRemoveShoppingCart style={{color:"black", fontSize:"18px"}}/>} onClick={handleOpen}/>
                            </Whisper>
                        </Cell>
                    </Column>
                </Table>
                <Pagination
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        maxButtons={5}
                        size="xs"
                        layout={['total', '-', '|', 'pager', 'skip']}
                        total={50}
                        limit={10}
                        activePage={1}
                        onChangePage={() => {}}
                        style={{marginTop: "5px"}}
                        className="custom-pagination"
                    />
            </Panel>
            <FlexboxGrid justify="space-between">
                <FlexboxGrid.Item style={{ flex: 1, marginRight: 15 }}>
                    <Panel bordered >
                        <h5>Total de Ventas</h5>
                        <h3 style={{ margin: '10px 0' }}>$69.93</h3>
                        <small>Ventas en el período seleccionado</small>
                    </Panel>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item style={{ flex: 1, marginRight: 15 }}>
                    <Panel bordered>
                        <h5>Productos Vendidos</h5>
                        <h3 style={{ margin: '10px 0' }}>24</h3>
                        <small>Unidades vendidas en el período seleccionado</small>
                    </Panel>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item style={{ flex: 1}}>
                    <Panel bordered>
                        <h5>Descuentos Aplicados</h5>
                        <h3 style={{ margin: '10px 0' }}>$4.95</h3>
                        <small>Total de descuentos en el período seleccionado</small>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <SaleModalProduct open={showModal} hiddeModal={() => handleModal(false)} />
            
            <Modal open={open} onClose={handleClose} backdrop="static" >
                <Modal.Header>
                    <Modal.Title >
                        <Stack >
                        <FaExclamationTriangle style={{color: "#f08b33", height:"30px", width:"30px", marginRight:"10px"}}/>
                            <strong>Advertencia</strong>
                        </Stack>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack justifyContent="center" direction="row" spacing={5} alignItems="center">
                        <div style={{ display:'flex', alignItems:"center", justifyContent:"center", flexDirection:'column'}}>
                            <p style={{ color: '#d32f2f', marginBottom:5 }}><strong>¡Atención!</strong> Esta acción no se puede deshacer.</p>
                            <div>
                                <strong>¿Devolver Venta?</strong>
                                <p>Está segur@ que desea realizar la devolución de la venta: <strong>id de la venta</strong></p>
                            </div>
                        </div>
                        
                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" appearance="ghost" style={{ color: "#f08b33", borderColor: "#f08b33"}}>Sí</Button>
                    <Button onClick={handleClose} appearance="primary">No</Button>
                </Modal.Footer>
            </Modal>            
        </div>
    )
}