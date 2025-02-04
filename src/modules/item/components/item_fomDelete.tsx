import { FaExclamationCircle } from "react-icons/fa";
import { Button, Modal, Stack } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { DeleteItemAsync } from "../services/itemService";

interface ItemModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
    id: number;
    userID: number;
    name: string;
    refreshList: () => Promise<void>;
}

export default function ItemDelete({open, hiddeModal, id, userID, name, refreshList} : ItemModalParams){

    async function confirmDelete() {
        try{
            const deleted = await DeleteItemAsync(id, userID);
            if (deleted) {
                hiddeModal(false);
                await refreshList();
            }
        }catch (error){
            console.error("No se pudo eliminar el item:", error);
        }
    }

    return(
        <>
            <Modal  open={open} onClose={()=> hiddeModal(false)}>
                <ModalHeader>
                    <ModalTitle >
                        <Stack justifyContent="center" alignItems="center">
                        <FaExclamationCircle style={{color: "#f08b33", height:"30px", width:"30px", marginRight:"10px"}}/>
                            <strong>Advertencia</strong>
                        </Stack>
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Stack justifyContent="center" direction="row" spacing={5} alignItems="center">
                        <section>
                            <p>
                                <strong>Eliminar Repuesto?</strong>
                            </p>
                        </section>
                            <p>
                                Está seguro que desea eliminar el item {name}
                            </p>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={() => confirmDelete()} type="submit" appearance="ghost" style={{ color: "#f08b33", borderColor: "#f08b33"}}>Sí</Button>
                    <Button onClick={() => hiddeModal(open)} appearance="primary">No</Button>

                </ModalFooter>
            </Modal>
        </>
    )
}