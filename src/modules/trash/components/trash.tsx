import { FaSearch, FaSync, FaTrash } from "react-icons/fa";
import { Input, InputGroup, Stack, IconButton, Heading, Table, Whisper, Tooltip } from "rsuite";
import { Cell, HeaderCell } from "rsuite-table";
import Column from "rsuite/esm/Table/TableColumn";


export default function TrashTable (){
    return(
        <div style={{padding:25, overflowX: "auto",flex: 1, display: "flex", flexDirection: "column"}}>
            <Stack direction="row" justifyContent="center" alignItems="center"><Heading level={3} style={{marginTop:"-7px", color:"black"}}>Lista de la Papelera</Heading></Stack>
            <Stack spacing={2} justifyContent="space-between" style={{marginBottom: "20px", marginTop:"-4px"}}>
                <InputGroup style={{ width: 250 }}>
                    <Input placeholder="Buscar en la papelera..." />
                        <InputGroup.Addon>
                            <FaSearch />
                        </InputGroup.Addon>
                </InputGroup>
            </Stack>
            <Table style={{ background: "white", overflow: "hidden" }} height={600} headerHeight={60} rowHeight={65}>
                <Column align="center" flexGrow={1} minWidth={100}>
                    <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '15px' }}>Acciones</HeaderCell>
                    <Cell>
                        <Stack spacing={6} justifyContent="center" alignItems="center" direction="row">
                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Recuperar</Tooltip>}>
                                <IconButton  icon={<FaSync style={{width:22, height:22}}/>} style={{ width: 40, background:"transparent", color:"green"}} appearance="primary" />
                            </Whisper>
                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Eliminar Item</Tooltip>}>
                                <IconButton icon={<FaTrash style={{width:20, height:20}}/>} style={{ width: 40,  background:"transparent", color:"red" }} appearance="primary" />
                            </Whisper>                                      
                        </Stack>
                    </Cell>
                </Column>
                
            </Table>
        </div>

    )
}