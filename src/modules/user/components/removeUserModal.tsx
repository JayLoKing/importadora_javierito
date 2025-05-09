import { FaExclamationTriangle } from "react-icons/fa";
import { Button, Modal, Stack } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";

import { useAuthStore } from "../../../store/store";
import { useEffect, useState } from "react";
import { AuthUser } from "../../auth/models/auth.model";
import { jwtDecoder } from "../../../utils/jwtDecoder";

interface UserModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
    id: number;
    name: string;
    onItemDeleted?: () => void;  
}

export default function UserDelete({open, hiddeModal, id, name, onItemDeleted} : UserModalParams){

    const jwt = useAuthStore(state => state.jwt);
    const [user, setUser] = useState<AuthUser>({ id: 0, userName: '', role: '' });
    
    function getRoleNUsername() {
        if (jwt) {
          const decode = jwtDecoder(jwt);
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
        try {
            console.log("id", id, "user.id", user.id);
            // await deleteItemAsync(id, user.id); 
            hiddeModal(false);
            if(onItemDeleted){
                onItemDeleted();
            }
          } catch (err) {
            console.error("No se pudo eliminar el item:", err);
          }
      }

    useEffect(()=>{
        getRoleNUsername();  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                                    <strong>¿Eliminar Usuario?</strong>
                                </p>
                            </section>
                                <p>
                                    Está segur@ que desea eliminar el usuario: <strong>{name}</strong>
                                </p>
                            </div>
                        </div>
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