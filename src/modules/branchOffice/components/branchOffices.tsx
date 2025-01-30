import { useEffect, useState } from "react";
import { Button, IconButton, Table, Tooltip, Whisper } from "rsuite";
import { BranchOffice } from "../models/branchOffice.model";
import { getBranchOfficesAsync } from "../services/branchOfficeService";
import BranchOfficeModal from "./branchOfficeModal";
import { FaEdit, FaMapPin, FaPlus, FaTrash } from "react-icons/fa";
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
        const data = await getBranchOfficesAsync()
        setBranchOffices(data)
    }

    function handleModal(hidde: boolean): void {
        setShowModal(hidde)
    }

    return (
        <div className="container-offices">
            <div className="button-container">
                <Button
                    endIcon={<FaPlus />}
                    appearance="primary"
                    onClick={() => handleModal(true)}
                    className="create-button">
                    Crear sucursal
                </Button>
            </div>
            <Table data={branchOffices} rowHeight={65} className="table" onRowClick={rowData => {
                console.log(rowData);
            }}>
                <Column width={250}>
                    <HeaderCell style={{ textAlign: 'center' }}>
                        <strong>Acciones</strong>
                    </HeaderCell>
                    <Cell>
                        <div className="action-buttons">
                            <Whisper placement="top" trigger={"hover"} speaker={<Tooltip>Editar</Tooltip>}>
                                <IconButton icon={<FaEdit />} className="icon-button" appearance="primary" />
                            </Whisper>
                            <Whisper placement="top" trigger={"hover"} speaker={<Tooltip>Ubicación</Tooltip>}>
                                <IconButton icon={<FaMapPin />} className="icon-button" appearance="primary" />
                            </Whisper>
                            <Whisper placement="top" trigger={"hover"} speaker={<Tooltip>Eliminar</Tooltip>}>
                                <IconButton icon={<FaTrash />} className="icon-button" appearance="primary" />
                            </Whisper>
                        </div>
                    </Cell>
                </Column>
                {false && (
                    <Column width={200} resizable>
                        <HeaderCell>ID</HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                )}
                <Column width={305} resizable>
                    <HeaderCell>Nombre de la sucursal</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column width={400} resizable>
                    <HeaderCell>Dirección</HeaderCell>
                    <Cell dataKey="address" />
                </Column>
                <Column width={150}>
                    <HeaderCell>Fecha de registro</HeaderCell>
                    <Cell>
                        {(rowData) => new Date(rowData.registerDate).toLocaleDateString()}
                    </Cell>
                </Column>
            </Table>

            <BranchOfficeModal open={showModal} hiddeModal={() => handleModal(false)} />
        </div>
    );
}