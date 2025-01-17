import React from "react";
import { Container } from "rsuite";

export default function AuthContainer({ children }: { children: React.ReactNode }) {
    return (
        <Container style={{ ...styles }}>
            {children}
        </Container>
    )
}

const styles: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: "20px",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
};
