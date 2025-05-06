/* eslint-disable no-constant-binary-expression */
import PlusIcon from '@rsuite/icons/Plus';
import { useEffect, useMemo, useState } from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { IconButton, Input, InputGroup, Message, Pagination, Panel, SelectPicker, Stack, Table, Tooltip, Whisper,  } from "rsuite";
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
        setPage
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
            <Panel bordered style={{ marginBottom: 15 }}>
                <Stack spacing={2} justifyContent="space-between" >
                    <IconButton icon={<PlusIcon />} appearance="primary" onClick={() => handleOpenModalCreate(true)}> Nuevo Usuario </IconButton>
                    <Stack spacing={6}>
                        <SelectPicker label="Filtro" data={statusOptions} value={filterStatus} onChange={(value) => handleFilterStatus(value!)} searchable={false} placeholder="Estado"/>
                        <SelectPicker label="Filtro" data={roleOptions} value={filterRole} onChange={(value) => handleFilterRole(value!)} searchable={false} placeholder="Cargo"/>
                        <SelectPicker label="Filtro" data={branchOfficeOptions} value={filterOfficeId} onChange={(value) => handleFilterOfficeId(value!)} loading={loadingBranchOffice} searchable={false} placeholder="Sucursal"/>
                        <InputGroup style={{ width: 250 }}>
                            <InputGroup.Addon style={{background:"#f08b33", color:"white"}}>
                                <FaSearch />
                            </InputGroup.Addon>
                            <Input placeholder="Buscar usuario.." value={filterSomeName!} onChange={(value) => handleFilterSomeName(value) }/>
                        </InputGroup>
                    </Stack>
                </Stack>
            </Panel>
            <Panel bordered>
                <Table bordered cellBordered style={{ background: "white", fontSize:"15px", borderRadius:"5px" }} data={users} loading={loading} height={600} rowHeight={100} headerHeight={70}>
                    <Column align='center' flexGrow={1} minWidth={110} >
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Acciones</HeaderCell>
                        <Cell >
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Eliminar</Tooltip>}>
                                    <IconButton icon={<FaTrash />} appearance="ghost" style={{ color: 'black', border: 'Transparent', fontSize: '22px', padding: 5 }} />
                                </Whisper>
                                {/* <Whisper placement="top" trigger="hover" speaker={<Tooltip>Deshabilitar</Tooltip>}>
                                    <IconButton icon={<FaCircleMinus />} appearance="ghost" style={{ color: 'black', border: 'Transparent', fontSize: '23px', padding: 5 }} />
                                </Whisper>
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Habilitar</Tooltip>}>
                                    <IconButton icon={<FaCircleCheck />} appearance="ghost" style={{ color: 'black', border: 'Transparent', fontSize: '23px', padding: 5 }} />
                                </Whisper>   */}
                            </div>
                        </Cell>
                    </Column>
                    {false && (
                        <Column width={200} >
                            <HeaderCell>ID</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>
                    )}
                    <Column align="center" flexGrow={1} minWidth={140} >
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Estado</HeaderCell>
                        <Cell dataKey="status">
                            {(rowData) => (
                                <>
                                    {rowData.status === 1 ? (
                                        <Message showIcon type="success">Activo</Message>
                                    ) : (
                                        <Message showIcon type="error">Inactivo</Message>
                                    )}
                                </>
                            )}
                        </Cell>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={110}>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Usuario</HeaderCell>
                        <Cell dataKey="username"/>    
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={150}>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Cargo</HeaderCell>
                        <Cell dataKey="role"/>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={200}>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Nombre Completo</HeaderCell>
                        <Cell dataKey="fullname"/>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={160}>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Carnet de Identidad</HeaderCell>
                        <Cell dataKey="ci"/>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={150}>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Celular</HeaderCell>
                        <Cell dataKey="phone"/>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={270}>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Correo electrónico</HeaderCell>
                        <Cell dataKey="email"/>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={200}>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Sucursal</HeaderCell>
                        <Cell dataKey="office"/>
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
                    style={{marginTop: "5px"}}
                    />
            </Panel>
            <CreateUserModal open={showModalCreate} hiddeModal={() => handleOpenModalCreate(false)} onUserCreated={fetch} />
        </div>
    );
}