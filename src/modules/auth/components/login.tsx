import { FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import { Panel, Form, Button, VStack, Image, InputGroup, useToaster, Message, HStack } from 'rsuite';
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
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function Login() {

    const [visible, setVisible] = useState(false);
    const { formValues, handleInputChange, resetForm, clearUser } = useLoginForm({ username: '', password: '' });
    const toaster = useToaster();
    const navigate = useNavigate();
    const { handleModalForgotPassword, showModal} = useForgotPasswordModal();
    useEffect(() => {
        clearUser();
    }, [clearUser])
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
            navigate('/home');
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
        <div className='login-container'>
            <div className="info-panel" >
                <div style={{ color:'#ffff', marginLeft:'10rem'}}>
                    <div className="circle-decoration-1"></div>
                    <div className="circle-decoration-2"></div>
                    <div className="circle-decoration-3"></div>
                    <div className="circle-decoration-4"></div>
                    
                    <h1>IMPORTADORA<br />JAVIERITO</h1>
                    <p style={{ fontSize:'1.3rem', textWrap:'balance', alignItems:'center'}}>Sistema de gestión integral para el control de inventario, ventas y más.</p>
                    
                    <div className="features">
                        <div className="feature-item">
                            <div style={{ fontSize: "1.3rem", display:'flex', gap:10, alignItems:'center' }}>
                                <BsFillCheckCircleFill style={{ fontSize:'1.3em' }}/>
                                Gestión de inventario de repuestos
                            </div>
                        </div>
                        
                        <div className="feature-item">
                        <div style={{ fontSize: "1.3rem", display:'flex', gap:10, alignItems:'center' }}>
                                <BsFillCheckCircleFill style={{ fontSize:'1.3em' }}/>
                                Control de ventas y recibos
                            </div>
                        </div>
                        
                        <div className="feature-item">
                            <div style={{ fontSize: "1.3rem", display:'flex', gap:10, alignItems:'center' }}>
                                <BsFillCheckCircleFill style={{ fontSize:'1.3em' }}/>
                                Gestión de sucursales 
                            </div>
                        </div>

                        <div className="feature-item">
                            <div style={{ fontSize: "1.3rem", display:'flex', gap:10, alignItems:'center' }}>
                                <BsFillCheckCircleFill style={{ fontSize:'1.3em' }}/>
                                Generación de reportes y más
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-panel-container">
                <Panel bordered className="login-panel" >
                    <HStack className="logo-container" >
                        <div style={{ borderRadius: "50%", background: "linear-gradient(to bottom right, #f97316 10%, #bd2828 90%)" }} >
                            <Image circle src={LOGO} width={120} style={{ padding: 3, cursor: "pointer" }} />
                        </div>
                    </HStack>
                    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', marginBottom:5}}>
                        <h4>¡Bienvenido!</h4>
                    </div>
                    <div>
                        <p style={{ textAlign: 'center', fontSize:'15px', marginBottom:10}}>Por seguridad jamás revele sus datos.</p>
                    </div>
                    <Form fluid onKeyDown={handleKeyDown}>
                        <FormGroup>
                            <InputGroup inside>
                                <InputGroupAddon><FaUser /></InputGroupAddon>
                                <FormControl
                                    name="username"
                                    placeholder='Ingrese su nombre de usuario *'
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
                                    placeholder='Ingrese su contraseña *'
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
                            <Button appearance="primary" block onClick={(e) => handleSubmit(e)}> Iniciar Sesión</Button>
                        </VStack>
                    </Form>
                    <ForgotPasswordForm open={showModal} hiddeModal={() => handleModalForgotPassword(false)} />
                    {/* <div className='signUpSection' >
                        <Text className='signUpText' >¿No tienes una cuenta?</Text>
                        <a onClick={() => navigate('/register')} className='link' >Registrarse</a>
                    </div> */}
                </Panel>
            </div>
        </div>
    );
}
