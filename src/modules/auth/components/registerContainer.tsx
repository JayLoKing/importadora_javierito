import { Container, Content } from "rsuite";

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
};


export default function RegisterContainer({children}: {children: React.ReactNode}) {
    return (
        <Container style={styles.container}>
            <Content style={styles.content}>
                {children}
            </Content>
        </Container>
    );
}