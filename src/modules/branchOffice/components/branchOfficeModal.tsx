/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { FormEvent, useEffect, useState } from "react";
import { Button, Container, Form, Input, Modal, Uploader, InputGroup, Tabs, SelectPicker } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import Map from "./map";
import InputGroupAddon from "rsuite/esm/InputGroup/InputGroupAddon";
import { FaCamera, FaMapPin, FaStore, FaUser } from "react-icons/fa";
import { useBranchOfficeForm } from "../hooks/useBranchOfficeForm";
import { uploadImageToFirebase } from "../services/firebaseImageService";
import { newBranchOfficeAsync, updateBranchOfficeAsync } from "../services/branchOfficeService";
import { BranchOfficeDetailsDTO } from "../models/branchOffice.model";
import { FaCheck } from "react-icons/fa6";

interface BranchOfficeModalProps {
    open: boolean,
    hiddeModal: (hide: boolean, action: string) => void,
    refreshList: () => Promise<void>;
    details: BranchOfficeDetailsDTO | undefined,
    action: string
}

export default function BranchOfficeModal({ open, hiddeModal, refreshList, details, action }: BranchOfficeModalProps) {

    const [files, setFiles] = useState<File[]>([]);

    const { formValues, handleInputChange, setFormValues, resetValues } = useBranchOfficeForm({
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        pathImages: []
    });

    useEffect(() => {
        if (action === 'update' && details) {
            setFormValues({
                name: details.name,
                address: details.address,
                latitude: details.latitude,
                longitude: details.longitude,
                pathImages: details.images.map(image => image.path)
            });
        } else {
            resetValues()
        }
        setFiles([])
        console.log(details)
    }, [action, details]);

    function handleMarkerChange(lat: number, lng: number) {
        handleInputChange('latitude', lat.toString());
        handleInputChange('longitude', lng.toString());
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const urls = files && files.length > 0 ? await handleFileUpload(files) : [];
        const updatedFormValues = {
            ...formValues,
            pathImages: urls.length > 0 ? urls : formValues.pathImages
        };
        let res;
        if (action === 'insert') {
            res = await newBranchOfficeAsync(updatedFormValues);
        } else {
            res = await updateBranchOfficeAsync(details!.id, updatedFormValues);
        }

        if (res !== null) {
            hiddeModal(false, action);
            await refreshList();
        }
        resetValues();
    }

    async function handleFileUpload(files: File[]): Promise<string[]> {
        try {
            const uploadPromises = files.map(async (file) => {
                const downloadURL = await uploadImageToFirebase(file);
                return downloadURL;
            });
            const downloadURLs = await Promise.all(uploadPromises);
            return downloadURLs;
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            throw error;
        }
    };

    return (
        <Modal size={"lg"} open={open} onClose={() => hiddeModal(false, action)} overflow>
            <ModalHeader>
                    {action === 'insert' ?
                        <div>
                            <h4>Nueva Sucursal</h4>
                            <p style={{ color:'#878787' }}>Complete la información para registrar una nueva sucursal.</p>
                        </div>
                        :
                        <div>
                            <h4>Editar Sucursal</h4>
                            <p style={{ color:'#878787' }}>Complete la información para editar la información de la sucursal.</p>
                        </div>
                    }
            </ModalHeader>
            <ModalBody >
                <Tabs defaultActiveKey='1' appearance='pills' >
                    <Tabs.Tab eventKey="1" title="Información General">
                        <Form fluid>
                            
                                <Form.Group style={{ flex:1 }}>
                                    <Form.ControlLabel><strong>Nombre de la sucursal</strong></Form.ControlLabel>
                                    <Form.Control value={formValues.name} name="name" placeholder="Ingrese el nombre de la sucursal *" onChange={(value) => handleInputChange('name', value)} />
                                </Form.Group>
                                
                                    <div style={{ display: 'flex', justifyContent:'space-between', gap:20 }}>
                                        <Form.Group style={{flex:1}}>
                                            <Form.ControlLabel><strong>Estado</strong></Form.ControlLabel>
                                            <SelectPicker block data={[]} searchable={false} placeholder="Seleccione el estado *"/>
                                        </Form.Group>
                                        <Form.Group style={{flex:1}}>
                                            <Form.ControlLabel><strong>Responsable</strong></Form.ControlLabel>
                                            <SelectPicker block data={[]} searchable={false} placeholder="Seleccione el nombre del responsable *"/>
                                        </Form.Group>
                                    </div>
                                
                                <Form.Group>
                                    <Form.ControlLabel><strong>Dirección de la Sucursal</strong></Form.ControlLabel>
                                    <Input placeholder="Ingrese la dirección de la sucursal *" value={formValues.address} name="address" as={'textarea'} rows={5} onChange={(value) => handleInputChange('address', value)} />
                                </Form.Group>
                        </Form>
                    </Tabs.Tab>
                    <Tabs.Tab eventKey="2" title="Ubicación">
                        <div style={{ display:'flex', justifyContent:'space-between', flexDirection:'row' }}>
                            <div>
                                <h5>Ubicación</h5>
                                <p>Seleccione la ubicación exacta de la sucursal en el mapa</p>
                            </div>
                            <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                                <strong style={{ color:'#878787' }}>Coordenadas:</strong>
                                <p style={{ color:'#878787' }}>{formValues.latitude && formValues.longitude ? `${formValues.latitude}, ${formValues.longitude}` : 'Seleccione en el mapa'}</p>
                            </div>
                        </div>
                        <Form.Group>
                            <Container>
                                <Map latFromParent={formValues.latitude} lonFromParent={formValues.longitude} onMarkerChange={handleMarkerChange} />
                            </Container>
                        </Form.Group>
                    </Tabs.Tab>
                    <Tabs.Tab eventKey="3" title="Imágenes">
                        <div style={{ marginBottom:15 }}>
                            <h5>Imágenes de la Sucursal</h5>
                            <p>Suba imágenes de la fachada, interior u otros aspectos relevantes de la sucursal</p>
                        </div>
                        <Form.Group>
                                <Uploader
                                    key={details?.id || "new"}
                                    listType="picture-text"
                                    action="/"
                                    draggable
                                    autoUpload={false}
                                    onChange={async (fileList) => {
                                        const filesOnLoad = fileList.map(file => file.blobFile).filter(Boolean) as File[];
                                        setFiles(filesOnLoad);
                                    }}
                                    onRemove={(file) => {
                                        if (file.url) {
                                            details?.images.find(image => image.path === file.url)?.status === 1
                                        }

                                    }}
                                    defaultFileList={action === 'update' && details?.images.length! > 0 ?
                                        details?.images.map(image => ({
                                            name: `image-${image.id}`,
                                            url: image.path,
                                        })) :
                                    []}>
                                    <div style={{ height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ddd', borderRadius: 6 }}>
                                        <FaCamera size={48} color="#ccc" style={{ marginBottom: 10 }} />
                                        <p>Arrastre y suelte imágenes aquí o haga clic para seleccionar</p>
                                        <Button appearance="default" startIcon={<FaCheck />} style={{ marginTop: 10 }}>
                                            Seleccionar imágenes
                                        </Button>
                                    </div>
                                </Uploader>
                            </Form.Group>
                    </Tabs.Tab>
                </Tabs>
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => {
                    resetValues()
                    hiddeModal(false, action)
                }} appearance="default">Cancelar</Button>
                <Button onClick={(e) => handleSubmit(e)} type="submit" appearance="primary">Aceptar</Button>
            </ModalFooter>
        </Modal>
    );
}