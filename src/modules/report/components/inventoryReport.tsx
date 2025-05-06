/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, DatePicker, Dropdown, FlexboxGrid, Form, IconButton, Input, InputGroup, Modal, Panel, SelectPicker, Table, Tabs, Tooltip, Whisper } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';
import { BsBoxSeam, BsFileEarmarkText, BsCart3  } from "react-icons/bs";
import excel from '../../../assets/excel.png';
import csv from '../../../assets/csv.png';
import { useEffect, useState } from "react";
import { exportToExcel } from "../hooks/report.excel";
import { exportToCSV } from "../hooks/report.csv";
import { FetchDataByIdAsync } from "../../../common/services/generalService";
import { GetReportData } from "../models/report.model";
import { ItemUrl } from "../urls/report.url";
import { useReport } from "../hooks/useReport";
import { FaSearch } from "react-icons/fa";
import { FaDownload, FaRegCalendar, FaTrash } from "react-icons/fa6";
import { RiRefreshLine } from "react-icons/ri";
import { BsFillCheckCircleFill, BsFillXCircleFill  } from "react-icons/bs";

interface ReportData {
    datakey: number;
    name: string;
    type: string;
    filter: string;
    date: string;
    data: GetReportData[];
}

const { Column, HeaderCell, Cell } = Table;

