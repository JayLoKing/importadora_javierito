/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Divider, FlexboxGrid, Form, Input, InputGroup, Message, Modal, SelectPicker, useToaster, Notification } from "rsuite";
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
import { useApi } from "../../../common/services/useApi";
import { BranchOffice } from "../../branchOffice/models/branchOffice.model";
import { FormEvent, useEffect, useMemo, useRef } from "react";
import { getBranchOfficesAsync2 } from "../../branchOffice/services/branchOfficeService";
import { useCreateUserFormStore } from "../hooks/useCreateUserFormStorm";
import { createUserAsync } from "../services/user.service";

interface CreateUserModalProps {
    open: boolean;
    hiddeModal: () => void;
    onUserCreated?: () => void;
}

export default function CreateUserModal({ open, hiddeModal, onUserCreated}: CreateUserModalProps) {
    const formRef = useRef<any>();
    const toaster = useToaster();
    const {formData, validationModel, updateField, resetForm} = useCreateUserFormStore();
    const fetchBranchOfficesAsync = useMemo(() => getBranchOfficesAsync2(), []);
    const { data: dataBranchOffice, loading: loadingBranchOffice, fetch: fetchBranchOffices } = useApi<BranchOffice[]>(fetchBranchOfficesAsync, { autoFetch: false });
    useEffect(() => { fetchBranchOffices(); }, [fetchBranchOffices]);
    const roleData = ['MeroMero', 'Administrador', 'Vendedor'].map(role => ({ label: role, value: role }));
    const branchOfficeOptions = dataBranchOffice?.map(branch => ({ label: branch.name, value: branch.id })) || [];


    const showSuccessMessage = () => {
        toaster.push(
            <Message closable showIcon type="success" >
                Registro exitoso!
            </Message>,
            { placement: 'topCenter', duration: 2500 }
        );
    };

    const showSuccessNotification = () => {
        toaster.push(
            <Notification type="success" header="Registro Exitoso" closable>
                Registraste al Usuari Correctamente!
            </Notification>,
            { placement: 'bottomEnd', duration: 3000 }
        );
    }

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        formRef.current.checkAsync().then( async (formStatus: any) => {
            if (formStatus) {
                console.log("Formulario válido");
                console.log(formData);
                
                await createUserAsync(formData);
                hiddeModal();
                resetForm();
                formRef.current.reset();
                formRef.current.cleanErrors();
                showSuccessMessage();
                showSuccessNotification();
                if(onUserCreated){
                    onUserCreated();
                }
            } else {
                console.log("Formulario inválido");
            }
        });
    }

    const handleCancel = () => {
        resetForm();
        hiddeModal();
        formRef.current.reset();
        formRef.current.cleanErrors();
    }

    return(
        <Modal size={"md"} open={open} onClose={hiddeModal} overflow>
            <ModalHeader>
                <ModalTitle style={{ fontWeight: "bold" }}>Nuevo Usuario</ModalTitle> 
            </ModalHeader>
            <Form>
            <ModalBody>
               <Form ref={formRef} model={validationModel} formValue={formData}>
                    <FlexboxGrid justify="center" align="middle">
                <Divider style={{ fontWeight: 'bold', marginTop:"7px" }}>Información personal</Divider>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px', marginLeft:"auto"}}>
                            <FormGroup controlId="name">
                                <FormControlLabel>Nombres</FormControlLabel>
                                <InputGroup inside>
                                    <InputGroupAddon>
                                        <FaUser />
                                    </InputGroupAddon>
                                    <Input onChange={(value) => updateField("name", value)} name="name" placeholder="Ingrese sus nombres *" />
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
                                    <Input onChange={(value) => updateField("lastName", value)} name="lastName" placeholder="Ingrese el apellido paterno *" />
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
                                    <Input onChange={(value) => updateField("secondLastName", value)} name="secondLastName" placeholder="Ingrese el apellido materno" />
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
                                    <Input onChange={(value) => updateField("ci", value)} name="ci" placeholder="Ingrese el carnet de identidad *" />
                                </InputGroup>
                            </FormGroup>
                        </FlexboxGridItem>
                    <Divider style={{ fontWeight: 'bold', marginTop:"7px" }}>Información de contacto</Divider>
                        <FlexboxGridItem colspan={11} style={{ marginBottom: '20px', marginLeft:"auto" }}>
                            <FormGroup controlId="phoneNumber">
                                <FormControlLabel>Número de celular</FormControlLabel>
                                <InputGroup inside>
                                    <InputGroupAddon>
                                        <FaPhoneAlt />
                                    </InputGroupAddon>
                                    <Input onChange={(value) => updateField("phoneNumber", value)} name="phone" placeholder="Ingrese el número de celular *" />
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
                                    <Input onChange={(value) => updateField("email", value)} name="email" placeholder="Ingrese el correo electrónico *" />
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
                                    <SelectPicker onChange={(value) => updateField("role", value)} style={{width: "100%"}} data={roleData} searchable={false} placeholder="Seleccione el cargo del usuario *" name="role"/>
                                </InputGroup>
                            </FormGroup>
                        </FlexboxGridItem>
                        <FlexboxGridItem colspan={11} >
                                <FormGroup controlId="branchOfficeId">
                                    <FormControlLabel>Lugar de trabajo</FormControlLabel>
                                    <InputGroup inside>
                                    <InputGroupAddon>
                                        <BsPersonWorkspace />
                                    </InputGroupAddon>
                                        <SelectPicker onChange={(value) => updateField("branchOfficeId", value)} style={{width: "100%"}} data={branchOfficeOptions} loading={loadingBranchOffice} searchable={true} placeholder="Seleccione el lugar de trabajo *" name="role"/>
                                    </InputGroup>
                                </FormGroup>
                        </FlexboxGridItem>
                    </FlexboxGrid>
               </Form>
            </ModalBody>
            <ModalFooter>
                <Button onClick={(e) => handleFormSubmit(e)} type="submit" appearance="primary">Aceptar</Button>
                <Button onClick={handleCancel}>Cancelar</Button>
            </ModalFooter>
            </Form>
        </Modal>
    );
}
