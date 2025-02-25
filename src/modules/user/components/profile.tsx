import { FlexboxGrid, } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";

export default function Profile() {
    return (
        <>
            <FlexboxGrid justify="center" align="middle">
                <FlexboxGridItem>
                    <h4 style={{ marginLeft: 50, marginBottom: 10, marginTop: 10 }}>Mi cuenta</h4>
                </FlexboxGridItem>
            </FlexboxGrid>
        </>
    )
}