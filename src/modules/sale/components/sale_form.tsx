import { Button, Form, Grid, Modal, Stack, Row, Col, Panel, InputGroup, Input, Table, SelectPicker, Whisper, IconButton, Tooltip } from "rsuite";
import { FaBarcode } from "react-icons/fa6";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import FormGroup from "rsuite/esm/FormGroup";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { FormEvent, useEffect, useState } from "react";
import { FaAlignJustify, FaSearch, FaUser, FaDollarSign } from "react-icons/fa";
import { BiSolidUserBadge } from "react-icons/bi";

interface SaleModalParams {
    open: boolean;
    hiddeModal: () => void;
    onSaleCreated?: () => void;
}

const { Column, HeaderCell, Cell } = Table;

export default function SaleForm({open, hiddeModal, onSaleCreated } : SaleModalParams){
    const [currentDate, setCurrentDate] = useState<string>("");
    
    const handleCancel = () => {
        // resetForm();
        hiddeModal();
    }

    useEffect(() => {
        const now = new Date();
        const day = now.getDate();
        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
        const month = months[now.getMonth()];
        const year = now.getFullYear();
        setCurrentDate(`${day} de ${month} de ${year}`);
    },[])

    const handleFormSubmit = async () => {
        if (onSaleCreated) {
            onSaleCreated();
        }
    }

    return(
        <>
            <Modal size={"lg"} open={open} onClose={() => hiddeModal()} overflow>
                <ModalHeader style={{marginLeft:"25px"}}>
                    <div >
                        <ModalTitle style={{ fontWeight: "bold", margin: 0 }}>
                            Registro de Venta 
                        </ModalTitle>
                        <span>Fecha: {currentDate}</span>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <Grid fluid>
                        <Row >
                            <Col style={{marginLeft:"20px"}} xs={12} md={6}>
                                <Panel style={{ marginTop: 0,  }} bordered>
                                    <h5>Código de Barras</h5>
                                    <div style={{ textAlign: "center", margin: "10px 0" }}>
                                        <div style={{ width: "100%", height: "100%" }}>
                                            <FaBarcode style={{width: 100, height: 100}}/>
                                        </div>
                                    </div>
                                </Panel>
                                
                                <Form fluid style={{ marginTop: 15 }}>
                                        <FormGroup>
                                            <FormControlLabel style={{fontWeight:"bold"}}>Cliente:</FormControlLabel>
                                            <InputGroup inside>
                                                <InputGroup.Addon>
                                                    <FaUser/>
                                                </InputGroup.Addon>
                                                <Form.Control name="client" placeholder="Razón Social / Cliente"/>
                                            </InputGroup>
                                        </FormGroup>
                                        
                                        <FormGroup>
                                            <FormControlLabel style={{fontWeight:"bold"}}>Descuento (%):</FormControlLabel>
                                            <InputGroup inside>
                                                <InputGroup.Addon>
                                                    <FaDollarSign/>
                                                </InputGroup.Addon>
                                                <Input type="number" min="0" placeholder="0" />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <FormControlLabel style={{fontWeight:"bold"}}>Observaciones:</FormControlLabel>
                                            <InputGroup inside>
                                                <InputGroup.Addon>
                                                    <FaAlignJustify/>
                                                </InputGroup.Addon>
                                                <Input as={'textarea'} rows={3} placeholder="Opcional"/>
                                            </InputGroup>
                                        </FormGroup>
                                    </Form>
                            </Col>
                            <Col style={{marginLeft:"20px"}} xs={20} md={16}>
                                <Panel bordered>
                                    <Grid fluid>
                                        <Row gutter={10}>
                                            <Col xs={20} md={14}>
                                                <InputGroup style={{ width: "100%" }}>
                                                    <InputGroup.Addon style={{background:"#f08b33", color:"white"}}>
                                                        <FaSearch />
                                                    </InputGroup.Addon>
                                                    <Input placeholder="Buscar productos..." />
                                                </InputGroup>
                                            </Col>
                                            <Col xs={20} md={6}>
                                                <Stack spacing={10} alignItems="center">
                                                    <SelectPicker label="Filtro" searchable={false} placeholder="Marca" data={[]} />
                                                    <Button appearance="primary" >
                                                        <FaBarcode style={{ marginRight: 5 }} /> Escanear
                                                    </Button>
                                                </Stack>
                                            </Col>
                                        </Row>
                                    </Grid>
                                    <h5 style={{ marginTop: 20 }}>Productos Seleccionados</h5>
                                    <Table rowHeight={40} data={[]}>
                                         <Column width={70} align="center">
                                            <HeaderCell>Acciones</HeaderCell>
                                            <Cell>
                                                <Stack spacing={6} justifyContent="center" alignItems="center" direction="row">
                                                    <Whisper placement="top" trigger="hover" speaker={<Tooltip> + </Tooltip>}>
                                                        <IconButton style={{ width: 40,  color:"white"}} appearance="primary" />
                                                    </Whisper>
                                                </Stack>
                                            </Cell>
                                        </Column>
                                        <Column width={70} align="center">
                                            <HeaderCell>Código</HeaderCell>
                                            <Cell dataKey="code" />
                                        </Column>
                                        <Column flexGrow={1}>
                                            <HeaderCell>Producto</HeaderCell>
                                            <Cell dataKey="name" />
                                        </Column>
                                        <Column width={100}>
                                            <HeaderCell>Precio</HeaderCell>
                                            <Cell dataKey="price" />
                                        </Column>
                                    </Table>

                                    <Stack justifyContent="flex-end" style={{ marginTop: 15 }}>
                                        <Stack direction="column" alignItems="flex-end">
                                            <div>
                                                <strong>Subtotal:</strong> 
                                            </div>
                                            <div>
                                                <strong>Descuento:</strong> 
                                            </div>
                                            <div style={{ fontSize: 18, fontWeight: "bold", color:"#f08b33" }}>
                                                <strong>Total:</strong> 
                                            </div>
                                        </Stack>
                                    </Stack>
                                </Panel>
                            </Col>
                        </Row>
                    </Grid>
                </ModalBody>
                <ModalFooter >
                    <Button onClick={handleFormSubmit} type="submit" appearance="primary"> Registrar </Button>
                    <Button onClick={handleCancel}> Cancelar </Button>
                </ModalFooter>
            </Modal>
        </>
    ) 
}