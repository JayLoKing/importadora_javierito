import {Loader, Stack, IconButton, Table, Whisper, Tooltip, Pagination, Input,Text, Heading, InputGroup} from "rsuite";
import { FetchDataAsync } from "../services/itemService";
import PlusIcon from '@rsuite/icons/Plus';
import {FaBarcode, FaEdit, FaSearch, FaSync, FaTrash} from "react-icons/fa";
import { GetItems } from "../models/item.model";
import { ItemRegisterForm } from "../hooks/useItemForm";
import ItemForm from "./item_form";

const { Column, HeaderCell, Cell } = Table;

const urlFetchItem = "/items/getAllItems";


export default function Item() {
    const { data, loading } = FetchDataAsync<GetItems[]>(urlFetchItem);
    const {handleModal, showModal, limit, page, setPage, handleChangeLimit, searchTerm, setSearchTerm, isMobile} = ItemRegisterForm();

    const regex = new RegExp(searchTerm, "i"); 

    const filteredData = data.filter(item =>
        regex.test(item.name) ||
        regex.test(item.description) ||
        regex.test(item.model) ||
        regex.test(item.brand) ||
        regex.test(item.category)
    );

    const controlData = filteredData.filter((_,i) => {
        const start = limit * (page -1);
        const end = start + limit;
        return i >= start && i < end;
    });

    const localeES = {
        total: "Total de filas: {0}",
        limit: "{0} / página",
        skip: "Ir a la página {0}",
        pager: {
          first: "Primero",
          last: "Último",
          next: "Siguiente",
          previous: "Anterior",
        },
      };

    const ImageCell = ({ dataKey, ...props }: { dataKey: string }) => (
        <Cell {...props} style={{ padding: 0 }}>
          <div
            style={{
              width: 40,
              height: 40,
              background: '#f5f5f5',
              borderRadius: 6,
              marginTop: 2,
              overflow: 'hidden',
              display: 'inline-block'
            }}
          >
            <img src={dataKey} width="40" />
          </div>
        </Cell>
      );


    if (loading) {
        return (
            <Stack justifyContent="center" alignItems="center" direction="column">
                    <Loader content="Cargando..." vertical />
            </Stack>
        );
    }

    // if (error) {
    //     return (
    //         <><Text color="red">Ups! Ocurrio un error: {error.message}</Text></>
    //     );
    // }

    if(!isMobile){
        return (
            <div style={{padding:25, overflowX: "auto"}}>
                    <Stack direction="row" justifyContent="center" alignItems="center"><Heading level={3} style={{marginTop:"-7px", color:"black"}}>Lista de Repuestos</Heading></Stack>
                    <Stack spacing={2} justifyContent="space-between" style={{marginBottom: "20px", marginTop:"-4px"}}>
                        <InputGroup style={{ width: 250 }}>
                            <Input placeholder="Buscar repuesto..." value={searchTerm} onChange={setSearchTerm}/>
                                <InputGroup.Addon>
                                    <FaSearch />
                                </InputGroup.Addon>
                            </InputGroup>
                            <IconButton icon={<PlusIcon />} appearance="primary" onClick={() => handleModal(true)}> Nuevo Repuesto </IconButton>
                    </Stack>
                    {filteredData.length > 0 ? (
                       <>
                        <Table style={{borderRadius:"15px", background: "white", fontSize:"15px"}} height={610} data={controlData} rowHeight={65} onRowClick={rowData => console.log(rowData)} headerHeight={65}>
                            <Column align="center" flexGrow={3.7} minWidth={130}>
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Acciones</HeaderCell>
                                <Cell>
                                    <Stack spacing={6} justifyContent="center" alignItems="center" direction="row">
                                        <Whisper placement="top" trigger="hover" speaker={<Tooltip>Editar</Tooltip>}>
                                            <IconButton icon={<FaEdit style={{width:22, height:22}}/>} style={{ width: 40, background:"transparent", color:"#f08b33"}} appearance="primary" />
                                        </Whisper>
                                        <Whisper placement="top" trigger="hover" speaker={<Tooltip>Eliminar</Tooltip>}>
                                            <IconButton icon={<FaTrash style={{width:20, height:20}}/>} style={{ width: 40,  background:"transparent", color:"red" }} appearance="primary" />
                                        </Whisper>
                                        <Whisper placement="top" trigger="hover" speaker={<Tooltip>Actualizar Stock</Tooltip>}>
                                            <IconButton icon={<FaSync style={{width:20, height:20}}/>} style={{ width: 40, background:"transparent", color:"green" }} appearance="primary" />
                                        </Whisper>
                                        <Whisper placement="top" trigger="hover" speaker={<Tooltip>Codigo de Barra</Tooltip>}>
                                            <IconButton icon={<FaBarcode style={{width:20, height:20}}/>} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary" />
                                        </Whisper>
                                    </Stack>
                                </Cell>
                            </Column>
                            {false && (
                                <Column width={200} resizable>
                                    <HeaderCell>ID</HeaderCell>
                                    <Cell dataKey="itmID" />
                                </Column>
                            )}
                            <Column align="center" flexGrow={1} minWidth={140}>
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Nombre del Repuesto</HeaderCell>
                                <Cell dataKey="name" />
                            </Column>
                        
                            <Column align="center" flexGrow={2} minWidth={150}>
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Descripción</HeaderCell>
                                <Cell dataKey="description" style={{ whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}/>
                            </Column>
                        
                            <Column align="center" flexGrow={1} minWidth={150}>
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Modelo</HeaderCell>
                                <Cell dataKey="model" />
                            </Column>
                        
                            <Column align="center" flexGrow={1} minWidth={80}>
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Precio</HeaderCell>
                                <Cell>{rowData => (<span style={{ color: "green", fontWeight: "bold" }}>Bs. {rowData.price}</span>)}</Cell>
                            </Column>
                        
                            <Column align="center" flexGrow={1} minWidth={120}>
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Precio por mayor</HeaderCell>
                                <Cell>{rowData => (<span style={{ color: "green", fontWeight: "bold" }}>Bs. {rowData.wholesalePrice}</span>)}</Cell>
                            </Column>
                        
                            <Column align="center" flexGrow={1} minWidth={100}>
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Precio Base</HeaderCell>
                                <Cell>{rowData => (<span style={{ color: "green", fontWeight: "bold" }}>Bs. {rowData.barePrice}</span>)}</Cell>
                            </Column>
                        
                            <Column align="center" flexGrow={1} minWidth={100}>
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Marca</HeaderCell>
                                <Cell dataKey="brand" />
                            </Column>
                        
                            <Column align="center" flexGrow={1} minWidth={120}>
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Categoría</HeaderCell>
                                <Cell dataKey="category" />
                            </Column>
                        
                            <Column align="center" flexGrow={1} minWidth={120}>
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Sub-Categoría</HeaderCell>
                                <Cell dataKey="subCategory" />
                            </Column>
                        
                            <Column align="center" flexGrow={1} minWidth={140}>
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Fecha de Fabricación</HeaderCell>
                                <Cell dataKey="dateManufacture" />
                            </Column>
                        
                            <Column align="center" flexGrow={1} minWidth={150}>
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Ubicación del Repuesto</HeaderCell>
                                <Cell dataKey="address" />
                            </Column>
                        
                            <Column align="center" flexGrow={1} minWidth={100}>
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Cantidad Total</HeaderCell>
                                <Cell dataKey="totalStock" />
                            </Column>
                        
                            <Column align="center" flexGrow={1} minWidth={150}>
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Imagen del Repuesto</HeaderCell>
                                <ImageCell dataKey="itemImage" />
                            </Column>
                            {/* <Column align="center" flexGrow={1} minWidth={100}>
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Operaciones Stock</HeaderCell>
                                <Cell>
                                    <Stack spacing={6} justifyContent="center" alignItems="center" direction="row">
                                        
                                    </Stack>
                                </Cell>
                            </Column> */}
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
                            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                            total={data.length}
                            limitOptions={[10, 30, 50]}
                            limit={limit}
                            activePage={page}
                            onChangePage={setPage}
                            onChangeLimit={handleChangeLimit}
                            locale={localeES}
                            style={{marginTop: "5px"}}
                            />
                       </>
                    
                    ) : (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            No se encontraron registros
                        </div>
                    )}
                    <ItemForm open={showModal} hiddeModal={() => handleModal(false)} />
            </div>
        );   
    } else {
        return (
            <div style={{padding:25,}}>
                    <Stack direction="row" justifyContent="center" alignItems="center"><Heading level={2} style={{marginTop:"-7px"}}>Lista de Repuestos</Heading></Stack>
                    <Stack spacing={2} justifyContent="space-between" style={{marginBottom: "5px", marginTop:"-4px", width:"100%", height:"100%"}}>
                                {!isMobile ? (
                                       <InputGroup style={{ width: 250 }}>
                                       <Input placeholder="Buscar repuesto..." value={searchTerm} onChange={setSearchTerm}/>
                                       <InputGroup.Addon>
                                           <FaSearch />
                                       </InputGroup.Addon>
                                   </InputGroup>
                                   
                                ): (
                                    <IconButton
                                    icon={<PlusIcon />}
                                    appearance="primary"
                                    onClick={() => handleModal(true)}
                                    >
                                    Nuevo Repuesto
                                </IconButton>
                                )}
                                   
                    </Stack>
                    {filteredData.length > 0 ? (
                       <>
                        <Text>Cargar lista en cards aqui para moviles</Text>
                       </>
                    
                    ) : (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            No se encontraron registros
                        </div>
                    )}
                    <ItemForm open={showModal} hiddeModal={() => handleModal(false)} />
            </div>
        );   
    }

     
}