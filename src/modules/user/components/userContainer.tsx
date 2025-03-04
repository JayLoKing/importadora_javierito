/* eslint-disable no-constant-binary-expression */
import PlusIcon from '@rsuite/icons/Plus';
import { useState } from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { IconButton, Input, InputGroup, SelectPicker, Stack, Table, Tooltip, Whisper,  } from "rsuite";
import { Cell, HeaderCell } from "rsuite-table";
import Column from "rsuite/esm/Table/TableColumn";
import CreateUserModal from './createUserModal';

export default function UserContainer(){
    const [showModalCreate, setShowModalCreate] = useState(false);

    function handleOpenModalCreate() {
        setShowModalCreate(true);
    }

    function handleCloseModalCreate() {
        setShowModalCreate(false);
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
                        <Input placeholder="Buscar repuesto..."/>
                            <InputGroup.Addon style={{background:"#de7214", color:"white"}}>
                                <FaSearch />
                            </InputGroup.Addon>
                        </InputGroup>
                </Stack>
            </Stack>
            <>
                <Table bordered cellBordered style={{ background: "white", fontSize:"15px" }} height={600} rowHeight={65} headerHeight={65}>
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
                            <Cell dataKey="userID" />
                        </Column>
                    )}
                    <Column align="center" flexGrow={1} minWidth={140} >
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Estado</HeaderCell>
                        <Cell dataKey="status">
                            //Agregar un mensaje como en mosquito lab
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
            </>
            <CreateUserModal open={showModalCreate} hiddeModal={handleCloseModalCreate} />
        </div>
    );
}