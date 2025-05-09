/* eslint-disable no-constant-binary-expression */
import PlusIcon from '@rsuite/icons/Plus';
import { useEffect, useMemo, useState } from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { Col, FlexboxGrid, IconButton, Input, InputGroup, Pagination, Panel, SelectPicker, Table, Tooltip, Whisper,  } from "rsuite";
import { Cell, HeaderCell } from "rsuite-table";
import Column from "rsuite/esm/Table/TableColumn";
import CreateUserModal from './createUserModal';
import { useApi } from '../../../common/services/useApi';
import { getAllUsersAsync } from '../services/user.service';
import { GetUsers, User } from '../models/user.model';
import { BranchOffice, GetDataBranchOffice } from '../../branchOffice/models/branchOffice.model';
import { getBranchOfficesAsync2 } from '../../branchOffice/services/branchOfficeService';
import { useTableUser } from '../hooks/useTableUser';
import { useRegisterUserForm } from '../hooks/useRegisterUserForm';
import { BsFillPersonCheckFill, BsFillPersonDashFill, BsFillCheckCircleFill, BsFillXCircleFill, BsEraserFill } from "react-icons/bs";

export default function UserContainer(){
    const [users, setUsers] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [branchOffices, setBranchOffices] = useState<BranchOffice[]>([]);
    const {
        statusOptions, 
        limit,
        roleOptions, 
        handleFilterStatus, 
        handleFilterRole, 
        handleFilterSomeName, 
        handleFilterOfficeId,
        filterOfficeId,
        filterRole,
        filterSomeName,
        filterStatus,
        handleChangeLimit,
        page,
        setPage,
        handleClearSearch,
    } = useTableUser();
    const {
        handleOpenModalCreate,
        showModalCreate
    } = useRegisterUserForm();

    const fetchBranchOfficesAsync = useMemo(() => getBranchOfficesAsync2(100,1,"",1), []);
    const { data: dataBranchOffice, loading: loadingBranchOffice, fetch: fetchBranchOffices } = useApi<GetDataBranchOffice>(fetchBranchOfficesAsync, { autoFetch: true });


    const fetchUsers = useMemo(() => {
        return getAllUsersAsync(limit, page, filterStatus, filterRole, filterOfficeId, filterSomeName)
    }, [limit, page, filterStatus, filterRole, filterOfficeId, filterSomeName]);
    const {data, loading, error, fetch} = useApi<GetUsers>(fetchUsers, {autoFetch: true});
    useEffect(() => { fetch() }, [fetch, page, limit, filterStatus, filterRole, filterOfficeId, filterSomeName]);  
    useEffect(() => {
        if (data) {
            if (Array.isArray(data)) {
                setUsers([]); 
            } else {
                setUsers(data.first);
                setTotal(data.second); 
            }
        } 
        if(dataBranchOffice) {
            if(Array.isArray(dataBranchOffice)){
                setBranchOffices([]);
            } else {
                setBranchOffices(dataBranchOffice.first);
                setTotal(dataBranchOffice.second);
            }
        }
        fetchBranchOffices();
    }, [data, fetchBranchOffices,dataBranchOffice]); 
    const branchOfficeOptions = branchOffices?.map(branch => ({ label: branch.name, value: branch.id })) || [];
    console.log(users);

    if(error){
        return (
            <div style={{ padding: 35 }}>
                <h3>Ocurrió un error al cargar los usuarios</h3>
            </div>
        );
    }
    
    return(
        <div style={{ padding:30 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:15}}>
                <div>
                    <h4>Gestión de Usuarios</h4>
                    <p style={{ color:'#878787' }}>Administra los usuarios del sistema</p>         
                </div>
                <div >
                    <IconButton appearance='primary' icon={<PlusIcon />} size="lg"  onClick={() => handleOpenModalCreate(true)}>
                        Nuevo Usuario
                    </IconButton>
                </div>
            </div>
            <div style={{ display:'flex', marginBottom:15, justifyContent:'space-between', gap:15}}>
                <InputGroup style={{ flex:1 }}>
                    <InputGroup.Addon style={{background:"#16151A", color:"white"}}>
                        <FaSearch />
                    </InputGroup.Addon>
                    <Input placeholder="Buscar por usuario y nombre completo.." value={filterSomeName!} onChange={(value) => handleFilterSomeName(value) }/>
                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Limpiar buscador</Tooltip>}>
                        <IconButton icon={<BsEraserFill />} style={{ background:'transparent', color:'black'}} onClick={handleClearSearch}></IconButton>
                    </Whisper>
                </InputGroup>
                <div style={{ display:'flex', gap:10}}>
                    <SelectPicker label="Filtro" data={statusOptions} value={filterStatus} onChange={(value) => handleFilterStatus(value!)} searchable={false} placeholder="Estado"/>
                    <SelectPicker label="Filtro" data={roleOptions} value={filterRole} onChange={(value) => handleFilterRole(value!)} searchable={false} placeholder="Cargo"/>
                    <SelectPicker label="Filtro" data={branchOfficeOptions} value={filterOfficeId} onChange={(value) => handleFilterOfficeId(value!)} loading={loadingBranchOffice} searchable={false} placeholder="Sucursal"/>
                </div>
            </div>
            
            <Panel bordered style={{ marginBottom:15 }}>
                <Table bordered cellBordered style={{ background: "white", fontSize:"14px", borderRadius:"5px" }} data={users} loading={loading} height={380} rowHeight={80} headerHeight={50}>
                    <Column align='center' width={100} fixed resizable>
                        <HeaderCell style={{backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize: '14px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Acciones</HeaderCell>
                        <Cell >
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Eliminar</Tooltip>}>
                                    <IconButton icon={<FaTrash />} appearance="ghost" style={{ color: 'black', border: 'Transparent', fontSize: '22px', padding: 5 }} />
                                </Whisper>
                            </div>
                        </Cell>
                    </Column>
                    {false && (
                        <Column width={200} >
                            <HeaderCell>ID</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>
                    )}
                    <Column align="center" flexGrow={1} minWidth={140} resizable>
                        <HeaderCell style={{backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize: '14px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Estado</HeaderCell>
                        <Cell dataKey="status" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                            {(rowData) => (
                                <>
                                    {rowData.status === 1 ? (
                                        <Tooltip  visible style={{ borderRadius:7, background:'#5dd414', display:'flex', alignItems:'center' }}>ACTIVO
                                            <BsFillCheckCircleFill style={{ marginLeft:5 }}/>
                                        </Tooltip>                                        
                                    ) : (
                                        <Tooltip  visible style={{ borderRadius:7, background:'#cf2601', display:'flex', alignItems:'center' }}>INACTIVO
                                            <BsFillXCircleFill style={{ marginLeft:5 }}/>
                                        </Tooltip>
                                    )}
                                </>
                            )}
                        </Cell>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={110} resizable>
                        <HeaderCell style={{backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize: '14px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Usuario</HeaderCell>
                        <Cell dataKey="username" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}/>    
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={150} resizable>
                        <HeaderCell style={{backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize: '14px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Cargo</HeaderCell>
                        <Cell dataKey="role" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}/>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={200} resizable>
                        <HeaderCell style={{backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize: '14px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Nombre Completo</HeaderCell>
                        <Cell dataKey="fullname" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}/>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={180} resizable>
                        <HeaderCell style={{backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize: '14px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Carnet de Identidad</HeaderCell>
                        <Cell dataKey="ci" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}/>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={150} resizable>
                        <HeaderCell style={{backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize: '14px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Celular</HeaderCell>
                        <Cell dataKey="phone" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}/>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={270} resizable>
                        <HeaderCell style={{backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize: '14px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Correo electrónico</HeaderCell>
                        <Cell dataKey="email" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}/>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={200} resizable>
                        <HeaderCell style={{backgroundColor: "#16151A", color:"white", fontWeight: "bold", fontSize: '14px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Sucursal</HeaderCell>
                        <Cell dataKey="office" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}/>
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
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                    style={{ marginTop:7 }}
                    className="custom-pagination"
                    />
            </Panel>
            <FlexboxGrid justify="space-between" >
                <FlexboxGrid.Item as={Col} colspan={24} md={8} style={{ marginBottom:10, flex:1}}>
                    <Panel bordered >
                        <div style={{ display:'flex', justifyContent:'space-between'}}>
                            <h5>Total de Usuarios</h5>
                            <BsFillPersonCheckFill style={{fontSize:'1.5em'}}/>
                        </div>
                        <h3 style={{ margin: '10px 0' }}>{total}</h3>
                        <small>Total de usuarios registrados</small>
                    </Panel>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={24} md={8} style={{ marginBottom:10, flex:1}}>
                    <Panel bordered >
                        <div style={{ display:'flex', justifyContent:'space-between'}}>
                            <h5>Usuarios Activos</h5>
                            <BsFillPersonCheckFill style={{fontSize:'1.5em'}}/>
                        </div>
                        <h3 style={{ margin: '10px 0' }}>10</h3>
                        <small>Total de Usuarios Activos</small>
                    </Panel>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item as={Col} colspan={24} md={8}  style={{ marginBottom:10, flex:1}}>
                    <Panel bordered>
                        <div style={{ display:'flex', justifyContent:'space-between'}}>
                            <h5>Usuarios Inactivos</h5>
                            <BsFillPersonDashFill style={{fontSize:'1.5em'}}/>
                        </div>
                        <h3 style={{ margin: '10px 0' }}>4</h3>
                        <small>Total de Usuarios Inactivos</small>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <CreateUserModal open={showModalCreate}  hiddeModal={() => handleOpenModalCreate(false)} onUserCreated={fetch} />
        </div>
    );
}