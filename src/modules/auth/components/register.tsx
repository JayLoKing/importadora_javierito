import React from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { FaIdCard, FaUser } from "react-icons/fa";
import { MdEmail, MdVisibility } from "react-icons/md";
import { RiCellphoneFill, RiLockPasswordFill } from "react-icons/ri";
import { Button, Card, Col, Form, Grid, Input, InputGroup, Row, Text } from "rsuite";
import CardBody from "rsuite/esm/Card/CardBody";

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
    },
    customInput: {
        backgroundColor: '#F5F5F5',
        borderRadius: '30px',
        fontSize: '16px',
        display:'flex',
        alignItems: 'center',
        height: '45px',
    },
};

export default function Register() {
    const [visible, setVisible] = React.useState(false);

    const handleChange = () => {
        setVisible(!visible);
    }

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
                        <Form>
                            <Row>
                                <Col xs={24} md={12} style={{ padding: '0 15px' }}>
                                    <Form.Group controlId={'names'} style={styles.formGroup}>
                                        <InputGroup inside style={styles.formControl}>
                                            <InputGroup.Addon style={styles.customInput}>
                                                <FaUser />
                                            </InputGroup.Addon>
                                            <Form.Control
                                                style={styles.customInput}
                                                name="names"
                                                placeholder="Nombres"
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
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId={'password'} style={styles.formGroup}>
                                        <InputGroup inside style={styles.formControl}>
                                            <InputGroup.Addon style={styles.customInput}>
                                                <RiLockPasswordFill />
                                            </InputGroup.Addon>
                                            <Input style={styles.customInput} name="password" placeholder="Contraseña" type={visible ? 'text' : 'password'}></Input>
                                            <InputGroup.Button style={styles.customInput} onClick={handleChange}>
                                                {visible ? <MdVisibility /> : <AiFillEyeInvisible />}
                                            </InputGroup.Button>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId={'confirmPassword'} style={styles.formGroup}>
                                        <InputGroup inside style={styles.formControl}>
                                            <InputGroup.Addon style={styles.customInput}>
                                                <RiLockPasswordFill />
                                            </InputGroup.Addon>
                                            <Input style={styles.customInput} name="confirmPassword" placeholder="Confirmar Contraseña" type={visible ? 'text' : 'password'}></Input>
                                            <InputGroup.Button style={styles.customInput} onClick={handleChange}>
                                                {visible ? <MdVisibility /> : <AiFillEyeInvisible />}
                                            </InputGroup.Button>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={styles.button_center}>
                                <Col xs={24}>
                                    <div style={styles.button_center}>
                                        <Button style={styles.buttonCustom} color="orange" appearance="primary">Registrarse</Button>
                                    </div>
                                    <Text  muted style={{ textAlign: 'center', marginTop: '7px' }}>
                                        ¿Ya tienes una cuenta? <a style={styles.linkCustom} href="/login">Inicia Sesión</a>
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