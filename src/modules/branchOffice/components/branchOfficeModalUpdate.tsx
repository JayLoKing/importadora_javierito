/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Button, Container, Form, Input, Modal, Uploader, Tabs, SelectPicker, InputGroup } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import Map from "./map";
import { FaCamera } from "react-icons/fa";
import { FaCheck, FaUser } from "react-icons/fa6";
import { useCreateBranchOfficeFormStore } from "../hooks/useCreateBranchOfficeFormStore";
import { useBranchOfficeForm } from "../hooks/useBranchOfficeForm";
import { useBranchOfficeTable } from "../hooks/useBranchOfficeTable";
import { GetUsers, User } from "../../user/models/user.model";
import { useApi } from "../../../common/services/useApi";
import { getAllUsersAsync } from "../../user/services/user.service";
import { BsFillPinMapFill, BsShop, BsCalendarDate } from "react-icons/bs";

interface BranchOfficeModalUpdateProps {
    open: boolean,
    hiddeModal: (hide: boolean) => void,
    onBranchOfficeCreated?: () => void;
}

export default function BranchOfficeModalUpdate({ open, hiddeModal, onBranchOfficeCreated }: BranchOfficeModalUpdateProps) {
    const formRef = useRef<any>();
    const [users, setUsers] = useState<User[]>([]);
    const fetchUsers = useMemo(() => {return getAllUsersAsync(50, 1, 1, null, null, null)}, []);
    const {data, loading, fetch} = useApi<GetUsers>(fetchUsers, {autoFetch: true});
    const {formData, validationModel,updateField, resetForm } = useCreateBranchOfficeFormStore();
    const {handleFileChange, handleFileRemoveFromList, handleUsersOptions} = useBranchOfficeForm();
    const {filterStatusOptions} = useBranchOfficeTable();

    useEffect(() => {
            if (data) {
                if (Array.isArray(data)) {
                    setUsers([]); 
                } else {
                    setUsers(data.first);
                }
            } 
            fetch();
    }, [data, fetch,]); 
    console.log(data);
    function handleMarkerChange(lat: number, lng: number) {
        updateField('latitude', lat.toString());
        updateField('longitude', lng.toString());
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        resetForm();

        if(onBranchOfficeCreated){
            onBranchOfficeCreated();
        }
    }

    const handleCancel = () => {
        hiddeModal(false)
    }

    return (
        <Modal size={"lg"} open={open} overflow backdrop="static">
            <ModalHeader closeButton={false}>
                <h4>Editar Sucursal</h4>
                <p style={{ color:'#878787' }}>Complete la información para editar una nueva sucursal.</p>
            </ModalHeader>
            <ModalBody >
                <Form fluid ref={formRef} model={validationModel} formValue={formData}>
                    <Tabs defaultActiveKey='1' appearance='pills' >
                        <Tabs.Tab eventKey="1" title="Información General">
                            <Form.Group style={{ flex:1 }}>
                                <Form.ControlLabel><strong>Nombre de la sucursal</strong></Form.ControlLabel>
                                <InputGroup inside>
                                    <InputGroup.Addon>
                                        <BsShop />
                                    </InputGroup.Addon>
                                    <Form.Control value={formData.name} name="name" placeholder="Ingrese el nombre de la sucursal *" onChange={(value) => updateField('name', value.toUpperCase())} />
                                </InputGroup>
                            </Form.Group>
                            <div style={{ display: 'flex', justifyContent:'space-between', gap:20 }}>
                                <Form.Group style={{flex:1}}>
                                    <Form.ControlLabel><strong>Estado</strong></Form.ControlLabel>
                                    <SelectPicker block label={<BsCalendarDate/>} value={formData.status} data={filterStatusOptions} searchable={false} onChange={(value) => updateField('status', value)} placeholder="Seleccione el estado *"/>
                                </Form.Group>
                                <Form.Group style={{flex:1}}>
                                    <Form.ControlLabel><strong>Responsable</strong></Form.ControlLabel>
                                    <SelectPicker block label={<FaUser/>} value={formData.userId} data={handleUsersOptions(users)} loading={loading} onChange={(value) => updateField('userId', value)} searchable={false} placeholder="Seleccione el nombre del responsable *"/>
                                </Form.Group>
                            </div>
                            <Form.Group>
                                <Form.ControlLabel><strong>Dirección de la Sucursal</strong></Form.ControlLabel>
                                <InputGroup inside>
                                    <InputGroup.Addon>
                                        <BsFillPinMapFill/>
                                    </InputGroup.Addon>
                                    <Input placeholder="Ingrese la dirección de la sucursal *" value={formData.address} name="address" as={'textarea'} rows={5} onChange={(value) => updateField('address', value.toUpperCase())} />
                                </InputGroup>
                            </Form.Group>
                        </Tabs.Tab>
                        <Tabs.Tab eventKey="2" title="Ubicación">
                            <div style={{ display:'flex', justifyContent:'space-between', flexDirection:'row' }}>
                                <div>
                                    <h5>Ubicación</h5>
                                    <p>Seleccione la ubicación exacta de la sucursal en el mapa</p>
                                </div>
                                <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                                    <strong style={{ color:'#878787' }}>Coordenadas:</strong>
                                    <p style={{ color:'#878787' }}>{formData.latitude && formData.longitude ? `${formData.latitude}, ${formData.longitude}` : 'Seleccione en el mapa'}</p>
                                </div>
                            </div>
                            <Form.Group>
                                <Container>
                                    <Map latFromParent={formData.latitude} lonFromParent={formData.longitude} onMarkerChange={handleMarkerChange} />
                                </Container>
                            </Form.Group>
                        </Tabs.Tab>
                        <Tabs.Tab eventKey="3" title="Imágenes">
                            <div style={{ marginBottom:15 }}>
                                <h5>Imágenes de la Sucursal</h5>
                                <p>Edite las imágenes de la sucursal, agregue imágenes del interior u otros aspectos relevantes de la sucursal</p>
                            </div>
                            <Form.Group>
                                    <Form.Control
                                        name="pathImages"
                                        listType="picture-text"
                                        action="/"
                                        draggable
                                        accepter={Uploader}
                                        autoUpload={false}
                                        onChange={(file) => {
                                            handleFileChange(file, updateField);
                                        }}
                                        onRemove={(file) => {
                                            handleFileRemoveFromList(file, updateField);
                                        }}
                                        defaultFileList={[]}>
                                        <div style={{ height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed #ddd', borderRadius: 6 }}>
                                            <FaCamera size={48} color="#ccc" style={{ marginBottom: 10 }} />
                                            <p>Arrastre y suelte imágenes aquí o haga clic para seleccionar</p>
                                            <Button appearance="default" startIcon={<FaCheck />} style={{ marginTop: 10 }}>
                                                Seleccionar imágenes
                                            </Button>
                                        </div>
                                    </Form.Control>
                                </Form.Group>
                        </Tabs.Tab>
                    </Tabs>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button onClick={handleCancel} appearance="default">Cancelar</Button>
                <Button onClick={(e) => handleSubmit(e)} type="submit" appearance="primary">Aceptar</Button>
            </ModalFooter>
        </Modal>
    );
}