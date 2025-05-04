import { FormEvent, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import { Button, Carousel, Col, Divider, Grid, IconButton, Modal, Panel, Row, Stack } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";

interface ModalInfoProductProps {
    open: boolean,
    hiddeModal: () => void,
}

export default function ModalInfoProduct({ open, hiddeModal }: ModalInfoProductProps) {
    
    useEffect(() => {

    },[])

    
    return(
        <Modal open={open} onClose={hiddeModal} size="md" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ModalHeader  >
                <ModalTitle style={{ fontWeight:"bold" }}>Información del Producto</ModalTitle>
            </ModalHeader>
            <ModalBody >
                <Grid fluid>
                    <Row style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Col md={12} sm={24} style={{ padding: 10 }}>
                            <div >
                                <Carousel autoplay shape="bar" placement="bottom">
                                    <img src="src\assets\LogoJavier.jpg" height="250" />
                                    <img src="src\assets\prueba3.png" height="250" />
                                    <img src="src\assets\brands\BMW.png" height="250" />
                                    <img src="src\assets\brands\volvo.png" height="250"  />
                                    <img src="src\assets\brands\dodge.png" height="250" />
                                </Carousel>
                            </div>
                            {/* <Stack justifyContent="center" spacing={10}>
                                <IconButton icon={<FaChevronLeft />} appearance="subtle"/>
                            <Stack spacing={5} style={{ maxWidth: '70%', overflowX: 'auto', padding: 5 }}>
                                <img style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4, margin: '0 2px', cursor: 'pointer' }} />
                            </Stack>
                                <IconButton icon={<FaChevronRight />}  appearance="subtle"/>
                            </Stack>    
                            <Stack justifyContent="center" spacing={10} style={{ marginTop: 15 }}>
                                <IconButton icon={<FaSearchPlus />} appearance="subtle" />
                                <IconButton icon={<FaSearchMinus />} appearance="subtle" />
                            </Stack> */}
                        </Col>
                        <Col md={12} sm={24} style={{ padding: 10 }}>
                        <Panel bordered>
                            <h4 style={{ marginBottom:10 }}>Nombre del Producto</h4>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{width:"100%"}}>Código:</strong>
                                    <span style={{width:"100%"}}>123456789</span>
                                </div>
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{width:"100%"}}>Modelo:</strong>
                                    <span style={{width:"100%"}}>2018</span>
                                </div>
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{width:"100%"}}>Marca:</strong>
                                    <span style={{width:"100%"}}>TOYOTA</span>
                                </div>
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{width:"100%"}}>Precio Público:</strong>
                                    <span style={{width:"100%"}}>500bs</span>
                                </div>
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{width:"100%"}}>Precio por Mayor:</strong>
                                    <span style={{width:"100%"}}>480bs</span>
                                </div>
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <strong style={{width:"100%"}}>Fecha de Registro:</strong>
                                    <span style={{width:"100%"}}>11-Enero-2025</span>
                                </div>
                            </div>
                            <Divider />
                            <div>
                                <h5 style={{marginBottom: 12 }}>Especificaciones</h5>
                                <p style={{ textAlign:"left", lineHeight:1.5 }}>Hoola soy gay</p>
                            </div>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </ModalBody>
        </Modal>
    );
}