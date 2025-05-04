/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Stack, IconButton, Image,Table, Whisper, Tooltip, Pagination, Input,Text, Heading, InputGroup, Grid, Row, Col, Card, InlineEdit, SelectPicker, Panel, Button } from "rsuite";
import { getBrandsAsync, getItemsAsync, getSubCategoryAsync } from "../services/item.service";
import PlusIcon from '@rsuite/icons/Plus';
import { FaEdit, FaSearch, FaSync, FaTrash} from "react-icons/fa";
import { FaBarcode } from "react-icons/fa6";
import { Brand, GetItems, Item, SubCategory } from "../models/item.model";
import ItemForm from "./item_form";
import ItemUpdate from "./item_formUpdate";
import { ComponentType, FC, useEffect, useMemo, useState } from "react";
import ItemDelete from "./item_fomDelete";
import { useItemTable } from "../hooks/useItemTable";
import "../../item/styles/styles.css";
import { useApi } from "../../../common/services/useApi";
import ItemBareCode from "./item_formBarreCode";
import UpdateStock from "./item_formStock";
import { useRegisterItem } from "../hooks/useRegisterItem";
import { useUpdateItem } from "../hooks/useUpdateItem";
import { useDeleteItem } from "../hooks/useDeleteItem";
import { useUpdateStock } from "../hooks/useUpdateStock";
import { useBarcode } from "../hooks/useBarcode";
import ImageCell from "./imageCell";
import { CiCircleInfo } from "react-icons/ci";
import { PiBroomDuotone } from "react-icons/pi";
import '../styles/pagination.style.css';

const { Column, HeaderCell, Cell } = Table;

