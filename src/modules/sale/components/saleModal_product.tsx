import { FaPrint } from "react-icons/fa6";
import { Button, Col, Divider, Grid, Modal, Row, Toggle } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";

interface ModalInfoProductProps {
    open: boolean,
    hiddeModal: () => void,
}

export default function SaleModalProduct({ open, hiddeModal }: ModalInfoProductProps) {
    
    return(
        <Modal open={open} onClose={hiddeModal} size="md" >
            <ModalHeader  >
                <ModalTitle style={{ fontWeight:"bold" }}>Detalles de Venta - "ID VENTA"</ModalTitle>
            </ModalHeader>
            <ModalBody style={{ padding: 0 }}>
                <Grid fluid>
                    <Row >
                        <Col md={8} sm={24} style={{ padding: 20,  height: '100%'}}>
                            <h6 style={{ marginBottom:10 }}>Información de la Venta</h6>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{width:"100%"}}>Fecha:</strong>
                                    <span style={{width:"100%"}}>28/04/2025</span>
                                </div>
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{width:"100%"}}>Hora:</strong>
                                    <span style={{width:"100%"}}>23:16:00 am.</span>
                                </div>
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{width:"100%"}}>Vendedor:</strong>
                                    <span style={{width:"100%"}}>Pabel mendez</span>
                                </div>
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{width:"100%"}}>Cliente:</strong>
                                    <span style={{width:"100%"}}>Pabel mendez</span>
                                </div>
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{width:"100%"}}>Método de Pago:</strong>
                                    <span style={{width:"100%"}}>Efectivo</span>
                                </div>
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <strong style={{width:"50%"}}>Estado:</strong>
                                    <Toggle checkedChildren="Completada" unCheckedChildren="Pendiente" />
                                </div>
                            </div>
                        </Col>
                        <div style={{ display: 'flex',  flexDirection: 'column', gap: 10, padding: 20 }}>
                            <h6 style={{ marginBottom:10 }}>Productos Vendidos</h6>
                        </div>
                        <Col md={16} sm={24} style={{  maxHeight: '17em', overflow: 'auto' }}>
                            <div style={{ marginLeft: 15, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                <div style={{ display: 'flex', alignItems: "center", justifyContent: 'left', gap: 20 }}>
                                    <img src="src\assets\brands\BMW.png" alt="Product" style={{ width:"5em", height:"5em" }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
                                        <strong >Nombre del producto</strong>
                                        <div>
                                            <span>Código: </span>
                                            <span>1</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <span style={{ color:"red" }}>Descuento: </span>
                                                <span style={{ color:"red" }}>1.50 bs.</span>
                                            </div>
                                            <span style={{ fontWeight:"bold", fontSize:"15px" }}>6.00 bs. </span>
                                        </div>
                                    </div>
                                </div>
                                    <Divider />
                                    <div style={{ display: 'flex', alignItems: "center", justifyContent: 'left', gap: 20 }}>
                                    <img src="src\assets\brands\BMW.png" alt="Product" style={{ width:"5em", height:"5em" }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
                                        <strong >Nombre del producto</strong>
                                        <div>
                                            <span>Código: </span>
                                            <span>1</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <span style={{ color:"red" }}>Descuento: </span>
                                                <span style={{ color:"red" }}>1.50 bs.</span>
                                            </div>
                                            <span style={{ fontWeight:"bold", fontSize:"15px" }}>6.00 bs. </span>
                                        </div>
                                    </div>
                                </div>
                                    <Divider />
                                    <div style={{ display: 'flex', alignItems: "center", justifyContent: 'left', gap: 20 }}>
                                    <img src="src\assets\brands\BMW.png" alt="Product" style={{ width:"5em", height:"5em" }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
                                        <strong >Nombre del producto</strong>
                                        <div>
                                            <span>Código: </span>
                                            <span>1</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <span style={{ color:"red" }}>Descuento: </span>
                                                <span style={{ color:"red" }}>1.50 bs.</span>
                                            </div>
                                            <span style={{ fontWeight:"bold", fontSize:"15px" }}>6.00 bs. </span>
                                        </div>
                                    </div>
                                </div>
                                    <Divider />
                                    <div style={{ display: 'flex', alignItems: "center", justifyContent: 'left', gap: 20 }}>
                                    <img src="src\assets\brands\BMW.png" alt="Product" style={{ width:"5em", height:"5em" }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
                                        <strong >Nombre del producto</strong>
                                        <div>
                                            <span>Código: </span>
                                            <span>1</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <span style={{ color:"red" }}>Descuento: </span>
                                                <span style={{ color:"red" }}>1.50 bs.</span>
                                            </div>
                                            <span style={{ fontWeight:"bold", fontSize:"15px" }}>6.00 bs. </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </ModalBody>
            <Divider />
            <ModalFooter >
                <div style={{ display: 'flex', justifyContent:"space-between", padding:10 }}>
                    <div>
                        <span>Total de productos:</span>
                        <span style={{ marginLeft: 5 }}>7</span> 
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:"5px" }}>
                        <div>
                            <span>Subtotal:</span>
                            <span style={{ marginLeft: 5 }}>12.00 bs </span>
                        </div>
                        <div>
                            <strong style={{ marginBottom:10, fontSize:"18px"}}>Total: </strong>
                            <strong style={{ fontSize:"18px" }}>15.000bs</strong>    
                        </div> 
                        <Button appearance="primary" size="md" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background:"transparent", fontWeight:"bold", border:"1px solid #f08b33", color:"#f08b33" }}>
                            <FaPrint style={{ marginRight: '10px' }} /> Imprimir
                        </Button>
                    </div>
                </div>
            </ModalFooter>
        </Modal>
    );
}