export default function InventoryReport() {
    const [data, setData] = useState<ReportData[]>([]);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const requestData = {
        startDate: startDate,
        endDate: endDate,
    };

    const { data: fetchedData, fetchData } = FetchDataByIdAsync<GetReportData[]>(ItemUrl.excelReport, requestData);
    const {showSuccessMessage, showErrorMessage, showInfoMessage, showWarningMessage} = useReport();

    useEffect(() => {
        const sessionData = sessionStorage.getItem('reportData');
        if (sessionData) {
            setData(JSON.parse(sessionData));
        } else {
            const initialData: ReportData[] = [
                {
                    datakey: 1,
                    name: "Reporte de Prueba 1",
                    type: "Excel - CSV",
                    filter: "Inventario",
                    date: "11/02/2025 - 12:00:00",
                    data: [],
                },
            ];
            setData(initialData);
            sessionStorage.setItem('reportData', JSON.stringify(initialData));
        }
    }, []);

    const handleAddReport = async () => {
        if(!startDate || !endDate){
            showInfoMessage();
            return;
        }
        try{
            const response = await fetchData();
            if (response && response.length > 0) {
                const newReport: ReportData = {
                    datakey: data.length + 1,
                    name: `Reporte de Inventario ${data.length + 1}`,
                    type: "Excel - CSV",
                    filter: "Inventario",
                    date: new Date().toLocaleString(),
                    data: response,
                };
    
                const updatedData = [...data, newReport];
                setData(updatedData);
                sessionStorage.setItem('reportData', JSON.stringify(updatedData));
                showSuccessMessage();
            } else {
                showWarningMessage();
            }
        }
        catch(error){
            console.error("Error al obtener los datos del reporte:", error);
            showErrorMessage();
        }
    };

    const handleDownloadReport = async (format: "excel" | "csv", rowData: ReportData) => {
        try {
            if (rowData.data && rowData.data.length > 0) {
                if (format === "excel") {
                    exportToExcel(rowData.data, `${rowData.name}_EXCEL`);
                } else {
                    exportToCSV(rowData.data, `${rowData.name}_CSV`);
                }
            } else {
                alert("Este reporte no contiene datos.");
            }
        } catch (error) {
            console.error("Error al descargar el reporte:", error);
            showErrorMessage();
        }
    };

    return (
        <div style={{ padding: 30 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:20}}>
                <div>
                    <h4>Generación de Reportes</h4>
                    <p style={{ color:'#878787' }}>Crea, visualiza y descarga reportes de inventario y ventas</p>
                </div>
                <div >
                    <IconButton appearance='primary' icon={<PlusIcon />} size="lg" onClick={handleOpen}>
                        Nuevo Reporte
                    </IconButton>
                </div>
            </div>
            <FlexboxGrid justify="space-around" style={{ marginBottom:15 }}>
                <FlexboxGrid.Item as={Col} colspan={24} md={8} style={{ marginBottom:10}}>
                    <Panel bordered >
                        <div style={{ display:'flex', justifyContent:'space-between'}}>
                            <h5>Total de Reportes</h5>
                            <BsFileEarmarkText style={{fontSize:'1.5em'}}/>
                        </div>
                        <h3 style={{ margin: '10px 0' }}>5</h3>
                        <small>Total de reportes en el período seleccionado</small>
                    </Panel>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={24} md={8}  style={{ marginBottom:10}}>
                    <Panel bordered>
                        <div style={{ display:'flex', justifyContent:'space-between'}}>
                            <h5>Reportes de Inventario</h5>
                            <BsBoxSeam style={{fontSize:'1.5em'}}/>
                        </div>
                        <h3 style={{ margin: '10px 0' }}>2</h3>
                        <small>40% del total</small>
                    </Panel>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={24} md={8}  style={{ marginBottom:10}}>
                    <Panel bordered>
                    <div style={{ display:'flex', justifyContent:'space-between'}}>
                            <h5>Reportes de Ventas</h5>
                            <BsCart3 style={{fontSize:'1.5em'}}/>
                        </div>
                        <h3 style={{ margin: '10px 0' }}>3</h3>
                        <small>60% del total</small>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:15}}>
                <Tabs defaultActiveKey='1' appearance='pills'>
                    <Tabs.Tab eventKey="1" title="Todos">
                        
                    </Tabs.Tab>
                    <Tabs.Tab eventKey="2" title="Inventario">
                        
                    </Tabs.Tab>
                    <Tabs.Tab eventKey="3" title="Ventas">
                        
                    </Tabs.Tab>
                </Tabs>
                <div style={{ display:'flex', justifyContent:"space-around", flexDirection:'row', gap:10}}>
                    <Form.Group >      
                        <InputGroup style={{ width: "100%" }}>
                            <InputGroup.Addon style={{background:"#16151A", color:"white"}}>
                                <FaSearch />
                            </InputGroup.Addon>
                            <Input placeholder="Buscar..." />
                        </InputGroup>
                    </Form.Group>
                    <Dropdown placement="bottomEnd" title='Más recientes' icon={<FaRegCalendar />} >
                        <Dropdown.Item disabled>Más recientes</Dropdown.Item>
                        <Dropdown.Separator />
                        <Dropdown.Item>Más recientes</Dropdown.Item>
                        <Dropdown.Item>Más antiguos</Dropdown.Item>
                    </Dropdown>
                    <div>
                        <Whisper placement="top" trigger="hover" speaker={<Tooltip>Actualizar Tabla</Tooltip>} >
                            <Button size="lg" appearance="primary" >
                                <RiRefreshLine />
                            </Button>
                        </Whisper>
                    </div>
                </div>
            </div>
            <div style={{ display:'flex', justifyContent:"space-between", flexDirection:"row", gap:15, marginBottom:15 }}>
                <DatePicker size="lg" placeholder="Ordenar por Fecha - Desde" style={{ flex:1 }} />
                <DatePicker size="lg" placeholder="Ordenar por Fecha - Hasta" style={{ flex:1 }} />
            </div>
            <Panel bordered >
                <div style={{marginBottom:15}}>
                    <h4>Reportes Generados</h4>
                    <p style={{ color:'#878787' }}>5 Reportes encontrados</p>
                </div>
                <Table bordered cellBordered style={{ borderRadius:'5px' }} height={280}>
                    <Column flexGrow={1} minWidth={250} align="center" fixed resizable >
                        <HeaderCell style={{ background: "#16151A", color: "white", fontWeight: 'bold' }}>Nombre del Archivo</HeaderCell>
                        <Cell dataKey="code" style={{alignItems:"center"}}>
                        </Cell>
                    </Column>
                    <Column width={150} align="center"  resizable>
                        <HeaderCell style={{ background: "#16151A", color: "white", fontWeight: 'bold' }}> Tipo de Reporte </HeaderCell>
                        <Cell dataKey="code" style={{alignItems:"center"}}>
                        </Cell>
                    </Column>
                    <Column width={150} align="center"  resizable>
                        <HeaderCell style={{ background: "#16151A", color: "white", fontWeight: 'bold' }}>Filtro</HeaderCell>
                        <Cell dataKey="code" style={{alignItems:"center"}}>
                        </Cell>
                    </Column>
                    <Column width={220} align="center"  resizable>
                        <HeaderCell style={{ background: "#16151A", color: "white", fontWeight: 'bold' }}>Fecha y Hora</HeaderCell>
                        <Cell dataKey="code" style={{alignItems:"center"}}>
                        </Cell>
                    </Column>
                    <Column width={130} align="center"  resizable>
                        <HeaderCell style={{ background: "#16151A", color: "white", fontWeight: 'bold' }}>Estado</HeaderCell>
                        <Cell dataKey="code" style={{alignItems:"center"}}>
                            {(rowData) => (
                                <>
                                    {rowData.status === 1 ? (
                                        <Tooltip  visible style={{ borderRadius:7, background:'#5dd414', display:'flex', alignItems:'center' }}>Activo
                                            <BsFillCheckCircleFill style={{ marginLeft:5 }}/>
                                        </Tooltip>                                        
                                    ) : (
                                        <Tooltip  visible style={{ borderRadius:7, background:'#5dd414', display:'flex', alignItems:'center' }}>Inactivo
                                            <BsFillXCircleFill style={{ marginLeft:5 }}/>
                                        </Tooltip>
                                    )}
                                </>
                            )}
                        </Cell>
                    </Column>
                    <Column width={220} align="center"  resizable>
                        <HeaderCell style={{ background: "#16151A", color: "white", fontWeight: 'bold' }}>Usuario</HeaderCell>
                        <Cell dataKey="code" style={{alignItems:"center"}}>
                        </Cell>
                    </Column>
                    <Column width={180} align="center"  resizable>
                        <HeaderCell style={{ background: "#16151A", color: "white", fontWeight: 'bold' }}>Acciones</HeaderCell>
                        <Cell dataKey="code" style={{alignItems:"center"}}>
                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Eliminar</Tooltip>} >
                                <IconButton style={{ background:"transparent" }} icon={<FaTrash style={{ color:"red" }}/>} />
                            </Whisper>
                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Descargar</Tooltip>} >
                                <IconButton style={{ background:"transparent" }} icon={<FaDownload style={{ color:"red" }}/>} />
                            </Whisper>
                        </Cell>
                    </Column>
                </Table>
            </Panel>
            <Modal open={open} onClose={handleClose} size="sm" keyboard={false} style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
                <Modal.Header>
                    <Modal.Title style={{ fontWeight:"bold" }}>Crear Nuevo Reporte</Modal.Title>
                    <p style={{ color:'#878787' }}>Configura los parámetros para generar un nuevo reporte personalizado.</p>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display:'flex', justifyContent:'space-between', flexDirection:'column', marginBottom:8}}>
                        <div style={{ marginBottom:7 }}>
                            <strong>Nombre del reporte</strong>
                            <Input placeholder='Ej: Reporte de Inventario Mensual'></Input>
                        </div>
                        <div style={{ display:'flex', flexDirection:'row', gap:15, width: '100%'}}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
                                <strong>Tipo de reporte</strong>
                                <SelectPicker data={[]} block searchable={false} placeholder='Seleccionar tipo' />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
                                <strong>Formato</strong>
                                <SelectPicker data={[]} block searchable={false} placeholder='Seleccionar formato' /> 
                            </div>
                        </div>
                    </div>
                    <strong>Período</strong>
                    <div style={{ display:'flex', justifyContent:"space-between", flexDirection:"row", gap:15, }}>
                        <div style={{ flex:1 }}>
                            <p style={{ color:'#878787', fontSize:'13px'}}>Desde</p>
                            <DatePicker size="md" block placeholder="Seleccionar fecha" />
                        </div>
                        <div style={{ flex:1 }}>
                            <p style={{ color:'#878787', fontSize:'13px'}}>Hasta</p>
                            <DatePicker size="md" block placeholder="Seleccionar fecha"  />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button appearance='primary' >Generar Reporte</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}