import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { Input, InputGroup, Stack, IconButton, Table, Whisper, Tooltip, Panel, FlexboxGrid, Col } from "rsuite";
import { Cell, HeaderCell } from "rsuite-table";
import { BsEraserFill, BsFillTrash3Fill } from "react-icons/bs";
import Column from "rsuite/esm/Table/TableColumn";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function TrashTable (){
    
    const navigate = useNavigate();
    
    return(
        <div style={{padding:30}}>
            <Panel bordered style={{ marginBottom:15 }}>
                <Stack spacing={10} style={{ marginBottom: 20 }}>
                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Volver</Tooltip>}>
                        <IconButton icon={<FaArrowLeft style={{fontSize:"16px"}}/>} appearance="primary" style={{ backgroundColor: "transparent", color:"black"}} onClick={()=> navigate('/items')}/>
                    </Whisper>
                    <div>
                        <h4>Repuestos Eliminados</h4>
                        <p style={{ color:'#878787' }}>Visualiza los repuestos eliminados y recuperalos </p>
                    </div>
                </Stack>
                <div style={{ marginBottom: 15, gap:10, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <InputGroup style={{ flex: 1, minWidth: 200 }}>
                        <InputGroup.Addon style={{background:"#16151A", color:"white"}}>
                            <FaSearch />
                        </InputGroup.Addon>
                        <Input placeholder="Buscar repuesto.." />
                        <Whisper placement="top" trigger="hover" speaker={<Tooltip>Limpiar buscador</Tooltip>}>
                            <IconButton icon={<BsEraserFill />} appearance="primary" style={{ background:'transparent', color:'black'}} ></IconButton>
                        </Whisper>
                    </InputGroup>
                </div>
                <Table bordered cellBordered style={{ background: "white", overflow: "hidden", borderRadius:"5px"}} rowHeight={80} height={380} headerHeight={50} >
                    <Column align="center" width={140} minWidth={120} fixed resizable>
                        <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '14px' }}>Acciones</HeaderCell>
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

                    <Column align="center" flexGrow={1} minWidth={200} resizable>
                        <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '14px' }}>Repuesto</HeaderCell>
                        <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="name" />
                    </Column>

                    <Column align="center" width={180} minWidth={160} resizable>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '14px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Descripción</HeaderCell>
                        <Cell dataKey="description" style={{ whiteSpace: "normal", wordBreak: "break-word", textAlign:"center", display: "flex", justifyContent: "center", alignItems: "center",}}/>
                    </Column>

                    <Column align="center" width={140} minWidth={130} resizable>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '14px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Modelo</HeaderCell>
                        <Cell dataKey="model" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} />
                    </Column>
                            
                    <Column align="center" width={140} minWidth={130} resizable>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '14px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Marca</HeaderCell>
                        <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="brand" />
                    </Column>
                            
                    <Column align="center" width={140} minWidth={130} resizable>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '14px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Categoría</HeaderCell>
                        <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="category" />
                    </Column>
                            
                    <Column align="center" width={150} minWidth={140} resizable>
                        <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '14px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Sub-Categoría</HeaderCell>
                        <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="subCategory" />
                    </Column>

                    <Column align="center" flexGrow={1} minWidth={120} resizable>
                        <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '14px' }}>Usuario</HeaderCell>
                        <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="address" />
                    </Column>
    
                    <Column align="center" width={160} minWidth={150} resizable>
                        <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '14px' }}>Fecha de acción</HeaderCell>
                        <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        </Cell>
                    </Column>
                </Table>
            </Panel>
            <FlexboxGrid justify="space-between" >
                <FlexboxGrid.Item as={Col} colspan={24} md={8}  style={{ marginBottom:10, flex:1}}>
                    <Panel bordered>
                        <div style={{ display:'flex', justifyContent:'space-between'}}>
                            <h5>Repuestos Eliminados</h5>
                            <BsFillTrash3Fill style={{fontSize:'1.5em'}}/>
                        </div>
                        <h3 style={{ margin: '10px 0' }}>4</h3>
                        <small>Total de repuestos eliminados</small>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    )
}