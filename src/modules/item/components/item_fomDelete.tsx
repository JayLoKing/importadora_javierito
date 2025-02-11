import { FaExclamationCircle } from "react-icons/fa";
import { Button, Modal, Stack } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { DeleteItemAsync } from "../services/itemService";
import { useAuthStore } from "../../../store/store";
import { useEffect, useState } from "react";
import { AuthUser } from "../../auth/models/auth.model";
import { jwtDecoder } from "../../../utils/jwtDecoder";

interface ItemModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
    id: number;
    name: string;   
}

export default function ItemDelete({open, hiddeModal, id, name} : ItemModalParams){

    const jwt = useAuthStore(state => state.jwt);
    const [user, setUser] = useState<AuthUser>({ id: 0, userName: '', role: '' });
    
    function getRoleNUsername() {
        if (jwt) {
          let decode = jwtDecoder(jwt);
          console.log(decode)
          setUser({
            id: decode.id,
            userName: decode.sub,
            role: decode.role
          })
        } else {
          console.error("User authentication token is null");
        }
      }

    async function confirmDelete() {
        try{
            const deleted = await DeleteItemAsync(id, user.id);
            if (deleted) {
                hiddeModal(false);
            }
        }catch (error){
            console.error("No se pudo eliminar el item:", error);
        }
    }

    useEffect(()=>{
        getRoleNUsername();  
    }, [])

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