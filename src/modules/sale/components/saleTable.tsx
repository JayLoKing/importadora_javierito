/* eslint-disable no-constant-binary-expression */
import {  Stack, IconButton, Table,  Pagination, Input, InputGroup, SelectPicker, Panel } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import "../../item/styles/styles.css";
import SaleForm from "./sale_form";

const { Column, HeaderCell, Cell } = Table;

export default function SaleTable(){
    const [showModalSale, setShowModalSale] = useState(false);
    const [limit, setLimit] = useState(5); 
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    
    useEffect(() => {
    
    }, []);
    
    function handleOpenModalCreate() {
        setShowModalSale(true);
    }

    function handleCloseModalCreate() {
        setShowModalSale(false);
    }

    return(
        <div style={{padding:30 }}>
            <Panel bordered style={{ marginBottom: 15 }}>
                <Stack spacing={2} justifyContent="space-between" >
                    <IconButton icon={<PlusIcon />} appearance="primary" onClick={() => handleOpenModalCreate()}>Nueva Venta</IconButton>
                    <Stack spacing={6}>
                        <SelectPicker label="Filtro" searchable placeholder="Marca" data={[]}/>
                        <SelectPicker label="Filtro" searchable placeholder="Sub-Categoría" data={[]}/>
                        <InputGroup style={{ width: 250 }}>
                            <Input placeholder="Buscar venta.." />
                                <InputGroup.Addon style={{background:"#de7214", color:"white"}}>
                                    <FaSearch />
                                </InputGroup.Addon>
                                </InputGroup>
                    </Stack>
                </Stack>
            </Panel>
            <Panel bordered>
            <Table bordered cellBordered style={{ background: "white", fontSize:"15px", borderRadius:"5px"}}  height={600} rowHeight={100} headerHeight={70}>
                {false && (
                    <Column width={200} >
                        <HeaderCell>ID</HeaderCell>
                        <Cell dataKey="itmID" />
                    </Column>
                )}
                <Column align="center" flexGrow={1} minWidth={140} >
                    <HeaderCell style={{backgroundColor: "#f08b33", color:"white", fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Venta</HeaderCell>
                    <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="sale" />
                </Column>

                <Column align="center" flexGrow={1} minWidth={100}>
                    <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Fecha</HeaderCell>
                    <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="totalSale" />
                </Column>
                        
                <Column align="center" flexGrow={2} minWidth={150} >
                    <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Observación</HeaderCell>
                    <Cell dataKey="description" style={{ whiteSpace: "normal", wordBreak: "break-word", textAlign:"center", display: "flex", justifyContent: "center", alignItems: "center",}}/>
                </Column>
                        
                <Column align="center" flexGrow={1} minWidth={140}>
                    <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Vendedor</HeaderCell>
                    <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="employee" />
                </Column>
                        
                <Column align="center" flexGrow={1} minWidth={150}>
                    <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Comisión</HeaderCell>
                    <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="comision" />
                </Column>
                        
                <Column align="center" flexGrow={1} minWidth={100}>
                    <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Cliente</HeaderCell>
                    <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="client" />
                </Column>

                <Column align="center" flexGrow={1} minWidth={100}>
                    <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Descuento</HeaderCell>
                    <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="descount" />
                </Column>

                <Column align="center" flexGrow={1} minWidth={100}>
                    <HeaderCell style={{backgroundColor: "#f08b33", color:"white",fontWeight: "bold", fontSize: '15px', whiteSpace: "normal", wordBreak: "break-word", textAlign:"center"}}>Total</HeaderCell>
                    <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="totalSale" />
                </Column>
            </Table>
            <Pagination prev next first last ellipsis boundaryLinks maxButtons={5} size="xs" layout={['total', '-', '|', 'pager', 'skip']} total={total} limit={limit} activePage={page} style={{marginTop: "5px"}} />
            </Panel>
            <SaleForm open={showModalSale} hiddeModal={handleCloseModalCreate} />
        </div>
    )
}