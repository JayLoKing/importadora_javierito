import { FaExclamationCircle } from "react-icons/fa";
import { Button, Modal, Stack } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";

interface ItemModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
}

export default function ItemDelete({open, hiddeModal} : ItemModalParams){

    return(
        <>
            <Modal style={{display:"flex", justifyContent:"center", alignItems:"center", fontSize:"14px", border:"#f08b33"}} size={"lg"} open={open} onClose={()=> hiddeModal(false)}>
                <ModalTitle >
                    <Stack justifyContent="center" alignItems="center">
                        <strong>Eliminar Repuesto</strong>
                    </Stack>   
                </ModalTitle>
                <ModalBody>
                    <Stack justifyContent="center" direction="row" spacing={5} alignItems="center">
                        <FaExclamationCircle style={{color: "#f08b33", height:"30px", width:"30px", marginRight:"2px"}}/>Está seguro que desea eliminar este registro?
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" appearance="ghost" style={{ color: "#f08b33", borderColor: "#f08b33"}}>Sí</Button>
                    <Button onClick={() => hiddeModal(open)} appearance="primary">No</Button>

                </ModalFooter>
            </Modal>
        </>
    )
}