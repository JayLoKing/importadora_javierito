import React from 'react';
import { Panel, Form, Button, VStack, Text, Image, FlexboxGrid } from 'rsuite';
import LOGO from '../../../assets/LogoJavier.jpg';
import FormControl from 'rsuite/esm/FormControl';
import FormGroup from 'rsuite/esm/FormGroup';

const styles: Record<string, React.CSSProperties> = {
    panel: {
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        background: 'white'
    },
    button: {
        marginTop: '10px',
    },
    link: {
        color: '#f08b33',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    title: {
        textAlign: 'center',
        fontSize: '25px',
        padding: '10px'
    },
    subtitle: {
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        marginBottom: '10px'
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'
    },
    signUpSection: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '10px',
        flexWrap: 'wrap',
    },
    signUpText: {
        marginRight: '5px',
        fontSize: '14px',
        color: '#757575',
    }
};

export default function Login() {
    return (
        <Panel bordered style={styles.panel}>
            <div>
                <Text weight='bold' style={styles.title}>¡Bienvenido!</Text>
            </div>
            <div style={styles.logo}>
                <Image circle src={LOGO} alt='Importadora Javierito' width={100} />
            </div>
            <div>
                <Text style={styles.subtitle}>Por seguridad jamás revele sus datos.</Text>
            </div>
            <Form fluid>
                <FormGroup>
                    <FormControl name="email" type="email" placeholder='Ingrese su nombre de usuario' />
                </FormGroup>
                <FormGroup>
                    <FormControl name="password" type="password" autoComplete="off" placeholder='Ingrese su contraseña' />
                </FormGroup>

                <a href="#" style={{ color: '#f08b33', display: 'block', marginTop: '-15px', marginBottom: '15px', textAlign: 'right' }}>
                    ¿Olvidaste tu contraseña?
                </a>

                <VStack spacing={10}>
                    <Button appearance="primary" block>
                        Iniciar Sesión
                    </Button>
                </VStack>
            </Form>

            <div style={styles.signUpSection}>
                <Text style={styles.signUpText}>¿No tienes una cuenta?</Text>
                <a href="#" style={styles.link}>Registrarse</a>
            </div>
        </Panel>
    );
}
