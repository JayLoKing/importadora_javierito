import { FormEvent, useState } from 'react';
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

export default function Login() {

    const [visible, setVisible] = useState(false);
    const { formValues, handleInputChange, resetForm } = useLoginForm({ username: '', password: '' });
    const toaster = useToaster();
    const navigate = useNavigate();

    function showErrorMessage() {
        toaster.push(
            <Message type="error" closable showIcon header="Error de inicio de sesión">
                <p>Usuario o contraseña incorrectos.</p>
            </Message>,
            { duration: 3000 })
    }

    function handleChange() {
        setVisible(!visible);
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const res = await authenticateAsync(formValues);
        if (res === null) {
            showErrorMessage();
        } else {
            console.log(res);
        }
        resetForm();
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
            <Form fluid>
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

                <a className='forgotPasswordText' >
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

            <div className='signUpSection' >
                <Text className='signUpText' >¿No tienes una cuenta?</Text>
                <a onClick={() => navigate('/register')} className='link' >Registrarse</a>
            </div>
        </Panel>
    );
}
