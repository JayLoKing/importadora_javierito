import {Loader, Stack, IconButton, Image,Table, Whisper, Tooltip, Pagination, Input,Text, Heading, InputGroup, Grid, Row, Col, Card, InlineEdit} from "rsuite";
import { getAsyncItems } from "../services/itemService";
import PlusIcon from '@rsuite/icons/Plus';
import { FaEdit, FaSearch, FaSync, FaTrash} from "react-icons/fa";
import { FaBarcode } from "react-icons/fa6";
import { Item } from "../models/item.model";
import { ItemFormUpdate } from "../hooks/useItemFormUpdate";
import ItemForm from "./item_form";
import ItemUpdate from "./item_formUpdate";
import { ComponentType, FC, useEffect, useMemo, useState } from "react";
import ItemDelete from "./item_fomDelete";
import { useItemTable } from "../hooks/useItemTable";
import "../../item/styles/styles.css";
import { useApi } from "../../../common/services/useApi";

const { Column, HeaderCell, Cell } = Table;

export default function ItemTable() {
    const {handleModalCreate, showModal, searchTerm,setSearchTerm,handleSearch, searchLoading, isMobile} = useItemTable();
    const {handleModalUpdate, showModalUpdate, getID, setGetID} = ItemFormUpdate();
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<{ id: number; name: string }>({ id: 0, name: '' });
    const [limit, setLimit] = useState(5); 
    const [page, setPage] = useState(1);

    function handleChangeLimit(newLimit: number) {
      setPage(1);
      setLimit(newLimit);
    }
    const apiCall = useMemo(() => {
      return getAsyncItems(page, limit, searchTerm);
    }, [limit, page, searchTerm]);
    const { loading, data, error, fetch} = useApi<Item[]>(apiCall, { autoFetch: false });
    
    useEffect(() => {
      console.log('Llamando a fetch manualmente con page:', page);
      fetch();
    }, [fetch, page]);



    const handleModalDelete = (open: boolean, item?: { id: number; name: string }) => {
      if (item) {
          setSelectedItem(item);
      }
      setShowModalDelete(open);
    };
    const regex = useMemo(() => new RegExp(searchTerm, "i"), [searchTerm]);

    const filteredData = useMemo(() => {
        return data!.filter(item =>
            regex.test(item.name) ||
            regex.test(item.description) ||
            regex.test(item.model) ||
            regex.test(item.brand) ||
            regex.test(item.category)
        );
    }, [data, regex, page]);

    

    const tableLoadingES = {
      loading: "Cargando Registros..."
    };

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
    
    const ImageCell = ({ rowData, ...props }: { rowData: any }) => (
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
                <img src={rowData.itemImage} width="40" />
            </div>
        </Cell>
    );

    interface FieldProps {
        label: string;
        as: ComponentType<any>;
        defaultValue: any;
        [key: string]: any;
    }

    const Field: FC<FieldProps> = ({ label, as: Component, defaultValue, ...rest }) => {
        return (
            <Stack direction="row">
                <label style={{ width: 70, display: 'inline-block', color: 'var(--rs-text-secondary)' }}>
                    {label}
                </label>
                <InlineEdit disabled defaultValue={defaultValue} />
                <Component style={{ width: 20 }} {...rest} />
            </Stack>
        );
    };

    if (loading) {
        return (
            <Grid fluid>
              <Row>
                  <Col xs={24} md={24} sm={24}>
                    <Stack justifyContent="center" alignItems="center" direction="column">
                      <Loader content="Cargando..." vertical />
                    </Stack>
                  </Col>
              </Row>
            </Grid>
        );
    }

    if(error){
      return (
        <p>Ha ocurrido un error: {error.message}</p>
      )
    }

  
    if(!isMobile){
        return (
            <div style={{padding:35, overflowX: "auto",flex: 1, display: "flex", flexDirection: "column"}}>
                    {/* <Stack direction="row" justifyContent="center" alignItems="center"><Heading level={3} style={{marginTop:"-7px", color:"black"}}>Lista de Repuestos</Heading></Stack> */}
                    <Stack spacing={2} justifyContent="space-between" style={{marginBottom: "25px", marginTop:"-4px"}}>
                        <IconButton icon={<PlusIcon />} appearance="primary" onClick={() => handleModalCreate(true)}> Nuevo Repuesto </IconButton>
                        <InputGroup style={{ width: 250 }}>
                            <Input placeholder="Buscar repuesto..." value={searchTerm} onChange={(value) => handleSearch(value)}/>
                                <InputGroup.Addon>
                                    <FaSearch />
                                </InputGroup.Addon>
                        </InputGroup>
                    </Stack>
                    {filteredData.length > 0 ? (
                       <>
                        <Table bordered cellBordered affixHorizontalScrollbar style={{ background: "white", fontSize:"15px"}} locale={tableLoadingES} loading={searchLoading}  height={600} data={filteredData} rowHeight={65} headerHeight={65}>
                            <Column align="center" flexGrow={3.7} minWidth={130} fixed >
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Acciones</HeaderCell>
                                <Cell>
                                    { rowData => ( 
                                        <Stack spacing={6} justifyContent="center" alignItems="center" direction="row">
                                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Editar</Tooltip>}>
                                                <IconButton onClick={() => {setGetID(rowData.itemID); handleModalUpdate(true)}} icon={<FaEdit style={{width:22, height:22}}/>} style={{ width: 40, background:"transparent", color:"black"}} appearance="primary" />
                                            </Whisper>
                                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Actualizar Stock</Tooltip>}>
                                                <IconButton onClick={(event) => { event.stopPropagation(); setGetID(rowData.itemID); }} icon={<FaSync style={{width:20, height:20}}/>} style={{ width: 40, background:"transparent", color:"black" }} appearance="primary" />
                                            </Whisper>
                                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Código de Barras</Tooltip>}>
                                                <IconButton onClick={(event) => { event.stopPropagation(); setGetID(rowData.itemID); }} icon={<FaBarcode style={{width:20, height:20}}/>} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary" />
                                            </Whisper>
                                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Eliminar Ítem</Tooltip>}>
                                                <IconButton onClick={() => {setGetID(rowData.itemID); handleModalDelete(true, { id: rowData.itemID, name: rowData.name })}} icon={<FaTrash style={{width:18, height:18}}/>} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary" />
                                            </Whisper>
                                        </Stack>
                                    )}
                                </Cell>

                            </Column>
                            {false && (
                                <Column width={200} >
                                    <HeaderCell>ID</HeaderCell>
                                    <Cell dataKey="itmID" />
                                </Column>
                            )}
                            <Column align="center" flexGrow={1} minWidth={140} fixed>
                                <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Repuesto</HeaderCell>
                                <Cell dataKey="name" />
                            </Column>
                        
                            <Column align="center" flexGrow={2} minWidth={150} resizable>
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
                                <ImageCell  rowData={(rowData: any ) => rowData}/>
                            </Column>
                        </Table>

                        <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            maxButtons={10}
                            size="xs"
                            layout={['-', 'pager']}
                            total={10}
                            limit={limit}
                            activePage={page}
                            onChangePage={(newPage) => {
                                console.log('Cambiando a página:', newPage);
                                setPage(newPage);
                            }}
                            onChangeLimit={handleChangeLimit}
                            locale={paginationLocaleES}
                            style={{marginTop: "5px"}}
                            />
                      </>
                    
                    ) : (
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            No se encontraron registros
                        </div>
                    )}
                    <ItemForm open={showModal} hiddeModal={() => handleModalCreate(false)} />
                    <ItemUpdate id={getID} open={showModalUpdate} hiddeModal={() => handleModalUpdate(false)} />
                    <ItemDelete open={showModalDelete} hiddeModal={() => handleModalDelete(false)} id={selectedItem.id} name={selectedItem.name} />
            </div>
        );   
    } else {
        return (
            <div style={{ overflow: "hidden", backgroundColor: "transparent", height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ flexShrink: 0, position: "sticky", top: 0, zIndex: 1, paddingBottom: "10px", backgroundColor: "white" }}>
                <Stack direction="row" justifyContent="flex-start" alignItems="center">
                  <Heading level={2}>Lista de Repuestos</Heading>
                </Stack>
                <Stack spacing={2} direction="row-reverse"  justifyContent="space-between" style={{ marginBottom: "5px", width: "100%" }}>
                  {!isMobile ? (
                    <InputGroup style={{ width: 250 }}>
                      <Input placeholder="Buscar repuesto..." value={searchTerm} onChange={(value) => setSearchTerm(value)} />
                      <InputGroup.Addon>
                        <FaSearch />
                      </InputGroup.Addon>
                    </InputGroup>
                  ) : (
                    <IconButton
                        icon={<PlusIcon />}
                        appearance="primary"
                        onClick={() => handleModalCreate(true)}
                        >
                        Nuevo Repuesto
                        </IconButton>
                  )}
                </Stack>
              </div>
              <div style={{ overflowY: "auto", flex: 1, paddingBottom: "20px" }}>
                {filteredData.length > 0 ? (
                  <Grid fluid>
                    <Row>
                      {data!.map((item) => (
                        <Col key={item.itemID} xs={24} sm={24} md={24}>
                          <Card bordered style={{ marginBottom: "16px" }}>
                            <Card.Header>
                              <Heading level={4}>{item.name}</Heading>
                            </Card.Header>
                            <Card.Body>
                              <Row style={{ display: "flex", flexDirection: "row" }}>
                                <Col xs={24} md={12}>
                                  <Field label="Marca" as={Text} defaultValue={item.brand} />
                                  <Field label="Categoria" as={Text} defaultValue={item.category} />
                                  <Field label="Sub-Categoria" as={Text} defaultValue={item.subCategory} />
                                  <Field label="Modelo" as={Text} defaultValue={item.model} />
                                  <Field label="Fecha de Fabricacion" as={Text} defaultValue={item.dateManufacture} />
                                  <Field label="Precio" as={Text} defaultValue={item.price} />
                                  <Field label="Precio por Mayor" as={Text} defaultValue={item.wholesalePrice} />
                                  <Field label="Precio Base" as={Text} defaultValue={item.barePrice} />
                                  <Field label="Cantidad Actual" as={Text} defaultValue={item.totalStock} />
                                </Col>
                                <Col xs={24} md={12} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                  <Stack direction="column" justifyContent="center" alignItems="center">
                                    <Image
                                      rounded
                                      src="https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=265"
                                      alt="brown french bulldog puppy lying on yellow textile"
                                      width={140}
                                    />
                                  </Stack>
                                </Col>
                              </Row>
                              <Row style={{ display: "flex", flexDirection: "row" }}>
                                <Col xs={24} md={24}>
                                  <Field label="Descripcion" as={Text} defaultValue={item.description} />
                                </Col>
                              </Row>
                            </Card.Body>
                            <Card.Footer>
                              <Stack spacing={6} justifyContent="center" alignItems="center" direction="row">
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Editar</Tooltip>}>
                                  <IconButton icon={<FaEdit style={{ width: 22, height: 22 }} />} style={{ width: 40, background: "transparent", color: "#f08b33" }} appearance="primary" />
                                </Whisper>
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Eliminar</Tooltip>}>
                                  <IconButton icon={<FaTrash style={{ width: 20, height: 20 }} />} style={{ width: 40, background: "transparent", color: "red" }} appearance="primary" />
                                </Whisper>
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Actualizar Stock</Tooltip>}>
                                  <IconButton icon={<FaSync style={{ width: 20, height: 20 }} />} style={{ width: 40, background: "transparent", color: "green" }} appearance="primary" />
                                </Whisper>
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Codigo de Barra</Tooltip>}>
                                  <IconButton icon={<FaBarcode style={{ width: 20, height: 20 }} />} style={{ width: 40, background: "transparent", color: "black" }} appearance="primary" />
                                </Whisper>
                              </Stack>
                            </Card.Footer>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Grid>
                ) : (
                  <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    No se encontraron registros
                  </div>
                )}
              </div>
              <ItemForm open={showModal} hiddeModal={() => handleModalCreate(false)}/>
              <ItemUpdate id={getID} open={showModalUpdate} hiddeModal={() => handleModalUpdate(false)} />
              <ItemDelete open={showModalDelete} hiddeModal={() => handleModalDelete(false)} id={selectedItem.id} name={selectedItem.name}/>
            </div>
          );
    }

     
}