import { Button, Divider, FlexboxGrid, Form, Input, InputGroup, Modal } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import FormGroup from "rsuite/esm/FormGroup";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { FaUser, FaFemale, FaMale, FaIdCard, FaPhoneAlt} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BiSolidUserBadge } from "react-icons/bi";
import { BsPersonWorkspace } from "react-icons/bs";
import InputGroupAddon from "rsuite/esm/InputGroup/InputGroupAddon";

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
                                <InputGroup inside>
                                    <InputGroupAddon>
                                        <FaUser />
                                    </InputGroupAddon>
                                    <Input name="names" placeholder="Ingrese sus nombres *" />
                                </InputGroup>
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px', }}>
                            <FormGroup controlId="lastName">
                                <FormControlLabel>Apellido paterno</FormControlLabel>
                                <InputGroup inside>
                                    <InputGroupAddon>
                                        <FaMale />
                                    </InputGroupAddon>
                                    <Input name="lastName" placeholder="Ingrese el apellido paterno *" />
                                </InputGroup>
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px', marginLeft:"auto"}}>
                            <FormGroup controlId="secondLastName">
                                <FormControlLabel>Apellido materno</FormControlLabel>
                                <InputGroup inside>
                                    <InputGroupAddon>
                                        <FaFemale  />
                                    </InputGroupAddon>
                                    <Input name="secondLastName" placeholder="Ingrese el apellido materno" />
                                </InputGroup>
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="ci">
                                <FormControlLabel>Carnet de Identidad</FormControlLabel>
                                <InputGroup inside>
                                    <InputGroupAddon>
                                        <FaIdCard />
                                    </InputGroupAddon>
                                    <Input name="ci" placeholder="Ingrese el carnet de identidad *" />
                                </InputGroup>
                            </FormGroup>
                        </FlexboxGridItem>
                        <Divider style={{ fontWeight: 'bold', marginTop:"7px" }}>Información de contacto</Divider>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px', marginLeft:"auto" }}>
                            <FormGroup controlId="phone">
                                <FormControlLabel>Número de celular</FormControlLabel>
                                <InputGroup inside>
                                    <InputGroupAddon>
                                        <FaPhoneAlt />
                                    </InputGroupAddon>
                                    <Input name="phone" placeholder="Ingrese el número de celular *" />
                                </InputGroup>
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px' }}>
                            <FormGroup controlId="email">
                                <FormControlLabel>Correo electrónico</FormControlLabel>
                                <InputGroup inside>
                                    <InputGroupAddon>
                                        <MdEmail />
                                    </InputGroupAddon>
                                    <Input name="email" placeholder="Ingrese el correo electrónico *" />
                                </InputGroup>
                            </FormGroup>
                        </FlexboxGridItem>
                        <Divider style={{ fontWeight: 'bold', marginTop:"7px"}}>Datos empresariales</Divider>
                        <FlexboxGridItem colspan={11} style={{ marginLeft:"auto" }}>
                            <FormGroup controlId="role">
                                <FormControlLabel>Cargo del usuario</FormControlLabel>
                                <InputGroup inside>
                                    <InputGroupAddon>
                                        <BiSolidUserBadge />
                                    </InputGroupAddon>
                                    <Input placeholder="Seleccione el cargo del usuario *" name="role" />
                                </InputGroup>
                            </FormGroup>
                        </FlexboxGridItem>
                            <FlexboxGridItem colspan={11} >
                                <FormGroup controlId="workPlace">
                                    <FormControlLabel>Lugar de trabajo</FormControlLabel>
                                    <InputGroup inside>
                                    <InputGroupAddon>
                                        <BsPersonWorkspace />
                                    </InputGroupAddon>
                                        <Input name="workPlace" placeholder="Seleccione el lugar de trabajo *"/>
                                    </InputGroup>
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
