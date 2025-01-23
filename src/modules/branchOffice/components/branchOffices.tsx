import { useEffect, useState } from "react";
import { FaMapPin } from "react-icons/fa6";
import { Button, Card, Image } from "rsuite";
import { BranchOffice } from "../models/branchOffice.model";
import { getBranchOfficesAsync } from "../services/branchOfficeService";

export default function BranchOffices() {

    const [branchOffices, setBranchOffices] = useState<BranchOffice[]>([]);

    useEffect(() => {
        loadBranchOffices();
    }, []);

    async function loadBranchOffices() {
        const data = await getBranchOfficesAsync();
        setBranchOffices(data);
    }

    return (
        <div>
            <h1>Sucursales</h1>
            <div className="d-flex flex-wrap">
                {branchOffices.map(branchOffice => (
                    <Card width={320} shaded>
                        <Image />
                        <Card.Header>
                            {branchOffice.name}
                        </Card.Header>
                        <Card.Body>
                            {branchOffice.address}
                        </Card.Body>
                        <Card.Footer>
                            <Button>
                                <FaMapPin /> Ver ubicación
                            </Button>
                        </Card.Footer>
                    </Card>
                ))}
            </div>
        </div>
    );
}