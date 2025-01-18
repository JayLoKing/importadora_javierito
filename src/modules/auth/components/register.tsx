import React from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { FaIdCard, FaUser } from "react-icons/fa";
import { MdEmail, MdVisibility } from "react-icons/md";
import { RiCellphoneFill, RiLockPasswordFill } from "react-icons/ri";
import { Button, Card, Col, Form, Grid, Input, InputGroup, Row, Text } from "rsuite";
import CardBody from "rsuite/esm/Card/CardBody";
import { userRegisterForm } from "../hooks/userRegisterForm";
import { useNavigate } from "react-router-dom";

const styles: Record<string, React.CSSProperties> = {
    button_center: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
    },
    buttonCustom: {
        width: '200px',
        borderRadius: '35px',
        fontSize: '16px',
        height: '45px'
    },
    formGroup: {
        marginBottom: '25px',
    },
    formControl: {
        width: '100%',
        borderRadius: '30px',
        backgroundColor: '#F5F5F5',
        height: '45px',
    },
    colMargin: {
        display: 'flex',
        justifyContent: 'center',
        margin: '10px 0',
        alignItems: 'center'
    },
    gridContainer: {
        width: '100%',
        padding: '20px'
    },
    marginContainer: {
        margin: '35px'
    },
    linkCustom: {
        color: '#F88721',
        textDecoration: 'none',
        borderBottom: '1px solid #F88721',
        transition: 'all 0.3s ease',
        marginLeft: '3px',
        cursor: 'pointer'
    },
    customInput: {
        backgroundColor: '#F5F5F5',
        borderRadius: '30px',
        fontSize: '16px',
        display: 'flex',
        alignItems: 'center',
        height: '45px',
    },
};


export default function Register() {
    const {
        formValue,
        handleInputChange,
        formRef,
        model,
        handleSubmit,
        visible,
        togglePasswordVisibility
    } = userRegisterForm();

    const navigate = useNavigate();

    return (
        <Card size="lg" shaded style={{ maxWidth: '1200px', width: '100%' }}>
            <CardBody>
                <Grid fluid style={styles.gridContainer}>
                    <Row>
                        <Col xs={24}>
                            <Row style={styles.marginContainer}>
                                <Col xs={24}>
                                    <Text size="2.5rem" align="center" weight="bold">Registro de Usuario</Text>
                                    <Text size="1rem" align="center" weight="bold">Rellene todos los campos con sus datos correctos (*Campo Obligatorio)</Text>
                                </Col>
                            </Row>
                            <Form ref={formRef} model={model} formValue={formValue} onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs={24} md={12} style={{ padding: '0 15px' }}>
                                        <Form.Group controlId={'name'} style={styles.formGroup}>
                                            <InputGroup inside style={styles.formControl}>
                                                <InputGroup.Addon style={styles.customInput}>
                                                    <FaUser />
                                                </InputGroup.Addon>
                                                <Form.Control
                                                    style={styles.customInput}
                                                    name="name"
                                                    placeholder="Nombres"
                                                    onChange={(value) => handleInputChange('name', value)}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId={'lastName'} style={styles.formGroup}>
                                            <InputGroup inside style={styles.formControl}>
                                                <InputGroup.Addon style={styles.customInput}>
                                                    <FaUser />
                                                </InputGroup.Addon>
                                                <Form.Control
                                                    style={styles.customInput}
                                                    name="lastName"
                                                    placeholder="Apellido Paterno"
                                                    onChange={(value) => handleInputChange('lastName', value)}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId={'secondLastName'} style={styles.formGroup}>
                                            <InputGroup inside style={styles.formControl}>
                                                <InputGroup.Addon style={styles.customInput}>
                                                    <FaUser />
                                                </InputGroup.Addon>
                                                <Form.Control
                                                    style={styles.customInput}
                                                    name="secondLastName"
                                                    placeholder="Apellido Materno (opcional)"
                                                    onChange={(value) => handleInputChange('secondLastName', value)}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId={'ci'} style={styles.formGroup}>
                                            <InputGroup inside style={styles.formControl}>
                                                <InputGroup.Addon style={styles.customInput}>
                                                    <FaIdCard />
                                                </InputGroup.Addon>
                                                <Form.Control
                                                    style={styles.customInput}
                                                    name="ci"
                                                    placeholder="Carnet de Identidad"
                                                    onChange={(value) => handleInputChange('ci', value)}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={24} md={12} style={{ padding: '0 15px' }}>
                                        <Form.Group controlId={'phoneNumber'} style={styles.formGroup}>
                                            <InputGroup inside style={styles.formControl}>
                                                <InputGroup.Addon style={styles.customInput}>
                                                    <RiCellphoneFill />
                                                </InputGroup.Addon>
                                                <Form.Control
                                                    style={styles.customInput}
                                                    name="phoneNumber"
                                                    placeholder="Numero de Celular"
                                                    onChange={(value) => handleInputChange('phoneNumber', value)}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId={'email'} style={styles.formGroup}>
                                            <InputGroup inside style={styles.formControl}>
                                                <InputGroup.Addon style={styles.customInput}>
                                                    <MdEmail />
                                                </InputGroup.Addon>
                                                <Form.Control
                                                    style={styles.customInput}
                                                    name="email"
                                                    placeholder="Correo Electronico"
                                                    onChange={(value) => handleInputChange('email', value)}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId={'password'} style={styles.formGroup}>
                                            <InputGroup inside style={styles.formControl}>
                                                <InputGroup.Addon style={styles.customInput}>
                                                    <RiLockPasswordFill />
                                                </InputGroup.Addon>
                                                <Form.Control
                                                    style={styles.customInput}
                                                    name="password"
                                                    type={visible ? 'text' : 'password'}
                                                    placeholder="Contraseña "
                                                    onChange={(value) => handleInputChange('password', value)}
                                                />
                                                <InputGroup.Button style={styles.customInput} onClick={togglePasswordVisibility}>
                                                    {visible ? <MdVisibility /> : <AiFillEyeInvisible />}
                                                </InputGroup.Button>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId={'confirmPassword'} style={styles.formGroup}>
                                            <InputGroup inside style={styles.formControl}>
                                                <InputGroup.Addon style={styles.customInput}>
                                                    <RiLockPasswordFill />
                                                </InputGroup.Addon>
                                                <Form.Control
                                                    style={styles.customInput}
                                                    name="confirmPassword"
                                                    type={visible ? 'text' : 'password'}
                                                    placeholder=" Confirmar Contraseña"
                                                    onChange={(value) => handleInputChange('confirmPassword', value)}
                                                />
                                                <InputGroup.Button style={styles.customInput} onClick={togglePasswordVisibility}>
                                                    {visible ? <MdVisibility /> : <AiFillEyeInvisible />}
                                                </InputGroup.Button>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={styles.button_center}>
                                    <Col xs={24}>
                                        <div style={styles.button_center}>
                                            <Button style={styles.buttonCustom} color="orange" appearance="primary" type="submit">Registrarse</Button>
                                        </div>
                                        <Text muted style={{ textAlign: 'center', marginTop: '7px' }}>
                                            ¿Ya tienes una cuenta? <a style={styles.linkCustom} onClick={() => navigate('/')}>Inicia Sesión</a>
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