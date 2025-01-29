import { FaPlus } from "react-icons/fa";
import { Button, DatePicker, FlexboxGrid, Form, InputGroup } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import FormGroup from "rsuite/esm/FormGroup";


export default function Report(){
    return(
        <div style={{padding:"20px", }}>
            <h4 style={{fontWeight:"bold", color:"black", display:"flex", justifyContent:"center"}}> CREACIÓN DE REPORTES EXCEL / CSV</h4>            
            <Form fluid >
                <FlexboxGrid style={{display:"flex", justifyContent:"center", gap:"10px"}} >
                    <FlexboxGrid.Item colspan={6} style={{ marginTop: 20, marginBottom: 20 }}>
                        <FormGroup>
                            <Form.ControlLabel>Fecha de Registro - <strong>Desde</strong></Form.ControlLabel>
                            <InputGroup inside style={{ width: '100%' }}>
                                <DatePicker
                                name="notificationStartDate"
                                format="yy/MM/dd"
                                block
                                placeholder="yyyy-MM-dd"
                                style={{ width: '100%' }}
                                />
                            </InputGroup>
                        </FormGroup>
                    </FlexboxGrid.Item>

                    <FlexboxGrid.Item colspan={6} style={{ marginTop: 20, marginBottom: 20 }}>
                        <FormGroup>
                            <Form.ControlLabel>Fecha de Registro - <strong>Hasta</strong></Form.ControlLabel>
                                <InputGroup inside style={{ width: '100%' }}>
                                <DatePicker
                                name="notificationEndDate"
                                format="yy/MM/dd"
                                block
                                placeholder="yyyy-MM-dd"
                                style={{ width: '100%' }}
                                />
                            </InputGroup>
                        </FormGroup>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <FlexboxGrid justify="end">
                    <FlexboxGridItem >
                        <Button appearance="primary" size="lg" >
                            <FaPlus style={{ marginRight: 5 }} /> Generar Reporte
                        </Button>
                    </FlexboxGridItem>
            </FlexboxGrid>
            </Form>
            
        </div>
    )
}