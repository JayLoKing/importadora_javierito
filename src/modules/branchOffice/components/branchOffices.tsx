import { useEffect, useState } from "react";
import { Button, IconButton, Table, Tooltip, Whisper } from "rsuite";
import { BranchOffice } from "../models/branchOffice.model";
import { getBranchOfficesAsync } from "../services/branchOfficeService";
import BranchOfficeModal from "./branchOfficeModal";
import { FaEdit, FaMapPin, FaTrash } from "react-icons/fa";
import "../styles/styles.css";
import Column from "rsuite/esm/Table/TableColumn";
import { Cell, HeaderCell } from "rsuite-table";

export default function BranchOffices() {

    const [branchOffices, setBranchOffices] = useState<BranchOffice[]>([])
    const [showModal, setShowModal] = useState<boolean>(false)

    useEffect(() => {
        loadBranchOffices();
    }, []);

    async function loadBranchOffices() {
        const data = await getBranchOfficesAsync();
        setBranchOffices(data);
    }

    function handleModal(hidde: boolean): void {
        setShowModal(hidde);
    }

    return (
        <div style={{ padding: 25 }}>
            <Button appearance="primary" onClick={() => handleModal(true)}>
                Crear sucursal
            </Button>
            <Table data={branchOffices} rowHeight={65} style={{ textAlign: 'center' }}>
                <Column width={250} fixed>
                    <HeaderCell>
                        <strong>Acciones</strong>
                    </HeaderCell>
                    <Cell>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Whisper placement="top" trigger={"hover"} speaker={<Tooltip>Editar</Tooltip>}>
                                <IconButton icon={<FaEdit />} style={{ width: 50, margin: 3 }} appearance="primary" />
                            </Whisper>
                            <Whisper placement="top" trigger={"hover"} speaker={<Tooltip>Ubicación</Tooltip>}>
                                <IconButton icon={<FaMapPin />} style={{ width: 50, margin: 3 }} appearance="primary" />
                            </Whisper>
                            <Whisper placement="top" trigger={"hover"} speaker={<Tooltip>Eliminar</Tooltip>}>
                                <IconButton icon={<FaTrash />} style={{ width: 50, margin: 3 }} appearance="primary" />
                            </Whisper>
                        </div>
                    </Cell>
                </Column>
                {false && (
                    <Column align="center" width={100}>
                        <HeaderCell>ID</HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                )}
                <Column width={200} resizable>
                    <HeaderCell>Nombre de la sucursal</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column width={100} resizable>
                    <HeaderCell>Dirección</HeaderCell>
                    <Cell dataKey="address" />
                </Column>
                <Column width={150} resizable>
                    <HeaderCell>Fecha de registro</HeaderCell>
                    <Cell dataKey="registerDate" />
                </Column>
            </Table>
            <BranchOfficeModal open={showModal} hiddeModal={() => handleModal(false)} />
        </div>
    );
}