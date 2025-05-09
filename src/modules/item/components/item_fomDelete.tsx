import { FaExclamationTriangle } from "react-icons/fa";
import { Button, Modal, Stack } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { deleteItemAsync } from "../services/item.service";
import { useAuthStore } from "../../../store/store";
import { FormEvent, useState } from "react";
interface ItemModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
    id: number;
    name: string;
    onItemDeleted?: () => void;  
}

export default function ItemDelete({open, hiddeModal, id, name, onItemDeleted} : ItemModalParams){
    const {userId} = useAuthStore();
    const [loading, setLoading] = useState<boolean>(false);

    async function confirmDelete(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            console.log("id", id, "user.id", userId);
            await deleteItemAsync(id, userId!); 
            hiddeModal(false);
            if(onItemDeleted){
                onItemDeleted();
            }
          } catch (err) {
            console.error("No se pudo eliminar el item:", err);
          } finally {
            setLoading(false);
          }
      }

    return(
        <>
            <Modal  open={open} onClose={()=> hiddeModal(false)} backdrop="static">
                <ModalHeader>
                    <ModalTitle >
                        <Stack >
                        <FaExclamationTriangle style={{color: "#f08b33", height:"30px", width:"30px", marginRight:"10px"}}/>
                            <strong>Advertencia</strong>
                        </Stack>
                    </ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Stack justifyContent="center" direction="row" spacing={5} alignItems="center">
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <p style={{ color: '#d32f2f', marginBottom:5 }}><strong>¡Atención!</strong> Esta acción no se puede deshacer.</p>
                            <div style={{ display:'flex', gap:10 }}>
                            <section>
                                <p>
                                    <strong>¿Eliminar Registro?</strong>
                                </p>
                            </section>
                                <p>
                                    Está segur@ que desea eliminar el registro: <strong>{name}</strong>
                                </p>
                            </div>
                        </div>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => confirmDelete(e)} loading={loading} type="submit" appearance="ghost" style={{ color: "#f08b33", borderColor: "#f08b33"}}>Sí</Button>
                    <Button onClick={() => hiddeModal(open)} appearance="primary">No</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}