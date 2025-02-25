import { FaExclamationTriangle } from "react-icons/fa";
import { Button, Modal, Stack } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { removeBranchOfficeAsync } from "../services/branchOfficeService";

interface RemoveOfficeModalProps {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
    id: number;
    name: string;
    refreshList: () => Promise<void>;
}

export default function RemoveOfficeModal({ open, hiddeModal, id, name, refreshList }: RemoveOfficeModalProps) {

    async function confirmDelete() {
        await removeBranchOfficeAsync(id);
        hiddeModal(open);
        await refreshList();
    }

    return (
        <Modal open={open} onClose={() => hiddeModal(false)} overflow>
            <ModalHeader>
                <ModalTitle>
                    <Stack justifyContent="center" alignItems="center">
                        <FaExclamationTriangle style={{color: "#f08b33", height:"30px", width:"30px", marginRight:"10px"}}/>
                            <strong>Advertencia</strong>
                    </Stack>
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Stack justifyContent="center" direction="row" spacing={5} alignItems="center">
                    <section>
                        <p>
                            <strong>Eliminar la sucursal?</strong>
                        </p>
                    </section>
                    <p>
                        Está segur@ de eliminar la sucursal {name}?
                    </p>
                </Stack>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => confirmDelete()} type="submit" appearance="ghost" style={{ color: "#f08b33", borderColor: "#f08b33"}}>Sí</Button>
                <Button onClick={() => hiddeModal(open)} appearance="primary">No</Button>
            </ModalFooter>
        </Modal>
    )
}