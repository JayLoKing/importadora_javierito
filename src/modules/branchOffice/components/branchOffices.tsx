/* eslint-disable no-constant-binary-expression */

import { useEffect,useMemo ,useState } from "react";
import { FlexboxGrid, Col, Form, IconButton, Input, InputGroup, Pagination, Panel, Stack, Table, Tooltip, Whisper, SelectPicker } from "rsuite";
import { BranchOffice, GetDataBranchOffice } from "../models/branchOffice.model";
import { getBranchOfficesAsync2 } from "../services/branchOfficeService";
import BranchOfficeModal from "./branchOfficeModal";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import PlusIcon from '@rsuite/icons/Plus';
import "../styles/styles.css";
import Column from "rsuite/esm/Table/TableColumn";
import { Cell, HeaderCell } from "rsuite-table";
import { LuMapPinned } from "react-icons/lu";
import { useBranchOfficeTable } from "../hooks/useBranchOfficeTable";
import { useApi } from "../../../common/services/useApi";
import { BsEraserFill, BsFillCheckCircleFill, BsFillXCircleFill, BsWrenchAdjustable } from "react-icons/bs";
import { FaShop } from "react-icons/fa6";
import { BsBoxSeam } from "react-icons/bs";
import { PiBroomDuotone } from "react-icons/pi";
import { useBranchOfficeForm } from "../hooks/useBranchOfficeForm";

