/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from "axios"
import { FormEvent, useRef, useState } from "react"
import { RiLockPasswordFill } from "react-icons/ri"
import { Button, Form, Heading, InputGroup, Modal, Stack } from "rsuite"
import ModalBody from "rsuite/esm/Modal/ModalBody"
import ModalFooter from "rsuite/esm/Modal/ModalFooter"
import ModalTitle from "rsuite/esm/Modal/ModalTitle"
import { resetPasswordAsync } from "../services/user.service"
import { useResetPasswordForm } from "../hooks/useResetPassword"
import { MdVisibility } from "react-icons/md"
import { AiFillEyeInvisible } from "react-icons/ai"

interface ChangePasswordProps {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
    data: AxiosResponse,
    email: string
}

export const ChangePassword = ({open, hiddeModal, data, email}: ChangePasswordProps) => {
    const formRef = useRef<any>();
    const { formData, resetForm, updateField, validationModel } = useResetPasswordForm();
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    

    const handleVerifyCode =  (e: FormEvent) => {
        e.preventDefault();
        if(formData.code === data.data){
            setActive(false);
            console.log('Codigo valido');
        }
    }

    const handleChange = () => {
        setVisible(!visible);
    }
    

    const handleSubmit =  async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            formData.email = email;
            console.log(formData);
            const {call} =  resetPasswordAsync(formData);
            const response = await call;
            console.log(response.data);
            hiddeModal(false);
            resetForm();
        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCancel = () => {
        hiddeModal(false);
        resetForm();
    }

    return (
        <>
         <Modal size={"xs"} open={open} onClose={() => hiddeModal(false)} overflow>
                        <ModalTitle>
                            <Stack justifyContent="center" alignItems="center" direction="column">
                                <Heading level={4}>Cambio de Contraseña</Heading>
                            </Stack>   
                        </ModalTitle>
                        <ModalBody >
                            <Stack direction="row" alignItems="center" justifyContent="center" style={{overflow: 'hidden'}}>
                                <Form ref={formRef} model={validationModel} formValue={formData} fluid>
                                    <Form.Group style={{ paddingBottom: '30px' }}>
                                        <InputGroup inside >
                                            <InputGroup.Addon><RiLockPasswordFill /></InputGroup.Addon>
                                            <Form.Control
                                                name="code" 
                                                placeholder='Codigo de Recuperacion'
                                                value={formData.code}
                                                onChange={(value) => updateField('code', value)} 
                                                />
                                            <InputGroup.Button style={{color:"orange"}} type="submit" onClick={handleVerifyCode} >Verificar</InputGroup.Button>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group style={{ paddingBottom: '30px' }}>
                                        <InputGroup inside >
                                            <InputGroup.Addon><RiLockPasswordFill /></InputGroup.Addon>
                                            <Form.Control
                                                name="newPassword"
                                                type={visible ? 'text' : 'password'}
                                                placeholder='Ingrese su nueva contraseña'
                                                value={formData.newPassword}
                                                disabled={active}
                                                onChange={(value) => updateField('newPassword', value)} />
                                            <InputGroup.Button onClick={handleChange}>
                                                            {visible ? <MdVisibility /> : <AiFillEyeInvisible />}
                                            </InputGroup.Button>
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleCancel} appearance="default">Cancelar</Button>
                            <Button onClick={(e) => handleSubmit(e)} type="submit" appearance="primary" loading={isLoading}>Cambiar Contraseña</Button>
                        </ModalFooter>
                    </Modal>
        </>
    )
}