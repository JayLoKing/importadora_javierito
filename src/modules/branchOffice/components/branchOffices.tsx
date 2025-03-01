import { useEffect, useState } from "react";
import { IconButton, Stack, Table, Tooltip, Whisper } from "rsuite";
import { BranchOffice, BranchOfficeDetailsDTO } from "../models/branchOffice.model";
import { getBranchOfficeDetailsAsync, getBranchOfficesAsync } from "../services/branchOfficeService";
import BranchOfficeModal from "./branchOfficeModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import PlusIcon from '@rsuite/icons/Plus';
import "../styles/styles.css";
import Column from "rsuite/esm/Table/TableColumn";
import { Cell, HeaderCell } from "rsuite-table";
import RemoveOfficeModal from "./removeOfficeModal";
import { LuMapPinned } from "react-icons/lu";

export default function BranchOffices() {

    const [branchOffices, setBranchOffices] = useState<BranchOffice[]>([])
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
        loadBranchOffices();
    }, []);

    async function loadBranchOffices() {
        const data = await getBranchOfficesAsync()
        setBranchOffices(data)
    }

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
        <div className="container-offices">
            <div className="header-container">
                {/* <Heading level={3} style={{ color: "black" }}>Lista de sucursales</Heading> */}
                <div className="button-container">
                    <IconButton
                        icon={<PlusIcon />}
                        appearance="primary"
                        onClick={() => handleModal(true, 'insert')}>
                        Nueva sucursal
                    </IconButton>
                </div>
            </div>

            <Table bordered cellBordered style={{ background: "white", overflow: "hidden" }} height={600} headerHeight={60} data={branchOffices} rowHeight={65}>
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
                    <Cell dataKey="name" />
                </Column>

                <Column align="center" flexGrow={1} minWidth={120}>
                    <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '15px' }}>Dirección</HeaderCell>
                    <Cell dataKey="address" />
                </Column>

                <Column align="center" flexGrow={1} minWidth={140}>
                    <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '15px' }}>Fecha de Registro</HeaderCell>
                    <Cell>
                        {(rowData) => new Date(rowData.registerDate).toLocaleDateString()}
                    </Cell>
                </Column>
            </Table>

            <BranchOfficeModal details={details} action={action} open={showModal} refreshList={loadBranchOffices} hiddeModal={() => handleModal(false, '')} />
            <RemoveOfficeModal refreshList={loadBranchOffices} id={removeOffice.id} name={removeOffice.name} open={showModalDelete} hiddeModal={() => handleModalDelete(false)} />
        </div>
    );
}