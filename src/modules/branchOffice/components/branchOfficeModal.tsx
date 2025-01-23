import { forwardRef } from "react";
import { Button, Form, Input, Modal } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";

interface BranchOfficeModalProps {
    open: boolean,
    hiddeModal: (hide: boolean) => void
}

export default function BranchOfficeModal({ open, hiddeModal }: BranchOfficeModalProps) {

    const Textarea = forwardRef<HTMLTextAreaElement>((props, ref) =>
        <Input {...props} as="textarea" rows={5} placeholder="Dirección de la sucursal" ref={ref} />);

    return (
        <Modal open={open} onClose={() => hiddeModal(false)} overflow>
            <ModalHeader>
                <ModalTitle>
                    <strong>Nueva Sucursal</strong>
                </ModalTitle>
            </ModalHeader>

            <ModalBody>
                <Form fluid>
                    <Form.Group>
                        <Form.ControlLabel>Nombre de la sucursal</Form.ControlLabel>
                        <Form.Control name="name" placeholder="Ingresa el nombre de la sucursal" />
                    </Form.Group>
                    <Form.Group>
                        <Form.ControlLabel>Dirección de la sucursal</Form.ControlLabel>
                        <Form.Control name="address" accepter={Textarea} />
                    </Form.Group>
                    <Form.Group>
                        <Form.ControlLabel>Ubicación</Form.ControlLabel>
                    </Form.Group>
                    <Form.Group>
                        <Form.ControlLabel>Imagenes de la sucursal</Form.ControlLabel>
                    </Form.Group>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button type="submit" appearance="primary">Aceptar</Button>
                <Button onClick={() => hiddeModal(open)} appearance="subtle">Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}