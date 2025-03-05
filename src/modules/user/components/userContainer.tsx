/* eslint-disable no-constant-binary-expression */
import PlusIcon from '@rsuite/icons/Plus';
import { useEffect, useMemo, useState } from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { IconButton, Input, InputGroup, Message, Pagination, SelectPicker, Stack, Table, Tooltip, Whisper,  } from "rsuite";
import { Cell, HeaderCell } from "rsuite-table";
import Column from "rsuite/esm/Table/TableColumn";
import CreateUserModal from './createUserModal';
import { useApi } from '../../../common/services/useApi';
import { getAllUsersAsync } from '../services/user.service';
import { User } from '../models/user.model';
import { useTableUser } from '../hooks/useTableUser';

export default function UserContainer(){
    const {searchTerm, handleSearch} = useTableUser();
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
  
    const handleChangeLimit = (dataKey: number) => {
      setPage(1);
      setLimit(dataKey);
    };
    const [showModalCreate, setShowModalCreate] = useState(false);
    const fetchUsers = useMemo(() => getAllUsersAsync(), []);
    const {data, loading, error, fetch} = useApi<User[]>(fetchUsers, {autoFetch: false});
    useEffect(() => { fetch() }, [fetch]);  
    console.log(data)
    function handleOpenModalCreate() {
        setShowModalCreate(true);
    }

    function handleCloseModalCreate() {
        setShowModalCreate(false);
    }

    const regex = useMemo(() => new RegExp(searchTerm, "i"), [searchTerm]);
    const filteredData = useMemo(() => {
        return data!.filter(user =>
            regex.test(user.role) ||
            regex.test(user.userName)
        );
    }, [data, regex]);

    const paginationLocaleES = {
        total: "Total de Registros: {0}",
        limit: "{0} / página",
        skip: "Ir a la página {0}",
        pager: {
          first: "Primero",
          last: "Último",
          next: "Siguiente",
          previous: "Anterior",
        },
    };


    if(error){
        return (
            <div style={{ padding: 35 }}>
                <h3>Ocurrió un error al cargar los usuarios</h3>
            </div>
        );
    }
    

    return(
        <div style={{ padding:35 }}>
            <Stack spacing={2} justifyContent="space-between" style={{ marginBottom: "25px" }}>
                <IconButton icon={<PlusIcon />} appearance="primary" onClick={() => handleOpenModalCreate()}> Nuevo Usuario </IconButton>
                <Stack spacing={6}>
                    <SelectPicker label="Filtro" data={[]} searchable={false} placeholder="Estado"/>
                    <SelectPicker label="Filtro" data={[]} searchable={false} placeholder="Cargo"/>
                    <SelectPicker label="Filtro" data={[]} searchable={false} placeholder="Sucursal"/>
                    <InputGroup style={{ width: 250 }}>
                        <Input placeholder="Buscar usuario.." value={searchTerm} onChange={(value) => handleSearch(value)}/>
                            <InputGroup.Addon style={{background:"#de7214", color:"white"}}>
                                <FaSearch />
                            </InputGroup.Addon>
                        </InputGroup>
                </Stack>
            </Stack>
            <>
                <Table bordered cellBordered style={{ background: "white", fontSize:"15px" }} data={filteredData} loading={loading} height={600} rowHeight={65} headerHeight={70}>
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
                        <Cell dataKey="userName"/>    
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={150}>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Cargo</HeaderCell>
                        <Cell dataKey="role"/>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={200}>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Nombre Completo</HeaderCell>
                        <Cell dataKey="fullName"/>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={160}>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Carnet de Identidad</HeaderCell>
                        <Cell dataKey="ci"/>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={150}>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Celular</HeaderCell>
                        <Cell dataKey="phone"/>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={200}>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Correo electrónico</HeaderCell>
                        <Cell dataKey="email"/>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={200}>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Sucursal</HeaderCell>
                        <Cell dataKey="branchOfficeID"/>
                    </Column>
                </Table>
                <div style={{ padding: 20 }}>
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
                    total={data!.length}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                    locale={paginationLocaleES}
                    />
                </div>
            </>
            <CreateUserModal open={showModalCreate} hiddeModal={handleCloseModalCreate} onUserCreated={fetch} />
        </div>
    );
}