export default function BranchOffices() {

    const {limit, page, filterStatus,handleCountActiveAndInactive,setPage,handleChangeLimit, handleChangePage, handleFilterStatus,searchBranchOffice, handleClearSearch, handleSearch, filterStatusOptions} = useBranchOfficeTable();
    const fetchBranchOfficesAsync = useMemo(() => getBranchOfficesAsync2(limit,page,searchBranchOffice, filterStatus), [limit,page,searchBranchOffice, filterStatus]);
    const { data: dataBranchOffice, loading: loadingBranchOffice, fetch: fetchBranchOffices } = useApi<GetDataBranchOffice>(fetchBranchOfficesAsync, { autoFetch: true });
    const [branchOffices, setBranchOffices] = useState<BranchOffice[]>([]);
    const [total, setTotal] = useState(0);
    const {handleModalCreate, showModal}= useBranchOfficeForm();

    useEffect(() => {
        fetchBranchOffices();
    }, [fetchBranchOffices]);

    useEffect(() => {
        if(dataBranchOffice) {
            if(Array.isArray(dataBranchOffice)){
                setBranchOffices([]);
            } else {
                setBranchOffices(dataBranchOffice.first);
                setTotal(dataBranchOffice.second);
            }
        }
    }, [dataBranchOffice]);

    const { active, inactive } = handleCountActiveAndInactive(branchOffices);

    const handleRefreshData = () => {
        setPage(1); 
        fetchBranchOffices();   
    };

    return (
        <div style={{padding:30 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:15}}>
                <div>
                    <h4>Gestión de Sucursales</h4>
                    <p style={{ color:'#878787' }}>Crea sucursales y visualiza el inventario de cada sucursal</p>         
                </div>
                <div >
                    <IconButton appearance='primary' icon={<PlusIcon />} size="lg" onClick={() => handleModalCreate(true)}>
                        Nueva Sucursal
                    </IconButton>
                </div>
            </div>
            <div style={{ marginBottom: 15, gap:10, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <Form.Group style={{ flex: 1, minWidth: 200 }}>      
                    <InputGroup style={{ width: "100%" }}>
                        <InputGroup.Addon style={{background:"#16151A", color:"white"}}>
                            <FaSearch />
                        </InputGroup.Addon>
                        <Input placeholder="Buscar por sucursal, responsable y dirección" value={searchBranchOffice!} onChange={(value) => handleSearch(value)}/>
                        <Whisper placement="top" trigger="hover" speaker={<Tooltip>Limpiar buscador</Tooltip>}>
                            <IconButton icon={<BsEraserFill />} appearance="primary" style={{ background:'transparent', color:'black'}} ></IconButton>
                        </Whisper>
                    </InputGroup>
                </Form.Group>
                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Limpiar buscador</Tooltip>}>
                    <IconButton icon={<PiBroomDuotone/>} appearance="primary" onClick={handleClearSearch} ></IconButton>
                </Whisper>
                <SelectPicker value={filterStatus} label="Filtro" data={filterStatusOptions} searchable={false}  onChange={(value) => handleFilterStatus(value)}/>
            </div>
            
            <Panel bordered style={{ marginBottom:15 }}>
                <Table loading={loadingBranchOffice} bordered cellBordered style={{ background: "white", overflow: "hidden", borderRadius:"5px"}} rowHeight={80} height={380} headerHeight={50} data={branchOffices!} >
                    <Column align="center" flexGrow={1} minWidth={100} fixed resizable>
                        <HeaderCell style={{ background: "#16151A", color: "white", fontWeight: 'bold', fontSize: '14px' }}>Acciones</HeaderCell>
                        <Cell>
                            {(rowData) => (
                                <Stack spacing={6} justifyContent="center" alignItems="center" direction="row">
                                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Editar</Tooltip>}>
                                        <IconButton icon={<FaEdit style={{width:20, height:20}}/>} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary"
                                            onClick={() => {
                                                
                                            }} />
                                    </Whisper>
                                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Ver ubicación</Tooltip>}>
                                        <IconButton icon={<LuMapPinned style={{width:20, height:20, fontWeight:"bolder"}} />} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary" />
                                    </Whisper>
                                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Eliminar</Tooltip>}>
                                        <IconButton icon={<FaTrash style={{width:18, height:18}}/>} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary"
                                            onClick={() => {
                                                
                                            }} />
                                    </Whisper>
                                </Stack>
                            )}
                        </Cell>
                    </Column>

                    {false && (
                        <Column>
                            <HeaderCell>Id</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>
                    )}

                    <Column align="center" flexGrow={1} minWidth={140} resizable>
                        <HeaderCell style={{ background: "#16151A", color: "white", fontWeight: 'bold', fontSize: '14px' }}>Nombre de la Sucursal</HeaderCell>
                        <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="name" />
                    </Column>

                    <Column align="center" flexGrow={1} minWidth={120} resizable>
                        <HeaderCell style={{ background: "#16151A", color: "white", fontWeight: 'bold', fontSize: '14px' }}>Dirección</HeaderCell>
                        <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="address" />
                    </Column>

                    <Column align="center" flexGrow={1} minWidth={120} resizable>
                        <HeaderCell style={{ background: "#16151A", color: "white", fontWeight: 'bold', fontSize: '14px' }}>Responsable</HeaderCell>
                        <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="owner" />
                    </Column>

                    <Column align="center" flexGrow={1} minWidth={140} resizable>
                        <HeaderCell style={{ background: "#16151A", color: "white", fontWeight: 'bold', fontSize: '14px' }}>Fecha de Registro</HeaderCell>
                        <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                            {(rowData) => new Date(rowData.registerDate).toLocaleDateString()}
                        </Cell>
                    </Column>
                    
                    <Column align="center" flexGrow={1} minWidth={140} resizable>
                        <HeaderCell style={{ background: "#16151A", color: "white", fontWeight: 'bold', fontSize: '14px' }}>Estado</HeaderCell>
                        <Cell dataKey="status" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
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

                    <Column align="center" flexGrow={1} minWidth={100} resizable>
                        <HeaderCell style={{ background: "#16151A", color: "white", fontWeight: 'bold', fontSize: '14px' }}>Producto</HeaderCell>
                        <Cell>
                            <Stack spacing={6} justifyContent="center" alignItems="center" direction="row">
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Ver Productos</Tooltip>}>
                                    <IconButton icon={<BsBoxSeam style={{width:20, height:20, fontWeight:"bolder"}} />} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary" />
                                </Whisper>
                            </Stack>
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
                    total={total}
                    limit={limit}
                    activePage={page}
                    onChangePage={handleChangePage}
                    style={{marginTop:7}}
                    onChangeLimit={handleChangeLimit}
                    className="custom-pagination"
                />
            </Panel>

            <FlexboxGrid justify="space-between" >
                <FlexboxGrid.Item as={Col} colspan={24} md={8} style={{ marginBottom:10, flex:1}}>
                    <Panel bordered >
                        <div style={{ display:'flex', justifyContent:'space-between'}}>
                            <h5>Total de Sucursales</h5>
                            <FaShop style={{fontSize:'1.5em'}}/>
                        </div>
                        <h3 style={{ margin: '10px 0' }}>{total}</h3>
                        <small>{active} activas {inactive} inactivas</small>
                    </Panel>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={24} md={8}  style={{ marginBottom:10, flex:1}}>
                    <Panel bordered>
                        <div style={{ display:'flex', justifyContent:'space-between'}}>
                            <h5>Total de repuestos</h5>
                            <BsWrenchAdjustable style={{fontSize:'1.5em'}}/>
                        </div>
                        <h3 style={{ margin: '10px 0' }}>10</h3>
                        <small>Distribuidos en 4 sucursales</small>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
           <BranchOfficeModal open={showModal} onBranchOfficeCreated={handleRefreshData} hiddeModal={() => handleModalCreate(false)} />
            {/* <RemoveOfficeModal refreshList={loadBranchOffices} id={removeOffice.id} name={removeOffice.name} open={showModalDelete} hiddeModal={() => handleModalDelete(false)} /> */}
        </div>
    );
}