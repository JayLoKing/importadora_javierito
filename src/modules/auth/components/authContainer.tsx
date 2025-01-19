import { CSSProperties, ReactNode } from "react";
import { Container } from "rsuite";

export default function AuthContainer({ children }: { children: ReactNode }) {
    return (
        <div style={styles.background}>
            <div style={styles.curveTop} />
            <div style={styles.curveBottom} />
            <Container style={{ ...styles.container }}>
                {children}
            </Container>
        </div>
    );
}

const styles: Record<string, CSSProperties> = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        zIndex: 2,
        minHeight: "100vh"
    },
    background: {
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f88721 50%, white 50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflowY: "auto",
        overflow: "hidden",
    },
    curveTop: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "50%",
        height: "100%",
        backgroundColor: "#f88721",
        borderBottomRightRadius: "50% 20%",
        zIndex: 1,
    },
    curveBottom: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "50%",
        height: "100%",
        backgroundColor: "white",
        borderTopLeftRadius: "50% 20%",
        zIndex: 1,
    },
};
