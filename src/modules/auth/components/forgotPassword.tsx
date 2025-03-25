/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useRef, useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button, Form , Heading, InputGroup, Message, Stack, useToaster, Modal } from "rsuite";
import { useForgotPasswordModal, useValidateEmailForm } from "../hooks/useResetPassword";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import { getCodeByEmailAsync } from "../services/user.service";
import { ChangePassword } from "./changePassword";
import { AxiosResponse } from "axios";

interface ResetPasswordModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
}

export default function ForgotPasswordForm({ open, hiddeModal }: ResetPasswordModalParams) {
    const formRef = useRef<any>();
    const toaster = useToaster();
    const { formData, updateField, resetForm, validationModel } = useValidateEmailForm();
    const { handleModalForgotPassword, showModal } = useForgotPasswordModal();
    const [responseData, setResponseData] = useState<AxiosResponse | null>(null); 
    const [email, setEmail] = useState<string | null>();
    const [isLoading, setIsLoading] = useState(false);

    const showErrorMessage = () => {
        toaster.push(
            <Message closable showIcon type="error">
                Fallo al cambiar la contraseña. Inténtalo más tarde.
            </Message>,
            { placement: 'topCenter', duration: 3000 }
        );
    };

    async function handleVerifyEmail(e: FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { call } = getCodeByEmailAsync(formData.email);
            const response = await call;
            console.log(response.data);
            setResponseData(response); 
            setEmail(formData.email);
            handleModalForgotPassword(true);
            hiddeModal(false); 
            resetForm();
        } catch (error) {
            showErrorMessage();
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCancel = async () => {
        try {
            hiddeModal(false);
            resetForm();
        } catch (error) {
            console.error('Error al cancelar el formulario:', error);
            toaster.push(
                <Message closable showIcon type="error">
                    Error al cancelar el formulario
                </Message>,
                { placement: 'topCenter', duration: 3000 }
            );
        }
    };

    return (
        <>
            <Modal size={"xs"} open={open} onClose={() => hiddeModal(false)} overflow>
                <ModalTitle>
                    <Stack justifyContent="center" alignItems="center" direction="column">
                        <Heading level={4}>Recuperación de Contraseña</Heading>
                        <Message
                            type="info"
                            style={{ maxWidth: '300px', wordBreak: 'break-word', whiteSpace: 'normal' }}
                        >
                            <strong style={{ display: 'block' }}>¡Información!</strong>
                            Ingresa el correo registrado para enviarte el código de recuperación.
                        </Message>
                    </Stack>
                </ModalTitle>
                <ModalBody>
                    <Stack direction="row" alignItems="center" justifyContent="center" style={{ overflow: 'hidden' }}>
                        <Form ref={formRef} model={validationModel} formValue={formData} fluid>
                            <Form.Group style={{ paddingBottom: '30px' }}>
                                <InputGroup inside>
                                    <InputGroup.Addon><RiLockPasswordFill /></InputGroup.Addon>
                                    <Form.Control
                                        name="email"
                                        placeholder='Ingrese su correo registrado'
                                        value={formData.email}
                                        onChange={(value) => updateField('email', value)}
                                        style={{ width: '300px' }}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleCancel} appearance="default">Cancelar</Button>
                    <Button onClick={(e) => handleVerifyEmail(e)} type="submit" appearance="primary" loading={isLoading}>Enviar</Button>
                </ModalFooter>
            </Modal>
            {responseData && (
                <ChangePassword
                    open={showModal}
                    hiddeModal={() => handleModalForgotPassword(false)}
                    data={responseData}
                    email={email!}
                />
            )}
        </>
    );
}