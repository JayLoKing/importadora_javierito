/* eslint-disable no-constant-binary-expression */
import { useEffect, useMemo, useState } from "react";
import { IconButton, Input, InputGroup, Panel, Stack, Table, Tooltip, Whisper } from "rsuite";
import { BranchOffice, BranchOfficeDetailsDTO, GetDataBranchOffice } from "../models/branchOffice.model";
import { getBranchOfficeDetailsAsync, getBranchOfficesAsync2 } from "../services/branchOfficeService";
import { FaEdit, FaSearch, FaTrash, FaWrench } from "react-icons/fa";
import PlusIcon from '@rsuite/icons/Plus';
import "../styles/styles.css";
import Column from "rsuite/esm/Table/TableColumn";
import { Cell, HeaderCell } from "rsuite-table";
import { LuMapPinned } from "react-icons/lu";
import { useBranchOfficeTable } from "../hooks/useBranchOfficeTable";
import { useApi } from "../../../common/services/useApi";

export default function BranchOffices() {

    const {limit, page, paramQuery} = useBranchOfficeTable();
    const fetchBranchOfficesAsync = useMemo(() => getBranchOfficesAsync2(limit,page,paramQuery), [limit,page,paramQuery]);
    const { data: dataBranchOffice, loading: loadingBranchOffice, fetch: fetchBranchOffices } = useApi<GetDataBranchOffice>(fetchBranchOfficesAsync, { autoFetch: true });
    const [branchOffices, setBranchOffices] = useState<BranchOffice[]>([]);
    const [total, setTotal] = useState(0);
    const [details, setDetails] = useState<BranchOfficeDetailsDTO>({
        id: 0,
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        images: []
    })

    const [action, setAction] = useState<string>('')
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)

    const [removeOffice, setRemoveOffice] = useState<{ id: number, name: string }>({ id: 0, name: '' })

    useEffect(() => {
        fetchBranchOffices();
    }, [fetchBranchOffices]);

    useEffect(() => {
        if(dataBranchOffice) {
            if(Array.isArray(dataBranchOffice)){
                setBranchOffices([]);
            } else {
                setBranchOffices(dataBranchOffice.first);
                setTotal(dataBranchOffice.second);
            }
        }
    }, [dataBranchOffice]);


    async function getBranchOfficeById(id: number) {
        const office = await getBranchOfficeDetailsAsync(id)
        setDetails(office)
    }

    function handleModal(hidde: boolean, act: string): void {
        setAction(act)
        setShowModal(hidde)
    }

    function handleModalDelete(hidde: boolean): void {
        setShowModalDelete(hidde);
    }

    function remove(id: number, name: string) {
        setRemoveOffice({ id: id, name: name });
    }

    return (
        <div style={{padding:30}}>
            <Panel bordered style={{ marginBottom: 15, }}>
                <Stack spacing={2} justifyContent="space-between" >
                    <IconButton icon={<PlusIcon />} appearance="primary" onClick={() => handleModal(true, 'insert')}> Nueva Sucursal </IconButton>
                    <Stack spacing={6}>
                        <InputGroup style={{ width: 250 }}>                        
                            <InputGroup.Addon style={{background:"#f08b33", color:"white"}}>
                                <FaSearch />
                            </InputGroup.Addon>
                            <Input placeholder="Buscar sucursal.." />
                        </InputGroup>
                    </Stack>
                </Stack>
            </Panel>
            <Panel bordered>
                <Table loading={loadingBranchOffice} bordered cellBordered style={{ background: "white", overflow: "hidden", borderRadius:"5px"}} rowHeight={100} height={600} headerHeight={70} data={dataBranchOffice!} >
                    <Column align="center" flexGrow={1} minWidth={100}>
                        <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '15px' }}>Acciones</HeaderCell>
                        <Cell>
                            {(rowData) => (
                                <Stack spacing={6} justifyContent="center" alignItems="center" direction="row">
                                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Editar</Tooltip>}>
                                        <IconButton icon={<FaEdit style={{width:20, height:20}}/>} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary"
                                            onClick={() => {
                                                getBranchOfficeById(rowData.id)
                                                handleModal(true, 'update')
                                            }} />
                                    </Whisper>
                                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Ver ubicación</Tooltip>}>
                                        <IconButton icon={<LuMapPinned style={{width:20, height:20, fontWeight:"bolder"}} />} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary" />
                                    </Whisper>
                                    <Whisper placement="top" trigger="hover" speaker={<Tooltip>Eliminar</Tooltip>}>
                                        <IconButton icon={<FaTrash style={{width:18, height:18}}/>} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary"
                                            onClick={() => {
                                                remove(rowData.id, rowData.name)
                                                handleModalDelete(true);
                                            }} />
                                    </Whisper>
                                </Stack>
                            )}
                        </Cell>
                    </Column>

                    {false && (
                        <Column>
                            <HeaderCell>Id</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>
                    )}

                    <Column align="center" flexGrow={1} minWidth={140}>
                        <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '15px' }}>Nombre de la Sucursal</HeaderCell>
                        <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="name" />
                    </Column>

                    <Column align="center" flexGrow={1} minWidth={120}>
                        <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '15px' }}>Dirección</HeaderCell>
                        <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }} dataKey="address" />
                    </Column>

                    <Column align="center" flexGrow={1} minWidth={140}>
                        <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '15px' }}>Fecha de Registro</HeaderCell>
                        <Cell style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                            {(rowData) => new Date(rowData.registerDate).toLocaleDateString()}
                        </Cell>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={100}>
                        <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '15px' }}>Producto</HeaderCell>
                        <Cell>
                            <Stack spacing={6} justifyContent="center" alignItems="center" direction="row">
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Ver Productos</Tooltip>}>
                                    <IconButton icon={<FaWrench style={{width:20, height:20, fontWeight:"bolder"}} />} style={{ width: 40,  background:"transparent", color:"black" }} appearance="primary" />
                                </Whisper>
                            </Stack>
                        </Cell>
                    </Column>
                </Table>
            </Panel>
            {/* <BranchOfficeModal details={details} action={action} open={showModal} refreshList={loadBranchOffices} hiddeModal={() => handleModal(false, '')} />
            <RemoveOfficeModal refreshList={loadBranchOffices} id={removeOffice.id} name={removeOffice.name} open={showModalDelete} hiddeModal={() => handleModalDelete(false)} /> */}
        </div>
    );
}