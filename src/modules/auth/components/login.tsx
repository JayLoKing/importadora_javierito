import { FormEvent, KeyboardEvent, useState } from 'react';
import { Panel, Form, Button, VStack, Text, Image, InputGroup, useToaster, Message } from 'rsuite';
import LOGO from '../../../assets/LogoJavier.jpg';
import FormControl from 'rsuite/esm/FormControl';
import FormGroup from 'rsuite/esm/FormGroup';
import InputGroupButton from 'rsuite/esm/InputGroup/InputGroupButton';
import { FaUser } from 'react-icons/fa';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { MdVisibility } from 'react-icons/md';
import InputGroupAddon from 'rsuite/esm/InputGroup/InputGroupAddon';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useLoginForm } from '../hooks/useLoginForm';
import { authenticateAsync } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import "../styles/styles.css"
import { useAuthStore } from '../../../store/store';
import { useForgotPasswordModal } from '../hooks/useResetPassword';
import ForgotPasswordForm from './forgotPassword';

export default function Login() {

    const [visible, setVisible] = useState(false);
    const { formValues, handleInputChange, resetForm } = useLoginForm({ username: '', password: '' });
    const toaster = useToaster();
    const navigate = useNavigate();
    const { handleModalForgotPassword, showModal} = useForgotPasswordModal();

    const setUserAuth = useAuthStore(state => state.setAuthUser);

    function showErrorMessage() {
        toaster.push(
            <Message  centered type="error" closable showIcon header="Error de inicio de sesión">
                <p>Usuario o contraseña incorrectos.</p>
            </Message>,
            { placement: 'topCenter', duration: 3000 })
    }

    function handleChange() {
        setVisible(!visible);
    }

    async function handleSubmit(e?: FormEvent) {
        if (e) e.preventDefault();
        try {
            console.log(formValues);
            const { call } = authenticateAsync(formValues);
            const res = await call;
            setUserAuth(res.data.token);
            navigate('/items');
            resetForm();
        } catch {
            showErrorMessage();
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLFormElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit();
        }
    }

    return (
        <Panel bordered className='panel' >
            <div>
                <Text weight='bold' className='title' >¡Bienvenido!</Text>
            </div>
            <div className='logo'>
                <Image circle src={LOGO} alt='Importadora Javierito' width={100} />
            </div>
            <div>
                <Text className='subtitle' >Por seguridad jamás revele sus datos.</Text>
            </div>
            <Form fluid onKeyDown={handleKeyDown}>
                <FormGroup>
                    <InputGroup inside>
                        <InputGroupAddon><FaUser /></InputGroupAddon>
                        <FormControl
                            name="username"
                            placeholder='Ingrese su nombre de usuario'
                            value={formValues.username}
                            onChange={(value) => handleInputChange('username', value)} />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup inside>
                        <InputGroupAddon><RiLockPasswordFill /></InputGroupAddon>
                        <FormControl
                            name="password"
                            type={visible ? 'text' : 'password'}
                            placeholder='Ingrese su contraseña'
                            value={formValues.password}
                            onChange={(value) => handleInputChange('password', value)} />
                        <InputGroupButton onClick={handleChange}>
                            {visible ? <MdVisibility /> : <AiFillEyeInvisible />}
                        </InputGroupButton>
                    </InputGroup>
                </FormGroup>

                <a className='forgotPasswordText' onClick={() => handleModalForgotPassword(true)}>
                    ¿Olvidaste tu contraseña?
                </a>

                <VStack spacing={10}>
                    <Button
                        appearance="primary"
                        block
                        onClick={(e) => handleSubmit(e)}>
                        Iniciar Sesión
                    </Button>
                </VStack>
            </Form>
            <ForgotPasswordForm open={showModal} hiddeModal={() => handleModalForgotPassword(false)} />
            {/* <div className='signUpSection' >
                <Text className='signUpText' >¿No tienes una cuenta?</Text>
                <a onClick={() => navigate('/register')} className='link' >Registrarse</a>
            </div> */}
        </Panel>
    );
}
