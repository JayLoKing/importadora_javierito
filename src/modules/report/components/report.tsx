import { DatePicker, FlexboxGrid, Form, Heading, IconButton, InputGroup, Stack, Table, Tooltip, Whisper } from "rsuite";
import PlusIcon from '@rsuite/icons/Plus';
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";
import FormGroup from "rsuite/esm/FormGroup";
import Column from "rsuite/esm/Table/TableColumn";
import { Cell, HeaderCell } from "rsuite-table";
import excel from '../../../assets/excel.png';
import csv from '../../../assets/csv.png';
import { useEffect, useState } from "react";
import { exportToExcel } from "../hooks/report.excel";
import { exportToCSV } from "../hooks/report.csv";
import { FetchDataByIdAsync } from "../../../common/services/generalService";
import { GetReportData } from "../models/report.model";
import { ItemUrl } from "../urls/report.url";

interface ReportData {
    datakey: number;
    name: string;
    type: string;
    filter: string;
    date: string;
    data: GetReportData[];
}

export default function Report(){
    const [data, setData] = useState<ReportData[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const requestData = {
        startDate: startDate ? startDate.toISOString().split('T')[0] : '',
        endDate: endDate ? endDate.toISOString().split('T')[0] : '',
      };
    
    const { data: fetchedData, loading, error, fetchData } = FetchDataByIdAsync<GetReportData[]>(ItemUrl.excelReport, requestData);
    
    useEffect(() => {
        const sessionData = sessionStorage.getItem('reportData');
        if (sessionData) {
          setData(JSON.parse(sessionData));
        } else {
          const initialData: ReportData[] = [
            {
              datakey: 1,
              name: "Prueba 1",
              type: "Excel",
              filter: "-",
              date: "11/02/2025 - 12:00:00",
              data: [],
            },
            {
              datakey: 2,
              name: "Prueba 2",
              type: "CSV",
              filter: "-",
              date: "12/02/2025 - 14:30:00",
              data: [],
            },
          ];
          setData(initialData);
          sessionStorage.setItem('reportData', JSON.stringify(initialData));
        }
    }, []);

    const handleAddReport = async () => {
        await fetchData(); // Llamada al hook para obtener los datos
        if (fetchedData && fetchedData.length > 0) {
        const newReport: ReportData = {
            datakey: data.length + 1,
            name: `Reporte ${data.length + 1}`,
            type: "Excel",
            filter: `${startDate?.toLocaleDateString() || '-'} - ${endDate?.toLocaleDateString() || '-'}`,
            date: new Date().toLocaleString(),
            data: fetchedData,
        };

        const updatedData = [...data, newReport];
        setData(updatedData);
        sessionStorage.setItem('reportData', JSON.stringify(updatedData));

        alert("Reporte generado exitosamente");
        } else {
        alert("No se encontraron datos para el rango de fechas seleccionado.");
        }
    };

    const handleDownloadReport = async (format: "excel" | "csv", rowData: ReportData) => {
        try {
            if (rowData.data && rowData.data.length > 0) {
                if (format === "excel") {
                    exportToExcel(rowData.data, `${rowData.name}_EXCEL`);
                } else {
                    exportToCSV(rowData.data, `${rowData.name}_CSV`);
                }
                alert(`¡Reporte ${format.toUpperCase()} descargado con éxito!`);
            } else {
                alert("Este reporte no contiene datos.");
            }
        } catch (error) {
            console.error("Error al descargar el reporte:", error);
            alert("Ocurrió un error al descargar el reporte.");
        }
    };

    return(
        <div style={{padding:30}}>
            <Stack direction="row" justifyContent="center" alignItems="center"><Heading level={3} style={{marginTop:"-7px", color:"black"}}>Creación de reportes Excel - CSV</Heading></Stack>            
            <Form fluid style={{marginBottom:30}}>
                <FlexboxGrid style={{ display:"flex", justifyContent:"center", gap:"10px", fontSize:"15px" }} >
                    <FlexboxGrid.Item colspan={6} style={{ marginTop: 20, marginBottom: 20 }} >
                        <FormGroup>
                            <Form.ControlLabel>Fecha de Registro - <strong>Desde</strong></Form.ControlLabel>
                            <InputGroup inside style={{ width: '100%' }}>
                                <DatePicker
                                    name="notificationStartDate"
                                    format="yy/MM/dd"
                                    block
                                    placeholder="yyyy-MM-dd"
                                    style={{ width: '100%' }}
                                    disabledDate={(date) => date ? date > new Date() : false}
                                    onChange={(value) => setStartDate(value || null)}
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
                                    disabledDate={(date) => date ? date > new Date() : false}
                                    onChange={(value) => setEndDate(value || null)}
                                />
                                </InputGroup>
                        </FormGroup>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <FlexboxGrid style={{display:"flex", justifyContent:"end", marginTop:-60}}>
                    <FlexboxGridItem >
                        <IconButton icon={< PlusIcon/>} appearance="primary" onClick={handleAddReport}> Nuevo Reporte </IconButton>
                    </FlexboxGridItem>
                </FlexboxGrid>
            </Form>
            
                <Table data={data} height={530} rowHeight={65} headerHeight={60} style={{ textAlign: 'center', background: "white", borderRadius:"15px", fontSize:"15px", overflow:"hidden"}} >
                    {false && (
                        <Column align="center" >
                            <HeaderCell>ID</HeaderCell>
                            <Cell dataKey="id" />
                        </Column>
                    )}
                    <Column align="center" flexGrow={1} minWidth={190}>
                        <HeaderCell style={{background:"#f08b33", color:"white", fontWeight: 'bold', fontSize: '15px' }}>Nombre del archivo</HeaderCell>
                        <Cell dataKey="name" />
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={90}>
                        <HeaderCell style={{background:"#f08b33", color:"white", fontWeight: 'bold', fontSize: '15px'}}>Tipo de Reporte</HeaderCell>
                        <Cell dataKey="type" />
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={90}>
                        <HeaderCell style={{background:"#f08b33", color:"white", fontWeight: 'bold', fontSize: '15px'}}>Filtros</HeaderCell>
                        <Cell dataKey="filter"/>
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={190}>
                        <HeaderCell style={{background:"#f08b33", color:"white", fontWeight: 'bold', fontSize: '15px'}}>Fecha y Hora de creación</HeaderCell>
                        <Cell dataKey="date" />
                    </Column>
                    <Column align="center" flexGrow={1} minWidth={100}>
                        <HeaderCell style={{background:"#f08b33", color:"white", borderRadius:"0px 10px 0px 0px", fontWeight: 'bold', fontSize: '15px'}}>
                            <strong>Acciones</strong>
                        </HeaderCell>
                        <Cell>
                            {(rowData) =>(
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap:"10px" }}>
                                <Whisper placement="top" trigger={"hover"} speaker={<Tooltip>Descargar Excel</Tooltip>}>
                                    <img onClick={()=> handleDownloadReport("excel", rowData as ReportData)} src={excel} alt='Excel' style={{cursor:"pointer", width:35, height:35, margin:3}} />
                                </Whisper>
                                <Whisper placement="top" trigger={"hover"} speaker={<Tooltip>Descargar CSV</Tooltip>}>
                                    <img onClick={()=> handleDownloadReport("csv", rowData as ReportData)} src={csv} alt='csv' style={{cursor:"pointer", width:30, margin:3}}/>
                                </Whisper>
                            </div>
                            )}
                        </Cell>
                    </Column>
                </Table>
        </div>
    )
}