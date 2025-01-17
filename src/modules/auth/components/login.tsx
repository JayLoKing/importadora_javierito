import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { Panel, Form, Button, VStack, Divider } from 'rsuite';

const styles: Record<string, React.CSSProperties> = {
    panel: {
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
    },
    button: {
        marginTop: '10px',
    },
    link: {
        textAlign: 'center',
        display: 'block',
        marginTop: '10px',
        color: '#1677ff',
        textDecoration: 'none',
    },
};

export default function Login() {
    return (
        <Panel header="Sign in" bordered style={styles.panel}>
            <Form fluid>
                <Form.Group>
                    <Form.ControlLabel>Email address</Form.ControlLabel>
                    <Form.Control name="email" type="email" />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control name="password" type="password" autoComplete="off" />
                </Form.Group>

                <VStack spacing={10}>
                    <Button appearance="primary" block>
                        Sign in
                    </Button>
                    <a href="#" style={styles.link}>
                        Forgot password?
                    </a>
                </VStack>
            </Form>

            <Divider>OR</Divider>

            <Button
                appearance="default"
                block
                style={styles.button}
                startIcon={<FaGithub />}
                href="https://github.com/rsuite/rsuite"
            >
                Continue with Github
            </Button>
        </Panel>
    );
}
