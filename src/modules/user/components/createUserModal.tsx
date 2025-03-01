import { Button, Divider, FlexboxGrid, Form, Modal } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import FormControl from "rsuite/esm/FormControl";
import FormGroup from "rsuite/esm/FormGroup";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";

interface CreateUserModalProps {
    open: boolean;
    hiddeModal: () => void;
}

export default function CreateUserModal({ open, hiddeModal}: CreateUserModalProps) {
    return(
        <Modal size={"md"} open={open} onClose={hiddeModal} overflow>
            <ModalHeader>
                <ModalTitle style={{ fontWeight: "bold" }}>Nuevo Usuario</ModalTitle> 
            </ModalHeader>
            <Form>
            <ModalBody>
                <FlexboxGrid justify="center" align="middle">
                    <Divider style={{ fontWeight: 'bold', marginTop:"7px" }}>Información personal</Divider>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px', marginLeft:"auto"}}>
                            <FormGroup controlId="names">
                                <FormControlLabel>Nombres</FormControlLabel>
                                <FormControl name="name" placeholder="Ingrese sus nombres*" />
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px', }}>
                            <FormGroup controlId="lastName">
                                <FormControlLabel>Apellido paterno</FormControlLabel>
                                <FormControl name="lastName" placeholder="Ingrese el apellido paterno*" />
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px', marginLeft:"auto"}}>
                            <FormGroup controlId="secondLastName">
                                <FormControlLabel>Apellido materno</FormControlLabel>
                                <FormControl name="secondLastName" placeholder="Ingrese el apellido materno" />
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="secondLastName">
                                <FormControlLabel>Carnet de Identidad</FormControlLabel>
                                <FormControl name="secondLastName" placeholder="Ingrese el carnet de identidad*" />
                            </FormGroup>
                        </FlexboxGridItem>
                        <Divider style={{ fontWeight: 'bold', marginTop:"7px" }}>Información de contacto</Divider>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px', marginLeft:"auto" }}>
                            <FormGroup controlId="phone">
                                <FormControlLabel>Número de celular</FormControlLabel>
                                <FormControl name="phone" placeholder="Ingrese el número de celular*" />
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="email">
                                <FormControlLabel>Correo electrónico</FormControlLabel>
                                <FormControl name="email" placeholder="Ingrese el correo electrónico*" />
                            </FormGroup>
                        </FlexboxGridItem>
                        <Divider style={{ fontWeight: 'bold', marginTop:"7px"}}>Datos empresariales</Divider>
                        <FlexboxGridItem colspan={11} style={{ marginLeft:"auto" }}>
                            <FormGroup controlId="role">
                                <FormControlLabel>Cargo del usuario</FormControlLabel>
                                <FormControl placeholder="Seleccione el cargo del usuario*" name="role" />
                            </FormGroup>
                        </FlexboxGridItem>
                            <FlexboxGridItem colspan={11} >
                                <FormGroup controlId="workPlace">
                                    <FormControlLabel>Lugar de trabajo</FormControlLabel>
                                    <FormControl name="workPlace" placeholder="Seleccione el lugar de trabajo*"/>
                                </FormGroup>
                            </FlexboxGridItem>
                </FlexboxGrid>
            </ModalBody>
            <ModalFooter>
                <Button type="submit" appearance="primary">Aceptar</Button>
                <Button onClick={() => {hiddeModal();}}>Cancelar</Button>
            </ModalFooter>
            </Form>
        </Modal>
    );
}
