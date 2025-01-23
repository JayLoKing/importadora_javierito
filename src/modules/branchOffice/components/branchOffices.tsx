import { useEffect, useState } from "react";
import { Button, Table } from "rsuite";
import { BranchOffice } from "../models/branchOffice.model";
import { getBranchOfficesAsync } from "../services/branchOfficeService";
import Column from "rsuite/esm/Table/TableColumn";
import { Cell, HeaderCell } from "rsuite-table";
import BranchOfficeModal from "./branchOfficeModal";

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
                Añadir
            </Button>
            <Table
                height={400}
                data={branchOffices}
                style={{ marginTop: 20 }}>
                {false && (
                    <Column fixed>
                        <HeaderCell>id</HeaderCell>
                        <Cell dataKey="id"></Cell>
                    </Column>
                )}

                <Column>
                    <HeaderCell>Nombre</HeaderCell>
                    <Cell dataKey="name" />
                </Column>

                <Column>
                    <HeaderCell>Dirección</HeaderCell>
                    <Cell dataKey="address" />
                </Column>

                <Column>
                    <HeaderCell>Fecha de registro</HeaderCell>
                    <Cell dataKey="registerDate" />
                </Column>
            </Table>

            <BranchOfficeModal open={showModal} hiddeModal={() => handleModal(false)} />
        </div>
    );
}