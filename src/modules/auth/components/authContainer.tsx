import { ReactNode } from "react";
import { Container } from "rsuite";
import "../styles/styles.css"

export default function AuthContainer({ children }: { children: ReactNode }) {
    return (
        <div className="background" >
            <div className="curveTop"  />
            <div className="curveBottom" />
            <Container className="container" >
                {children}
            </Container>
        </div>
    );
}
