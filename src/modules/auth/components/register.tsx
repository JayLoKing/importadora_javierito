import { AiFillEyeInvisible } from "react-icons/ai";
import { FaIdCard, FaUser } from "react-icons/fa";
import { MdEmail, MdVisibility } from "react-icons/md";
import { RiCellphoneFill, RiLockPasswordFill } from "react-icons/ri";
import { Button, Card, Col, Form, Grid, InputGroup, Message, Row, Text, useToaster } from "rsuite";
import CardBody from "rsuite/esm/Card/CardBody";
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
        <Card size="lg" shaded style={{ maxWidth: '900px', width: '100%' }}>
           <CardBody>
            <Grid fluid className="gridContainer">  
                <Row>  
                    <Col xs={24}> 
                        <Row className="marginContainer">
                            <Col xs={24}>
                                <Text size="2.5rem" align="center" weight="bold">Registro de Usuario</Text>
                                <Text size="1rem" align="center" weight="bold">Rellene todos los campos con sus datos correctos (*Campo Obligatorio)</Text>
                            </Col>
                        </Row>
                        <Form  ref={formRef} model={model} formValue={formValue}  onSubmit={handleFormSubmit}>
                            <Row>
                                <Col xs={24} md={12} style={{ padding: '0 15px' }}>
                                    <Form.Group controlId={'name'} className="formGroup">
                                        <InputGroup inside className="formControl" >
                                            <InputGroup.Addon className="customInput" >
                                                <FaUser />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                className="customInput"
                                                name="name"
                                                placeholder="Nombres"
                                                onChange={(value) => handleInputChange('name', value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    
                                    <Form.Group controlId={'lastName'} className="formGroup" >
                                        <InputGroup inside className="formControl" >
                                            <InputGroup.Addon className="customInput">
                                                <FaUser />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                className="customInput"
                                                name="lastName"
                                                placeholder="Apellido Paterno"
                                                onChange={(value) => handleInputChange('lastName', value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId={'secondLastName'} className="formGroup">
                                        <InputGroup inside className="formControl">
                                            <InputGroup.Addon className="customInput" >
                                                <FaUser />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                className="customInput"
                                                name="secondLastName"
                                                placeholder="Apellido Materno (opcional)"
                                                onChange={(value) => handleInputChange('secondLastName', value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId={'ci'} className="formGroup" >
                                        <InputGroup inside className="formControl">
                                            <InputGroup.Addon className="customInput" >
                                                <FaIdCard />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                className="customInput"
                                                name="ci"
                                                placeholder="Carnet de Identidad"
                                                onChange={(value) => handleInputChange('ci', value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col xs={24} md={12} style={{ padding: '0 15px' }}> 
                                    <Form.Group controlId={'phoneNumber'} className="formGroup" >
                                        <InputGroup inside className="formControl" >
                                            <InputGroup.Addon className="customInput">
                                                <RiCellphoneFill />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                className="customInput"
                                                name="phoneNumber"
                                                placeholder="Numero de Celular"
                                                onChange={(value) => handleInputChange('phoneNumber', value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId={'email'} className="formGroup" >
                                        <InputGroup inside className="formControl">
                                            <InputGroup.Addon className="customInput">
                                                <MdEmail />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                className="customInput"
                                                name="email"
                                                placeholder="Correo Electronico"
                                                onChange={(value) => handleInputChange('email', value)}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId={'password'} className="formGroup" >
                                        <InputGroup inside className="formControl" >
                                            <InputGroup.Addon className="customInput" >
                                                <RiLockPasswordFill />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                className="customInput"
                                                name="password"
                                                type={visible ? 'text' : 'password'}
                                                placeholder="Contraseña "
                                                onChange={(value) => handleInputChange('password', value)}
                                                />
                                            <InputGroup.Button className="customInput" onClick={togglePasswordVisibility}>
                                                {visible ? <MdVisibility /> : <AiFillEyeInvisible />}
                                            </InputGroup.Button>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId={'confirmPassword'} className="formGroup" >
                                        <InputGroup inside className="formControl" >
                                            <InputGroup.Addon className="customInput">
                                                <RiLockPasswordFill />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                    className="customInput"
                                                    name="confirmPassword"
                                                    type={visible ? 'text' : 'password'}
                                                    placeholder=" Confirmar Contraseña"
                                                    onChange={(value) => handleInputChange('confirmPassword', value)}
                                                />
                                            <InputGroup.Button className="customInput" onClick={togglePasswordVisibility}>
                                                {visible ? <MdVisibility /> : <AiFillEyeInvisible />}
                                            </InputGroup.Button>
                                        </InputGroup>
                                    </Form.Group>
                                </Col> 
                            </Row>
                            <Row className="button_center" >
                                <Col xs={24}>
                                    <div className="button_center">
                                        <Button className="buttonCustom" color="orange" appearance="primary" type="submit">Registrarse</Button>
                                    </div>
                                    <Text muted style={{ textAlign: 'center', marginTop: '7px' }}>
                                        ¿Ya tienes una cuenta? <a onClick={() => navigate('/login')} className="linkCustom">Iniciar Sesión</a>
                                    </Text>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Grid>
           </CardBody>
        </Card>
    );
}