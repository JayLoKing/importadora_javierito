import { FaExclamationTriangle } from "react-icons/fa";
import { Button, Modal } from "rsuite";
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
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <FaExclamationTriangle style={{ marginRight: 10 }} />
                        <strong>Advertencia</strong>
                    </div>
                </ModalTitle>
            </ModalHeader>
            <ModalBody>
                <section>
                    <p>
                        <strong>Eliminar la sucursal?</strong>
                    </p>
                </section>
                <p>
                    Está segur@ de eliminar la sucursal {name}?
                </p>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => confirmDelete()} appearance="primary">
                    Aceptar
                </Button>
                <Button onClick={() => hiddeModal(open)}>
                    Cancelar
                </Button>
            </ModalFooter>
        </Modal>
    )
}