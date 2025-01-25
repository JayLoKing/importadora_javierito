import { forwardRef } from "react";
import { Button, Container, Form, Input, Modal, Uploader, Grid, Row, Col } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import Map from "./map";

interface BranchOfficeModalProps {
    open: boolean,
    hiddeModal: (hide: boolean) => void
}

export default function BranchOfficeModal({ open, hiddeModal }: BranchOfficeModalProps) {

    const Textarea = forwardRef<HTMLTextAreaElement>((props, ref) =>
        <Input {...props} as="textarea" rows={5} placeholder="Dirección de la sucursal" ref={ref} />);

    return (
        <Modal size={"lg"} open={open} onClose={() => hiddeModal(false)} overflow>
            <ModalHeader>
                <ModalTitle>
                    <strong>Nueva Sucursal</strong>
                </ModalTitle>
            </ModalHeader>

            <ModalBody>
                <Grid fluid>
                    <Row>
                        <Col xs={12}>
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
                                    <Form.ControlLabel>Imágenes de la sucursal</Form.ControlLabel>
                                    <Uploader listType="picture-text" action="//jsonplaceholder.typicode.com/posts/">
                                        <Button appearance="default">Seleccionar Imágenes...</Button>
                                    </Uploader>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Ubicación</Form.ControlLabel>
                                <Container>
                                    <Map />
                                </Container>
                            </Form.Group>
                        </Col>
                    </Row>
                </Grid>
            </ModalBody>
            <ModalFooter>
                <Button type="submit" appearance="primary">Aceptar</Button>
                <Button onClick={() => hiddeModal(open)} appearance="default">Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}