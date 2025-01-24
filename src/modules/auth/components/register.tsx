import { AiFillEyeInvisible } from "react-icons/ai";
import { FaIdCard, FaUser } from "react-icons/fa";
import { MdEmail, MdVisibility } from "react-icons/md";
import { RiCellphoneFill, RiLockPasswordFill } from "react-icons/ri";
import { Button, Col, Form, Grid, InputGroup, Message, Panel, Row, Text, useToaster, VStack } from "rsuite";
import { userRegisterForm } from "../hooks/userRegisterForm";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css"

export default function Register() {
    const toaster = useToaster();
    const navigate = useNavigate();

    const showSuccessMessage = () => {
        toaster.push(
            <Message closable showIcon type="success" >
                Registro exitoso
            </Message>,
            { placement: 'topCenter', duration: 3000 }
        );
    };

    const {
        formValue,
        handleInputChange,
        formRef,
        model,
        handleSubmit,
        visible,
        togglePasswordVisibility
    } = userRegisterForm();

    const handleFormSubmit = async () => {
        const success = await handleSubmit(showSuccessMessage);
        if (!success) {
            toaster.push(
                <Message closable showIcon type="error">
                    Hubo un error en el registro
                </Message>,
                { placement: 'topCenter', duration: 3000 }
            );
        }
    };

    return (
        <Panel bordered className="panelRegister">
            <Grid fluid className="gridContainer">
                <Row>
                    <Col>
                        <Row className="subtitle">
                            <Col xs={24}>
                                <Text className="title" align="center" weight="bold">Registro de Usuario</Text>
                                <Text align="center" weight="bold">Rellene todos los campos con sus datos correctos (*Campo Obligatorio)</Text>
                            </Col>
                        </Row>
                        <Form ref={formRef} model={model} formValue={formValue} onSubmit={handleFormSubmit}>
                            <Row>
                                <Col style={{ padding: '5px 15px' }}>
                                    <Form.Group controlId={'name'}>
                                        <InputGroup inside >
                                            <InputGroup.Addon>
                                                <FaUser />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                name="name"
                                                placeholder="Nombres"
                                                onChange={(value) => handleInputChange('name', value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group controlId={'lastName'} >
                                        <InputGroup inside>
                                            <InputGroup.Addon >
                                                <FaUser />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                name="lastName"
                                                placeholder="Apellido Paterno"
                                                onChange={(value) => handleInputChange('lastName', value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId={'secondLastName'} >
                                        <InputGroup inside>
                                            <InputGroup.Addon>
                                                <FaUser />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                name="secondLastName"
                                                placeholder="Apellido Materno (opcional)"
                                                onChange={(value) => handleInputChange('secondLastName', value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId={'ci'} >
                                        <InputGroup inside >
                                            <InputGroup.Addon >
                                                <FaIdCard />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                name="ci"
                                                placeholder="Carnet de Identidad"
                                                onChange={(value) => handleInputChange('ci', value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col style={{ padding: '5px 15px' }}>
                                    <Form.Group controlId={'phoneNumber'} >
                                        <InputGroup inside  >
                                            <InputGroup.Addon>
                                                <RiCellphoneFill />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                name="phoneNumber"
                                                placeholder="Numero de Celular"
                                                onChange={(value) => handleInputChange('phoneNumber', value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId={'email'} >
                                        <InputGroup inside>
                                            <InputGroup.Addon >
                                                <MdEmail />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                name="email"
                                                placeholder="Correo Electronico"
                                                onChange={(value) => handleInputChange('email', value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId={'password'}>
                                        <InputGroup inside>
                                            <InputGroup.Addon>
                                                <RiLockPasswordFill />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                name="password"
                                                type={visible ? 'text' : 'password'}
                                                placeholder="Contraseña "
                                                onChange={(value) => handleInputChange('password', value)}
                                            />
                                            <InputGroup.Button onClick={togglePasswordVisibility}>
                                                {visible ? <MdVisibility /> : <AiFillEyeInvisible />}
                                            </InputGroup.Button>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId={'confirmPassword'} >
                                        <InputGroup inside >
                                            <InputGroup.Addon>
                                                <RiLockPasswordFill />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                name="confirmPassword"
                                                type={visible ? 'text' : 'password'}
                                                placeholder=" Confirmar Contraseña"
                                                onChange={(value) => handleInputChange('confirmPassword', value)}
                                            />
                                            <InputGroup.Button onClick={togglePasswordVisibility}>
                                                {visible ? <MdVisibility /> : <AiFillEyeInvisible />}
                                            </InputGroup.Button>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="button_center" >
                                <Col>
                                    <div className="button_center">
                                        <VStack spacing={10}>
                                            <Button appearance="primary" style={{ width: 250 }} type="submit">Registrarse</Button>
                                        </VStack>
                                    </div>
                                    <Text muted style={{ textAlign: 'center', marginTop: '7px' }}>
                                        ¿Ya tienes una cuenta? <a onClick={() => navigate('/login')} className="link">Iniciar Sesión</a>
                                    </Text>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        </Panel>
    );
}