import { DatePicker, FlexboxGrid, Form, IconButton, InputGroup, Table, Tooltip, Whisper } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';
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
        <div style={{padding:25}}>
            <h4 style={{fontWeight:"bold", color:"black", display:"flex", justifyContent:"center"}}> CREACIÓN DE REPORTES EXCEL - CSV </h4>            
            <Form fluid style={{marginBottom:30}}>
                <FlexboxGrid style={{display:"flex", justifyContent:"center", gap:"10px", fontSize:"15px"}} >
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
                                style={{ width: '100%'}}
                                />
                            </InputGroup>
                        </FormGroup>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <FlexboxGrid style={{display:"flex", justifyContent:"end", marginTop:-60}}>
                    <FlexboxGridItem >
                        <IconButton icon={< PlusIcon/>} appearance="primary"> Nuevo Repuesto </IconButton>
                    </FlexboxGridItem>
                </FlexboxGrid>
            </Form>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Table data={data} rowHeight={65} style={{ textAlign: 'center', borderRadius:"15px", fontSize:"14px", width:"100%", maxWidth:900}} >
                    {false && (
                        <Column align="center" width={100}>
                            <HeaderCell>ID</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>
                    )}
                    <Column width={200} resizable>
                        <HeaderCell style={{background:"#f08b33", color:"white", fontWeight: 'bold', fontSize: '15px' }}>Nombre del archivo</HeaderCell>
                        <Cell dataKey="name" />
                    </Column>
                    <Column width={140} resizable>
                        <HeaderCell style={{background:"#f08b33", color:"white", fontWeight: 'bold', fontSize: '15px'}}>Tipo de Reporte</HeaderCell>
                        <Cell dataKey="type" />
                    </Column>
                    <Column width={150} resizable>
                        <HeaderCell style={{background:"#f08b33", color:"white", fontWeight: 'bold', fontSize: '15px'}}>Filtros</HeaderCell>
                        <Cell dataKey="filter"/>
                    </Column>
                    <Column width={210} resizable>
                        <HeaderCell style={{background:"#f08b33", color:"white", fontWeight: 'bold', fontSize: '15px'}}>Fecha y Hora de creación</HeaderCell>
                        <Cell dataKey="date" />
                    </Column>
                    <Column width={200} fixed>
                        <HeaderCell style={{background:"#f08b33", color:"white", borderRadius:"0px 10px 0px 0px", fontWeight: 'bold', fontSize: '15px'}}>
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
        </div>
    )
}