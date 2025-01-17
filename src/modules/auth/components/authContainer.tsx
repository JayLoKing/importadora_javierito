import React from "react";
import { Container } from "rsuite";

export default function AuthContainer({ children }: { children: React.ReactNode }) {
    return (
        <div style={styles.background}>
            <Container style={{ ...styles.container }}>
                {children}
            </Container>
        </div>

    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    background: {
        position: "relative",
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg, #f88721 50%, white 50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
};
