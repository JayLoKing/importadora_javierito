import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { Input, InputGroup, Stack, IconButton, Table, Whisper, Tooltip } from "rsuite";
import { Cell, HeaderCell } from "rsuite-table";
import Column from "rsuite/esm/Table/TableColumn";


export default function TrashTable (){
    return(
        <div style={{padding:35}}>
            <Stack spacing={2} justifyContent="space-between" style={{ marginBottom: "25px" }}>
                {/* <IconButton icon={<PlusIcon />} appearance="primary" > Recuperar </IconButton> */}
                <Stack spacing={6}>
                    <InputGroup style={{ width: 250 }}>
                        <Input placeholder="Buscar.." />
                            <InputGroup.Addon style={{background:"#de7214", color:"white"}}>
                                <FaSearch />
                            </InputGroup.Addon>
                        </InputGroup>
                </Stack>
            </Stack>

            <Table bordered cellBordered style={{ background: "white", overflow: "hidden", }} rowHeight={100} height={600} headerHeight={70} >
                <Column align="center" flexGrow={1} minWidth={120}>
                    <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '15px' }}>Acciones</HeaderCell>
                    <Cell>
                            <Stack spacing={6} justifyContent="center" alignItems="center" direction="row">
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Recuperar</Tooltip>}>
                                    <IconButton icon={<FaEdit style={{width:20, height:20}}/>} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary" />
                                </Whisper>
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Eliminar</Tooltip>}>
                                    <IconButton icon={<FaTrash style={{width:18, height:18}}/>} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary" />
                                </Whisper>
                            </Stack>
                    </Cell>
                </Column>

                {false && (
                    <Column>
                        <HeaderCell>Id</HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                )}

                <Column align="center" flexGrow={1} minWidth={140}>
                    <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '15px' }}>Repuesto</HeaderCell>
                    <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="name" />
                </Column>

                <Column align="center" flexGrow={2} minWidth={150} >
                    <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Descripción</HeaderCell>
                    <Cell dataKey="description" style={{ whiteSpace: "normal", wordBreak: "break-word", textAlign:"center", display: "flex", justifyContent: "center", alignItems: "center",}}/>
                </Column>

                <Column align="center" flexGrow={1} minWidth={150}>
                    <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Modelo</HeaderCell>
                    <Cell dataKey="model" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} />
                </Column>
                        
                <Column align="center" flexGrow={1} minWidth={100}>
                    <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Marca</HeaderCell>
                    <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="brand" />
                </Column>
                        
                <Column align="center" flexGrow={1} minWidth={120}>
                    <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Categoría</HeaderCell>
                    <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="category" />
                </Column>
                        
                <Column align="center" flexGrow={1} minWidth={120}>
                    <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Sub-Categoría</HeaderCell>
                    <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="subCategory" />
                </Column>

                <Column align="center" flexGrow={1} minWidth={120}>
                    <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '15px' }}>Usuario</HeaderCell>
                    <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="address" />
                </Column>
 
                <Column align="center" flexGrow={1} minWidth={140}>
                    <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '15px' }}>Fecha de acción</HeaderCell>
                    <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                    </Cell>
                </Column>
            </Table>
        </div>
    )
}