export default function ItemTable() {
    const { formatDate,setSearchSubCategory,searchSubCategory, searchBrand,setSearchBrand,  searchTerm,setSearchTerm,handleSearch, isMobile, tableLoadingES, paginationLocaleES, page,setPage, limit, handleChangeLimit, handleClearSearch} = useItemTable();
    const {handleModalCreate,showModal} = useRegisterItem();
    const {handleModalUpdate,showModalUpdate, getIDUpdate, setGetIDUpdate} = useUpdateItem();
    const {handleModalDelete, showModalDelete, getIDDelete, setGetIDDelete, selectedItem} = useDeleteItem();
    const {handleModalStock, showModalStock, setGetIDStock, getIDStock} = useUpdateStock();
    const {handleModalBareCode, showModalBareCode, setGetIDBarcode, getIDBarcode} = useBarcode();
    const [items, setItems] = useState<Item[]>([]);
    const [total, setTotal] = useState(0);

    const fetchItemsAsync = useMemo(() => {
      return getItemsAsync(page, limit, searchTerm, searchSubCategory, searchBrand);
    }, [limit, page, searchTerm, searchSubCategory, searchBrand]);
    const { loading, data: itemsData, error, fetch} = useApi<GetItems>(fetchItemsAsync, { autoFetch: false });

    useEffect(() => {
      fetch();
    }, [fetch, page, limit]);
    
    const fetchItemBrandsAsync = useMemo(() => getBrandsAsync(), []);
    const { data: dataBrands, loading: loadingBrands, fetch: fetchBrands } = useApi<Brand[]>(fetchItemBrandsAsync, { autoFetch: true });
    const fetchItemSubCategoryAsync = useMemo(() => getSubCategoryAsync(), []);
    const { data: dataSubCategories, loading: loadingSubCategories, fetch: fetchItemSubCategory } = useApi<SubCategory[]>(fetchItemSubCategoryAsync, { autoFetch: true });

    useEffect(() => {
      if (itemsData) {
        const processedItems = Array.isArray(itemsData) 
          ? [] 
          : itemsData.data.map(item => ({
              ...item,
              description: item.description || "Sin Descripción" 
            }));
        
        setItems(processedItems);
        setTotal(Array.isArray(itemsData) ? 0 : itemsData.total);
      }
    }, [itemsData]);

    useEffect(() => {
      fetchBrands();
      fetchItemSubCategory();
    }, [fetchBrands, fetchItemSubCategory]); 

    const brandsOptions = dataBrands?.map(brand => ({ label: brand.name, value: brand.name })) || [];
    const subCategoriesOptions = dataSubCategories?.map(subCategory => ({ label: subCategory.name, value: subCategory.name })) || [];
   
    const regex = useMemo(() => new RegExp(searchTerm, "i"), [searchTerm]);

    const filteredData = useMemo(() => {
      const result = items.filter(item =>
        regex.test(item.name) ||
        regex.test(item.description) ||
        regex.test(item.model) ||
        regex.test(item.brand) ||
        regex.test(item.subCategory) ||
        regex.test(item.category)
      );
      
      return result;
    }, [items, regex]);

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

    const handleRefreshData = () => {
      setPage(1); 
      fetch();   
    };

    if(error){
      return (
        <p>Ha ocurrido un error: {error.message}</p>
      )
    }

    if(!isMobile){
        return (

            <div style={{padding:30}}>
                    {/* <Stack direction="row" justifyContent="center" alignItems="center"><Heading level={3} style={{marginTop:"-7px", color:"black"}}>Lista de Repuestos</Heading></Stack> */}
                    <Panel bordered style={{ marginBottom: 15 }} >
                      <Stack spacing={2} justifyContent="space-between" >
                          <IconButton icon={<PlusIcon />} appearance="primary" onClick={() => handleModalCreate(true)}> Nuevo Repuesto </IconButton>
                          <Stack spacing={6}>
                            <SelectPicker label="Filtro" data={brandsOptions} loading={loadingBrands} onChange={(value) => setSearchBrand(value as string)} searchable placeholder="Marca"/>
                            <SelectPicker label="Filtro" data={subCategoriesOptions} loading={loadingSubCategories} onChange={(value) => setSearchSubCategory(value as string)} searchable placeholder="Sub-Categoría"/>
                            <InputGroup style={{ width: 250 }}>
                                <InputGroup.Addon style={{background:"#f08b33", color:"white"}}>
                                  <FaSearch />
                                </InputGroup.Addon>
                                <Input placeholder="Buscar repuesto.." value={searchTerm!} onChange={(value) => handleSearch(value)}/>
                            </InputGroup>
                            <Whisper placement="top" trigger="hover" speaker={<Tooltip>Limpiar buscador</Tooltip>}>
                              <IconButton icon={<PiBroomDuotone/>} appearance="primary" onClick={handleClearSearch} ></IconButton>
                            </Whisper>
                          </Stack>
                      </Stack>
                    </Panel>
                    <Panel bordered >
                      <Table bordered cellBordered style={{ background: "white", fontSize:"15px", borderRadius:"5px"}} locale={tableLoadingES} loading={ loading}  height={590} data={filteredData} rowHeight={100} headerHeight={70}>
                              <Column align="center" flexGrow={3.7} minWidth={130} fixed resizable >
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px',  whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Acciones</HeaderCell>
                                  <Cell>
                                      { rowData => ( 
                                          <Stack spacing={6} justifyContent="center" alignItems="center" direction="row">
                                              <Whisper placement="top" trigger="hover" speaker={<Tooltip>Editar</Tooltip>}>
                                                  <IconButton onClick={() => {setGetIDUpdate(rowData.itemID); handleModalUpdate(true)}} icon={<FaEdit style={{width:22, height:22}}/>} style={{ width: 40, background:"transparent", color:"black"}} appearance="primary" />
                                              </Whisper>
                                              <Whisper placement="top" trigger="hover" speaker={<Tooltip>Agregar Stock</Tooltip>}>
                                                  <IconButton onClick={() => {setGetIDStock(rowData.itemID); handleModalStock(true) }} icon={<PlusIcon style={{width:20, height:20}}/>} style={{ width: 40, background:"transparent", color:"black" }} appearance="primary" />
                                              </Whisper>
                                              <Whisper placement="top" trigger="hover" speaker={<Tooltip>Código de Barras</Tooltip>}>
                                                  <IconButton onClick={() => {setGetIDBarcode(rowData.itemID); handleModalBareCode(true)}} icon={<FaBarcode style={{width:20, height:20}}/>} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary" />
                                              </Whisper>
                                              <Whisper placement="top" trigger="hover" speaker={<Tooltip>Eliminar Ítem</Tooltip>}>
                                                  <IconButton onClick={() => {setGetIDDelete(rowData.itemID); handleModalDelete(true, { id: rowData.itemID, name: rowData.name })}} icon={<FaTrash style={{width:18, height:18}}/>} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary" />
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
                              <Column align="center" flexGrow={2} minWidth={200} resizable>
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Repuesto</HeaderCell>
                                  <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="name" >
                                  {rowData => (
                                    <div>
                                      {rowData.name}
                                      <Whisper placement="top" trigger="hover" speaker={<Tooltip>Información</Tooltip>} >
                                        <Button appearance="subtle" size="xs" style={{ background:"transparent" }}>
                                          <CiCircleInfo style={{ fontSize:"15px", fontWeight:"bold" }}/>
                                        </Button>
                                      </Whisper>
                                    </div>
                                  )}
                                  </Cell>
                              </Column>
                              <Column align="center" flexGrow={2} minWidth={150} resizable>
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Fecha de Registro</HeaderCell>
                                  <Cell dataKey="registerDate" style={{ whiteSpace: "normal", wordBreak: "break-word", textAlign:"center", display: "flex", justifyContent: "center", alignItems: "center",}}>
                                    {rowData => (
                                        <span style={{ color: "#333" }}>
                                          {formatDate(rowData.registerDate)}
                                        </span>
                                      )}
                                  </Cell>
                              </Column>
                              <Column align="center" flexGrow={2} minWidth={150} resizable>
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Especificaciones</HeaderCell>
                                  <Cell dataKey="description" style={{ whiteSpace: "normal", wordBreak: "break-word", textAlign:"center", display: "flex", justifyContent: "center", alignItems: "center",}}/>
                              </Column>
                              <Column align="center" flexGrow={1} minWidth={150} resizable>
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Imagen del Repuesto</HeaderCell>
                                  <ImageCell  rowData={(rowData: any ) => rowData}/>
                              </Column>

                              <Column align="center" flexGrow={1} minWidth={150} resizable>
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Modelo</HeaderCell>
                                  <Cell dataKey="model" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} />
                              </Column>
                          
                              <Column align="center" flexGrow={1} minWidth={105} resizable>
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Precio Unitario</HeaderCell>
                                  <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>{rowData => (<span style={{ color: "green", fontWeight: "bold" }}>Bs. {rowData.price}</span>)}</Cell>
                              </Column>
                          
                              <Column align="center" flexGrow={1} minWidth={100} resizable>
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Precio por mayor</HeaderCell>
                                  <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>{rowData => (<span style={{ color: "green", fontWeight: "bold" }}>Bs. {rowData.wholesalePrice}</span>)}</Cell>
                              </Column>
                          
                              <Column align="center" flexGrow={1} minWidth={100} resizable>
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Precio Público</HeaderCell>
                                  <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>{rowData => (<span style={{ color: "green", fontWeight: "bold" }}>Bs. {rowData.barePrice}</span>)}</Cell>
                              </Column>

                              <Column align="center" flexGrow={1} minWidth={100} resizable>
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Precio pelado</HeaderCell>
                                  <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>{rowData => (<span style={{ color: "green", fontWeight: "bold" }}>Bs. {rowData.barePrice}</span>)}</Cell>
                              </Column>
                          
                              <Column align="center" flexGrow={1} minWidth={100} resizable>
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Marca</HeaderCell>
                                  <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="brand" />
                              </Column>
                          
                              <Column align="center" flexGrow={1} minWidth={120} resizable>
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Categoría</HeaderCell>
                                  <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="category" />
                              </Column>
                          
                              <Column align="center" flexGrow={1} minWidth={120} resizable>
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Sub-Categoría</HeaderCell>
                                  <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="subCategory" />
                              </Column>
                          
                              <Column align="center" flexGrow={1} minWidth={140} resizable>
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Fecha de Fabricación</HeaderCell>
                                  <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="dateManufacture" />
                              </Column>
                          
                              <Column align="center" width={350} resizable>
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Ubicación del Repuesto</HeaderCell>
                                  <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="address" />
                              </Column>
                          
                              <Column align="center" flexGrow={1} minWidth={100} resizable>
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Stock Total</HeaderCell>
                                  <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="totalStock" />
                              </Column>

                              <Column align="center" flexGrow={1} minWidth={100} resizable>
                                  <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Precio Total</HeaderCell>
                                  <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>{rowData => (<span style={{ color: "red", fontWeight: "bold" }}>Bs. {rowData.price * rowData.totalStock}</span>)}</Cell>
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
                            onChangePage={(newPage) => {
                                console.log('Cambiando a página:', newPage);
                                setPage(newPage);
                            }}
                            onChangeLimit={handleChangeLimit}
                            locale={paginationLocaleES}
                          style={{marginTop: "5px"}}
                          className="custom-pagination"
                      />
                    </Panel>
                    <ItemForm open={showModal} hiddeModal={() => handleModalCreate(false)} onItemCreated={handleRefreshData} />
                    <ItemUpdate id={getIDUpdate} open={showModalUpdate} hiddeModal={() => handleModalUpdate(false)} onItemUpdated={handleRefreshData} />
                    <ItemBareCode id={getIDBarcode} open={showModalBareCode} hiddeModal={() => handleModalBareCode(false)} />
                    <UpdateStock id={getIDStock} open={showModalStock} hiddeModal={() => handleModalStock(false)} onStockUpdated={handleRefreshData}/>
                    <ItemDelete open={showModalDelete} hiddeModal={() => handleModalDelete(false)} id={getIDDelete} name={selectedItem.name} onItemDeleted={handleRefreshData}/>
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
                      <Input placeholder="Buscar repuesto..." value={searchTerm!} onChange={(value) => setSearchTerm(value)} />
                      <InputGroup.Addon>
                        <FaSearch />
                      </InputGroup.Addon>
                    </InputGroup>
                  ) : (
                    <>
                      
                    <IconButton
                        icon={<PlusIcon />}
                        appearance="primary"
                        onClick={() => handleModalCreate(true)}
                        >
                        Nuevo Repuesto
                        </IconButton>
                    </>
                  )}
                </Stack>
              </div>
              <div style={{ overflowY: "auto", flex: 1, paddingBottom: "20px" }}>
              <Grid fluid>
                    <Row>
                      {items!.map((item) => (
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
                                      src={item.itemImage}
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
                                    <IconButton onClick={() => {setGetIDUpdate(item.itemID); handleModalUpdate(true)}} icon={<FaEdit style={{width:22, height:22}}/>} style={{ width: 40, background:"transparent", color:"black"}} appearance="primary" />
                                </Whisper>
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Actualizar Stock</Tooltip>}>
                                    <IconButton onClick={(event) => { event.stopPropagation(); setGetIDUpdate(item.itemID); }} icon={<FaSync style={{width:20, height:20}}/>} style={{ width: 40, background:"transparent", color:"black" }} appearance="primary" />
                                </Whisper>
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Código de Barras</Tooltip>}>
                                    <IconButton onClick={(event) => { event.stopPropagation(); setGetIDBarcode(item.itemID); }} icon={<FaBarcode style={{width:20, height:20}}/>} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary" />
                                </Whisper>
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Eliminar Ítem</Tooltip>}>
                                    <IconButton onClick={() => {setGetIDDelete(item.itemID); handleModalDelete(true, { id: item.itemID, name: item.name })}} icon={<FaTrash style={{width:18, height:18}}/>} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary" />
                                </Whisper>
                              </Stack>
                            </Card.Footer>
                          </Card>
                        </Col>
                      ))}
                      <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            maxButtons={1}
                            size="xs"
                            layout={['-', 'pager']}
                            total={total}
                            limit={limit}
                            activePage={page}
                            onChangePage={(newPage) => {
                                console.log('Cambiando a página:', newPage);
                                setPage(newPage);
                            }}
                            onChangeLimit={handleChangeLimit}
                            locale={paginationLocaleES}
                            />
                    </Row>
                  </Grid>
              </div>
              <ItemForm open={showModal} hiddeModal={() => handleModalCreate(false)} onItemCreated={handleRefreshData} />
              <ItemUpdate id={getIDUpdate} open={showModalUpdate} hiddeModal={() => handleModalUpdate(false)} onItemUpdated={handleRefreshData} />
              <ItemBareCode id={getIDBarcode} open={showModalBareCode} hiddeModal={() => handleModalBareCode(false)} />
              <UpdateStock id={getIDStock} open={showModalStock} hiddeModal={() => handleModalStock(false)} onStockUpdated={handleRefreshData}/>
              <ItemDelete open={showModalDelete} hiddeModal={() => handleModalDelete(false)} id={getIDDelete} name={selectedItem.name} onItemDeleted={handleRefreshData}/>
            </div>
          );
    }

     
}