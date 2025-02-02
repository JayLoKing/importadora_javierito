import { FormEvent, useState } from "react";
import { Button, Container, Form, Input, Modal, Uploader, Grid, Row, Col, InputGroup } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import Map from "./map";
import InputGroupAddon from "rsuite/esm/InputGroup/InputGroupAddon";
import { FaCamera, FaMapPin, FaStore } from "react-icons/fa";
import { useBranchOfficeForm } from "../hooks/useBranchOfficeForm";
import { uploadImageToFirebase } from "../services/firebaseImageService";
import { newBranchOfficeAsync } from "../services/branchOfficeService";

interface BranchOfficeModalProps {
    open: boolean,
    hiddeModal: (hide: boolean) => void,
    refreshList: () => Promise<void>;
}

export default function BranchOfficeModal({ open, hiddeModal, refreshList }: BranchOfficeModalProps) {

    const [files, setFiles] = useState<File[]>();

    const { formValues, handleInputChange, resetForm } = useBranchOfficeForm({
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        pathImages: []
    });

    function handleMarkerChange(lat: number, lng: number) {
        handleInputChange('latitude', lat.toString());
        handleInputChange('longitude', lng.toString());
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const urls = await handleFileUpload(files!);
        const res = await newBranchOfficeAsync({
            ...formValues,
            pathImages: urls
        });
        if (res !== null) {
            hiddeModal(open);
            await refreshList();
        }
        resetForm();
    }

    async function handleFileUpload(files: File[]): Promise<string[]> {
        try {
            const uploadPromises = files.map(async (file) => {
                const downloadURL = await uploadImageToFirebase(file);
                return downloadURL;
            });
            const downloadURLs = await Promise.all(uploadPromises);
            return downloadURLs
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            throw error;
        }
    };

    return (
        <Modal size={"lg"} open={open} onClose={() => hiddeModal(false)} overflow>
            <ModalHeader>
                <ModalTitle>
                    <strong>Nueva Sucursal</strong>
                </ModalTitle>
            </ModalHeader>

            <ModalBody>
                <Grid fluid>
                    <Row>
                        <Col xs={12}>
                            <Form fluid>
                                <Form.Group>
                                    <Form.ControlLabel>Nombre de la sucursal</Form.ControlLabel>
                                    <InputGroup inside>
                                        <InputGroupAddon>
                                            <FaStore />
                                        </InputGroupAddon>
                                        <Form.Control
                                            value={formValues.name}
                                            name="name"
                                            placeholder="Ingresa el nombre de la sucursal"
                                            onChange={(value) => handleInputChange('name', value)} />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <Form.ControlLabel>Dirección de la sucursal</Form.ControlLabel>
                                    <InputGroup inside>
                                        <InputGroupAddon>
                                            <FaMapPin />
                                        </InputGroupAddon>
                                        <Input
                                            value={formValues.address}
                                            name="address"
                                            as={'textarea'}
                                            rows={5}
                                            onChange={(value) => handleInputChange('address', value)} />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group>
                                    <Form.ControlLabel>Imágenes de la sucursal</Form.ControlLabel>
                                    <Uploader
                                        listType="picture-text"
                                        action="/"
                                        autoUpload={false}
                                        onChange={async (fileList) => {
                                            const filesOnLoad = fileList.map(file => file.blobFile).filter(Boolean) as File[];
                                            setFiles(filesOnLoad);
                                        }}>
                                        <Button appearance="default" startIcon={<FaCamera />}>Seleccionar Imágenes...</Button>
                                    </Uploader>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col xs={12}>
                            <Form.Group>
                                <Form.ControlLabel>Ubicación</Form.ControlLabel>
                                <Container>
                                    <Map onMarkerChange={handleMarkerChange} />
                                </Container>
                            </Form.Group>
                        </Col>
                    </Row>
                </Grid>
            </ModalBody>
            <ModalFooter>
                <Button onClick={(e) => handleSubmit(e)} type="submit" appearance="primary">Aceptar</Button>
                <Button onClick={() => hiddeModal(open)} appearance="default">Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}