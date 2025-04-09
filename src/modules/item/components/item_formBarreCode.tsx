/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, FC } from "react";
import { Button, InlineEdit, Modal, Stack, Text} from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import BarcodeComponent from "./barcode";

interface ItemModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
    id?: number;
}

export default function ItemBareCode ({open, hiddeModal} : ItemModalParams) {

    interface FieldProps {
            label: string;
            as: ComponentType<any>;
            defaultValue: any;
            [key: string]: any;
        }

    const Field: FC<FieldProps> = ({ label, as: Component, defaultValue, ...rest }) => {
            return (
                <Stack direction="row">
                    <label style={{ width: 70, display: 'inline-block', color: 'var(--rs-text-secondary)' }}>
                        {label}
                    </label>
                    <InlineEdit disabled defaultValue={defaultValue} />
                    <Component style={{ width: 20 }} {...rest} />
                </Stack>
            );
        };

    return (
        <>
            <Modal size={"xs"} open={open} onClose={() => hiddeModal(false)} overflow>
                <ModalTitle>
                    <Stack justifyContent="center" alignItems="center">
                        <strong>Codigo de Barra</strong>
                    </Stack>   
                </ModalTitle>
                <ModalBody>
                    <Stack spacing={24} direction="column" alignItems="center" justifyContent="center">
                            <BarcodeComponent value={"34232432BG"} />
                            <Field label="Repuesto" as={Text} defaultValue={"BOMBA DE GASOLINA"} />
                            <Field label="MARCA" as={Text} defaultValue={"TOYOTA"} />
                            <Field label="MODELO" as={Text} defaultValue={"TUNDRA"} />

                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" appearance="primary">Aceptar</Button>
                    <Button appearance="default">Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}