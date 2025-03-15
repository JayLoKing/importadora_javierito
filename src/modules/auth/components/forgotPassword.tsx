/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useRef, useState } from "react";
import { MdVisibility } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button, Form , Heading, InputGroup, Message, Stack, useToaster, Modal, Divider, Loader } from "rsuite";
import { useResetPasswordForm, useValidateEmailForm } from "../hooks/useResetPassword";
import { AiFillEyeInvisible } from "react-icons/ai";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import { getCodeByEmailAsync, resetPasswordAsync } from "../services/user.service";
import { useApi } from "../../../common/services/useApi";

interface ResetPasswordModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
}

export default function ForgotPasswordForm({open, hiddeModal} : ResetPasswordModalParams) {
    const formRef = useRef<any>();
    const formRefPassword = useRef<any>();
    const toaster = useToaster();
    const [showFormChangePassword, setShowFormChangePassword] = useState(false);
    const [visible, setVisible] = useState(false);
    const [only, setOnly] = useState(false);
    const {formData, updateField, resetForm, validationModel} = useValidateEmailForm();
    const {formData: formDataPassword, updateField: updateFieldPassword, resetForm: resetFormPassword, validationModel: validationModelPassword} = useResetPasswordForm();

    const { data, fetch, loading } = useApi<string>(null, { autoFetch: false });

    const showSuccessMessage = () => {
        toaster.push(
            <Message closable showIcon type="success">
                Cambio de Contraseña Exitoso!
            </Message>,
            { placement: 'topCenter', duration: 3000 }
        );
    };

    const showErrorMessage = () => {
        toaster.push(
            <Message closable showIcon type="error">
                Fallo al cambiar la contraseña.
                Intentalo mas tarde.
            </Message>,
            { placement: 'topCenter', duration: 3000 }
        );
    };

    function handleChange() {
        setVisible(!visible);
    }
    

    async function handleVerifyEmail(e: FormEvent) {
        e.preventDefault();
        try{
            console.log(formData.email);
            await fetch(getCodeByEmailAsync(formData.email));
        }catch(error) {
            console.log(error);
        } 
    }

    function handleVerifyCode() {
        if (data && data === formData.code) {
            setShowFormChangePassword(true);
            setOnly(true);
        } else {
            showErrorMessage();
        }
    }

    const handleCancel = async () => {
            try {
                hiddeModal(false);
                setShowFormChangePassword(false);
                resetFormPassword();
                resetForm();
                setOnly(false);
            } catch (error) {
                console.error('Error al cancelar el formulario:', error);
                toaster.push(
                    <Message closable showIcon type="error">
                        Error al cancelar el formulario
                    </Message>,
                    { placement: 'topCenter', duration: 3000 }
                );
            }
        }

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formRefPassword.current) return false;
        try {
            formDataPassword.email = formData.email;
            await resetPasswordAsync(formDataPassword);

            hiddeModal(false);
            showSuccessMessage();
            setShowFormChangePassword(false);
            resetFormPassword();
            resetForm();
            setOnly(false);
        } catch (error) {
            console.error('Fallo en la validacion del Formulario: ', error);
            showErrorMessage();
        }
    };

    return (
        <>
            <Modal size={"md"} open={open} onClose={() => hiddeModal(false)} overflow>
                <ModalTitle>
                    <Stack justifyContent="center" alignItems="center">
                        <Heading level={3}>Recuperacion de Contraseña</Heading>
                    </Stack>   
                </ModalTitle>
                <ModalBody>
                <Stack direction="column" alignItems="center" justifyContent="flex-start">
                        <Form ref={formRef} model={validationModel} formValue={formData} fluid>
                            <Form.Group>
                                <InputGroup inside>
                                    <InputGroup.Addon><RiLockPasswordFill /></InputGroup.Addon>
                                    <Form.Control
                                        name="email" 
                                        placeholder='Ingrese su correo registrado'
                                        value={formData.email}
                                        onChange={(value) => updateField('email', value)} />
                                    
                                    <InputGroup.Button style={{color:"orange"}} type="submit" onClick={handleVerifyEmail} >Enviar</InputGroup.Button>
                                </InputGroup>
                            </Form.Group>
                            {loading ? (
                                <Loader content="Verificando correo..." vertical />
                            ):(
                                <Form.Group>
                                    <InputGroup inside>
                                    <InputGroup.Addon><RiLockPasswordFill /></InputGroup.Addon>
                                    <Form.Control
                                        name="code"
                                        placeholder='Ingrese el codigo enviado a su correo'
                                        value={formData.code}
                                        onChange={(value) => updateField('code', value)} />
                                    <InputGroup.Button style={{color:"orange"}} type="button" onClick={handleVerifyCode}>Verificar</InputGroup.Button>
                                    </InputGroup>
                                </Form.Group>
                            )}
                        </Form>
                        {!showFormChangePassword ? (<></>) : (
                                       <>
                                        <Divider>Cambio de Contraseña</Divider>
                                         <Form ref={formRefPassword} model={validationModelPassword} formValue={formDataPassword} fluid>
                                            <Form.Group>
                                                    <InputGroup inside>
                                                        <InputGroup.Addon><RiLockPasswordFill /></InputGroup.Addon>
                                                            <Form.Control
                                                                name="newPassword"
                                                                type={visible ? 'text' : 'password'}
                                                                placeholder='Ingrese su nueva contraseña'
                                                                value={formDataPassword.newPassword}
                                                                onChange={(value) => updateFieldPassword('newPassword', value)} />
                                                        <InputGroup.Button onClick={handleChange}>
                                                            {visible ? <MdVisibility /> : <AiFillEyeInvisible />}
                                                        </InputGroup.Button>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group>
                                                    <InputGroup inside>
                                                        <InputGroup.Addon><RiLockPasswordFill /></InputGroup.Addon>
                                                            <Form.Control
                                                                name="confirmPassword"
                                                                type={visible ? 'text' : 'password'}
                                                                placeholder='Confirme su nueva contraseña'
                                                                value={formDataPassword.confirmPassword}
                                                                onChange={(value) => updateFieldPassword('confirmPassword', value)} />
                                                            <InputGroup.Button onClick={handleChange}>
                                                                {visible ? <MdVisibility /> : <AiFillEyeInvisible />}
                                                            </InputGroup.Button>
                                                        </InputGroup>
                                                </Form.Group>
                                        </Form>   
                                       </> 
                                    ) }
                        </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button  disabled={!only} onClick={(e) => handleFormSubmit(e)} type="submit" appearance="primary">Cambiar Contraseña</Button>
                    <Button onClick={handleCancel} appearance="default">Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
    
}