import { Button, Grid, Message, Modal, Stack, useToaster } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { UpdateStockItem } from "../models/item.model";
import { FetchDataAsync } from "../services/itemService";
import { ItemUpdateStock } from "../hooks/useItemUpdateStock";

interface ItemUpdateStockParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
}

const urlUpdateStockItem = "";

export default function ItemForm({open, hiddeModal} : ItemUpdateStockParams){
    const toaster = useToaster();
    // const { data: dataBranchOffice, loading: loadingBranchOffice } = FetchDataAsync<UpdateStockItem[]>(urlUpdateStockItem);
    const showSuccessMessage = () => {
        toaster.push(
            <Message closable showIcon type="success" >
                Registro exitoso
            </Message>,
            { placement: 'topCenter', duration: 3000 }
        );
    };

    const {
        formValue,
        handleInputChange,
        formRef,
        model,
        handleSubmit,
       
    } = ItemUpdateStock();

    const handleFormSubmit = async () => {
        const success = await handleSubmit(showSuccessMessage);
        if (!success) {
            toaster.push(
                <Message closable showIcon type="error">
                    Hubo un error en el registro
                </Message>,
                { placement: 'topCenter', duration: 3000 }
            );
        }
    };

    return (
        <>
            <Modal size={"lg"} open={open} onClose={() => hiddeModal(false)} overflow>
                <ModalTitle>
                    <Stack justifyContent="center" alignItems="center">
                        <strong>Nuevo Respuesto</strong>
                    </Stack>   
                </ModalTitle>
                <ModalBody>
                    <Grid fluid>
                        <Stack spacing={24} direction="row" alignItems="flex-start" justifyContent="center">
                             
                        </Stack>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" appearance="primary">Registrar</Button>
                    <Button onClick={() => hiddeModal(open)} appearance="default">Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
