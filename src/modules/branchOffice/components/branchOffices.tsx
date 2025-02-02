import { useEffect, useState } from "react";
import { Heading, IconButton, Stack, Table, Tooltip, Whisper } from "rsuite";
import { BranchOffice } from "../models/branchOffice.model";
import { getBranchOfficesAsync } from "../services/branchOfficeService";
import BranchOfficeModal from "./branchOfficeModal";
import { FaEdit, FaMapPin, FaTrash } from "react-icons/fa";
import PlusIcon from '@rsuite/icons/Plus';
import "../styles/styles.css";
import Column from "rsuite/esm/Table/TableColumn";
import { Cell, HeaderCell } from "rsuite-table";
import RemoveOfficeModal from "./removeOfficeModal";

export default function BranchOffices() {

    const [branchOffices, setBranchOffices] = useState<BranchOffice[]>([])
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

    function handleModal(hidde: boolean): void {
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
                <Heading level={3}>Lista de sucursales</Heading>
                <div className="button-container">
                    <IconButton
                        icon={<PlusIcon />}
                        appearance="primary"
                        onClick={() => handleModal(true)}>
                        Nueva sucursal
                    </IconButton>
                </div>
            </div>

            <Table style={{ borderRadius: "15px", background: "white" }} height={750} data={branchOffices} rowHeight={65} onRowClick={rowData => console.log(rowData)} >
                <Column align="center" flexGrow={1} minWidth={100}>
                    <HeaderCell style={{ background: "#f08b33", color: "white", fontWeight: 'bold', fontSize: '15px' }}>Acciones</HeaderCell>
                    <Cell>
                        {(rowData) => (
                            <Stack spacing={6} justifyContent="center" alignItems="center" direction="row">
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Editar</Tooltip>}>
                                    <IconButton icon={<FaEdit />} style={{ width: 40, margin: 3 }} appearance="primary" />
                                </Whisper>
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Ver ubicación</Tooltip>}>
                                    <IconButton icon={<FaMapPin />} style={{ width: 40, margin: 3 }} appearance="primary" />
                                </Whisper>
                                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Eliminar</Tooltip>}>
                                    <IconButton
                                        icon={<FaTrash />}
                                        style={{ width: 40, margin: 3 }}
                                        appearance="primary"
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

            <BranchOfficeModal open={showModal} hiddeModal={() => handleModal(false)} />
            <RemoveOfficeModal refreshList={loadBranchOffices} id={removeOffice.id} name={removeOffice.name} open={showModalDelete} hiddeModal={() => handleModalDelete(false)} />
        </div>
    );
}