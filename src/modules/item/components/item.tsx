import {Loader, Stack, IconButton, Table, Whisper, Tooltip, Pagination, Input} from "rsuite";
import { FetchDataAsync } from "../services/itemService";
import PlusIcon from '@rsuite/icons/Plus';
import {FaEdit, FaTrash} from "react-icons/fa";
import { GetItems } from "../models/item.model";
import { ItemRegisterForm } from "../hooks/useItemForm";
import ItemForm from "./item_form";

const { Column, HeaderCell, Cell } = Table;

const urlFetchItem = "/items/getAllItems";


export default function Item() {
    const { data, loading } = FetchDataAsync<GetItems[]>(urlFetchItem);
    const {handleModal, showModal, limit, page, setPage, handleChangeLimit, searchTerm, setSearchTerm} = ItemRegisterForm();

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
            <img src="https://www.rionegro.com.ar/wp-content/uploads/2020/11/Billie-Eilish.jpg" width="40" />
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

    return (
        <div style={{padding:25}}>
                <Stack spacing={2} justifyContent="space-between" style={{marginBottom: "5px", marginTop:"-4px"}}>
                    <IconButton
                        icon={<PlusIcon />}
                        appearance="primary"
                        onClick={() => handleModal(true)}
                    >
                        Nuevo Repuesto
                    </IconButton>
                    <Input
                        placeholder="Buscar repuesto..."
                        value={searchTerm}
                        onChange={setSearchTerm}
                        style={{ width: 250 }}
                    />
                </Stack>
                {filteredData.length > 0 ? (
                   <>
                    <Table style={{borderRadius:"15px", background: "white"}} height={750} data={controlData} rowHeight={65} onRowClick={rowData => console.log(rowData)} headerHeight={60} >
                        <Column align="center" flexGrow={1} minWidth={100}>
                            <HeaderCell>...</HeaderCell>
                            <Cell>
                                <Stack spacing={6} justifyContent="center" alignItems="center" direction="row">
                                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Editar</Tooltip>}>
                                        <IconButton icon={<FaEdit />} style={{ width: 40, margin: 3 }} appearance="primary" />
                                    </Whisper>
                                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Eliminar</Tooltip>}>
                                        <IconButton icon={<FaTrash />} style={{ width: 40, margin: 3 }} appearance="primary" />
                                    </Whisper>
                                </Stack>
                            </Cell>
                        </Column>
                        
                        <Column align="center" flexGrow={1} minWidth={140}>
                            <HeaderCell style={{fontWeight: "bold", whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Nombre del Repuesto</HeaderCell>
                            <Cell dataKey="name" />
                        </Column>
                    
                        <Column align="center" flexGrow={1} minWidth={150}>
                            <HeaderCell style={{fontWeight: "bold", whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Descripción</HeaderCell>
                            <Cell dataKey="description" />
                        </Column>
                    
                        <Column align="center" flexGrow={1} minWidth={150}>
                            <HeaderCell style={{fontWeight: "bold", whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Modelo</HeaderCell>
                            <Cell dataKey="model" />
                        </Column>
                    
                        <Column align="center" flexGrow={1} minWidth={80}>
                            <HeaderCell style={{fontWeight: "bold", whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Precio</HeaderCell>
                            <Cell>{rowData => (<span style={{ color: "green", fontWeight: "bold" }}>Bs. {rowData.price}</span>)}</Cell>
                        </Column>
                    
                        <Column align="center" flexGrow={1} minWidth={120}>
                            <HeaderCell style={{fontWeight: "bold", whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Precio por mayor</HeaderCell>
                            <Cell>{rowData => (<span style={{ color: "green", fontWeight: "bold" }}>Bs. {rowData.wholesalePrice}</span>)}</Cell>
                        </Column>
                    
                        <Column align="center" flexGrow={1} minWidth={100}>
                            <HeaderCell style={{fontWeight: "bold", whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Precio Base</HeaderCell>
                            <Cell>{rowData => (<span style={{ color: "green", fontWeight: "bold" }}>Bs. {rowData.barePrice}</span>)}</Cell>
                        </Column>
                    
                        <Column align="center" flexGrow={1} minWidth={100}>
                            <HeaderCell style={{fontWeight: "bold", whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Marca</HeaderCell>
                            <Cell dataKey="brand" />
                        </Column>
                    
                        <Column align="center" flexGrow={1} minWidth={120}>
                            <HeaderCell style={{fontWeight: "bold", whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Categoría</HeaderCell>
                            <Cell dataKey="category" />
                        </Column>
                    
                        <Column align="center" flexGrow={1} minWidth={120}>
                            <HeaderCell style={{fontWeight: "bold", whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Sub-Categoría</HeaderCell>
                            <Cell dataKey="subCategory" />
                        </Column>
                    
                        <Column align="center" flexGrow={1} minWidth={140}>
                            <HeaderCell style={{fontWeight: "bold", whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Fecha de Fabricación</HeaderCell>
                            <Cell dataKey="dateManufacture" />
                        </Column>
                    
                        <Column align="center" flexGrow={1} minWidth={150}>
                            <HeaderCell style={{fontWeight: "bold", whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Ubicación del Repuesto</HeaderCell>
                            <Cell dataKey="address" />
                        </Column>
                    
                        <Column align="center" flexGrow={1} minWidth={100}>
                            <HeaderCell style={{fontWeight: "bold", whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Cantidad Total</HeaderCell>
                            <Cell dataKey="totalStock" />
                        </Column>
                    
                        <Column align="center" flexGrow={1} minWidth={150}>
                            <HeaderCell style={{fontWeight: "bold", whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Imagen del Repuesto</HeaderCell>
                            <ImageCell dataKey="itemImage" />
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
}