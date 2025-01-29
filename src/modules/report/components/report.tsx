import { FaPlus } from "react-icons/fa";
import { Button, DatePicker, FlexboxGrid, Form, InputGroup, Table, Tooltip, Whisper } from "rsuite";
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import FormGroup from "rsuite/esm/FormGroup";
import Column from "rsuite/esm/Table/TableColumn";
import { Cell, HeaderCell } from "rsuite-table";
import excel from '../../../assets/excel.png';
import csv from '../../../assets/csv.png';
import { useEffect, useState } from "react";

interface ReportData {
    datakey: number;
    name: string;
    type: string;
    filter: string;
    date: string;
    data: any[];
}

export default function Report(){
    const [data, setData] = useState<ReportData[]>([]);

    const genericData: ReportData[] = [
        {
            datakey: 1,
            name: "Reporte 1",
            type: "Excel",
            filter: "-",
            date: "20/11/2024 - 12:00:00",
            data: [],
        },
        {
            datakey: 2,
            name: "Reporte 2",
            type: "CSV",
            filter: "-",
            date: "21/11/2024 - 14:30:00",
            data: [],
        },
    ];

    useEffect(()=>{
        setData(genericData);
    }, [])
    return(
        <div style={{padding:25 }}>
            <h4 style={{fontWeight:"bold", color:"#f08b33", display:"flex", justifyContent:"center"}}> CREACIÓN DE REPORTES EXCEL / CSV</h4>            
            <Form fluid style={{marginBottom:20}}>
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
                <FlexboxGrid style={{display:"flex", justifyContent:"end", marginTop:-60}}>
                    <FlexboxGridItem >
                        <Button appearance="primary" size="lg" >
                            <FaPlus style={{ marginRight: 5 }} /> Generar Reporte
                        </Button>
                    </FlexboxGridItem>
            </FlexboxGrid>
            </Form>
            <Table data={data} rowHeight={65} style={{ textAlign: 'center'}}>
                {false && (
                    <Column align="center" width={100}>
                        <HeaderCell>ID</HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                )}
                <Column width={200} resizable>
                    <HeaderCell style={{textAlign:"center"}}>Nombre del archivo</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column width={130} resizable>
                    <HeaderCell>Tipo de Reporte</HeaderCell>
                    <Cell dataKey="type" />
                </Column>
                <Column width={130} resizable>
                    <HeaderCell>Filtros</HeaderCell>
                    <Cell dataKey="filter" />
                </Column>
                <Column width={200} resizable>
                    <HeaderCell>Fecha y Hora de creación</HeaderCell>
                    <Cell dataKey="date" />
                </Column>
                <Column width={200} fixed>
                    <HeaderCell >
                        <strong>Acciones</strong>
                    </HeaderCell>
                    <Cell>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Whisper placement="top" trigger={"hover"} speaker={<Tooltip>Descargar Excel</Tooltip>}>
                                <img src={excel} alt='Excel' style={{cursor:"pointer", width:30, margin:3}} />
                            </Whisper>
                            <Whisper placement="top" trigger={"hover"} speaker={<Tooltip>Descargar CSV</Tooltip>}>
                                <img src={csv} alt='Excel' style={{cursor:"pointer", width:30, margin:3}}/>
                            </Whisper>
                        </div>
                    </Cell>
                </Column>
            </Table>
        </div>
    )
}