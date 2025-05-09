import { FaAlignJustify, FaBoxOpen, FaCalendar, FaCamera, FaCar, FaCog, FaCubes, FaDollarSign, FaSignature } from "react-icons/fa";
import { Button, Col, Form, Grid, InputGroup, Row, Uploader, SelectPicker, Input, Divider, Modal, InputNumber, RadioGroup, Radio, Tabs } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { BranchOffice, GetDataBranchOffice } from "../../branchOffice/models/branchOffice.model";
import { createItemAsync, getBrandsAsync, getItemAdressesAsync, getSubCategoryAsync } from "../services/item.service";
import "../styles/styles.css";
import { FormEvent, useRef, useMemo, useEffect, useState} from "react";
import { Brand, ItemAddress, SubCategory } from "../models/item.model";
import { useCreateItemFormStore } from "../validations/useCreateItemFormStore";
import { useNotificationService } from "../../../context/NotificationContext";
import { useAuthStore } from "../../../store/store";
import { useApi } from "../../../common/services/useApi";
import { getBranchOfficesAsync2 } from "../../branchOffice/services/branchOfficeService";
import { useRegisterItem } from "../hooks/useRegisterItem";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import { useBranchOfficeTable } from "../../branchOffice/hooks/useBranchOfficeTable";
import { BsWrenchAdjustable, BsShieldShaded, BsFillPinMapFill, BsShop, BsCalendarDate, BsFillFuelPumpFill, BsClipboardMinusFill   } from "react-icons/bs";
import { FaBarcode, FaCheck } from "react-icons/fa6";

interface ItemModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
    onItemCreated?: () => void;
}

export default function ItemForm({open, hiddeModal, onItemCreated} : ItemModalParams){
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formRef = useRef<any>();
    const [branchOffices, setBranchOffices] = useState<BranchOffice[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const {formData, updateField, resetForm, validationModel} = useCreateItemFormStore();
    const {
        showErrorMessage,
        showSuccessMessage,
        showWarningFilesMessage,
        handleFileChange,
        handleFileUpload,
        handleFileRemove,
        handleFileRemoveFromList,
        handleRoles,
        files,
        setFiles,
        transmitionsOptions,
        combustibleTypesOptions
    } = useRegisterItem();
    const {limit, page} = useBranchOfficeTable();
    // Fetch para sucursales, marcas, direcciones y subcategorías
    const fetchBranchOfficesAsync = useMemo(() => getBranchOfficesAsync2(limit,page), [limit,page]);
    const { data: dataBranchOffice, loading: loadingBranchOffice, fetch: fetchBranchOffices } = useApi<GetDataBranchOffice>(fetchBranchOfficesAsync, { autoFetch: false });

    const fetchItemSubCategoryAsync = useMemo(() => getSubCategoryAsync(), []);
    const { data: dataSubCategories, loading: loadingSubCategories, fetch: fetchItemSubCategory } = useApi<SubCategory[]>(fetchItemSubCategoryAsync, { autoFetch: false });

    const fetchItemAdressesAsync = useMemo(() => getItemAdressesAsync(), []);
    const { data: dataItemAddresses, loading: loadingItemAddressess, fetch: fetchItemAdresses } = useApi<ItemAddress[]>(fetchItemAdressesAsync, { autoFetch: true });

    const fetchItemBrandsAsync = useMemo(() => getBrandsAsync(), []);
    const { data: dataBrands, loading: loadingBrands, fetch: fetchBrands } = useApi<Brand[]>(fetchItemBrandsAsync, { autoFetch: false });

    const notificationService = useNotificationService();
    const {userId, userName, role} = useAuthStore();

    useEffect(() => {
        if(open) {
            fetchBranchOffices();
            fetchItemSubCategory();
            fetchItemAdresses();
            fetchBrands();
        }
        if(dataBranchOffice){
            if(Array.isArray(dataBranchOffice)){
                setBranchOffices([]);
            } else {
                setBranchOffices(dataBranchOffice.first);
            }
        }
    }, [open, fetchBranchOffices, fetchItemSubCategory, fetchItemAdresses, fetchBrands,dataBranchOffice]);

    const branchOfficeOptions = branchOffices?.map(branch => ({ label: branch.name, value: branch.id })) || [];
    const brandsOptions = dataBrands?.map(brand => ({ label: brand.name, value: brand.id })) || [];
    const itemAddressesOptions = dataItemAddresses?.map(itemAddress => ({ label: itemAddress.name, value: itemAddress.id })) || [];
    const subCategoriesOptions = dataSubCategories?.map(subCategory => ({ label: subCategory.name, value: subCategory.id })) || [];

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        formData.userID = userId as number;
        

        const result = await formRef.current.checkAsync();
        if (result.hasError) {
            console.error("El formulario no es válido");
            console.warn("Errores de validación:", result);
            setLoading(false);
            showErrorMessage("Formulario no válido, por favor revise los campos resaltados en rojo.");
            if(result.formError?.pathItems){
                showWarningFilesMessage("Suba al menos 1 imagen y un máximo de 5 imágenes (JPG, PNG)"); 
            } 
            return;
        }
    
        try {
            const uploadedUrls = await handleFileUpload(files) || [];
            updateField('pathItems', uploadedUrls);
            formData.pathItems = uploadedUrls;
    
            console.log("Datos finales del formulario:", formData);
    
            const  {call} = await createItemAsync(formData);
            if((await call).status !== 201) {
                await handleFileRemove(formData.pathItems);
                showErrorMessage("Error al crear el ítem respuesta del servidor. /n" + (await call).statusText);
                setLoading(false);
                return;
            }
            
            showSuccessMessage();
            notificationService.addNotification({
                message: 'creó un nuevo ítem',
                timestamp: new Date(),
                actionType: 'REGISTRO',
                type: 'Repuesto',
                userName: userName as string,
                targetRole: handleRoles(role as string),
            });
            
            formRef.current.reset();
            resetForm();
            hiddeModal(false);
            setFiles([]);
            
            if (onItemCreated) {
                onItemCreated();
            }
        } catch (error) {
            console.error("Error al crear el ítem:", error);
            await handleFileRemove(formData.pathItems as string[]);
            showErrorMessage("Error al crear el ítem");
            setLoading(false);
        } finally {
            setLoading(false); 
        }
    };

    const handleCancel = async () => {
        try {
            hiddeModal(false);
            resetForm();
            formRef.current.reset();
            setFiles([]);
            
        } catch (error) {
            console.error('Error al cancelar el formulario:', error);
            showErrorMessage("Error al cancelar el formulario");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Modal size={"lg"} open={open} onClose={() => hiddeModal(false)} overflow backdrop="static">
                <ModalHeader>
                    <ModalTitle style={{ fontWeight: "bold" }}>Nuevo Repuesto</ModalTitle> 
                </ModalHeader>
                <ModalBody>
                    <Form ref={formRef} model={validationModel} formValue={formData} fluid>
                        <Tabs defaultActiveKey="1" appearance="pills" >
                            <Tabs.Tab eventKey="1" title="Información General">
                                <Grid fluid >
                                    <Row>
                                        <div style={{ marginBottom:20 }}>
                                            <h5>Información General</h5>
                                            <p>Ingrese todos los campos con los datos del repuesto.</p>
                                        </div>
                                        <Col xs={24} md={8}>
                                            <Form.Group controlId={'name'}>
                                                <Form.ControlLabel><strong>Nombre del Repuesto</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <BsWrenchAdjustable />
                                                    </InputGroup.Addon>
                                                    <Form.Control name="name" placeholder="Ingrese el nombre del repuesto *" onChange={(value) => updateField('name', value.toUpperCase())} />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId={'price'}>
                                                <Form.ControlLabel><strong>Precio Unitario</strong></Form.ControlLabel>
                                                    <InputGroup inside>
                                                        <InputGroup.Addon>
                                                            <FaDollarSign />
                                                        </InputGroup.Addon>
                                                        <Form.Control name="price" accepter={InputNumber} min={0} formatter={(value) => `${value} Bs.`} placeholder="Ingrese el precio unitario *" onChange={(value) => updateField('price', parseFloat(value))} />
                                                    </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId="itemAddressID">
                                                <Form.ControlLabel><strong>Dirección del Repuesto</strong></Form.ControlLabel>
                                                <Form.Control name="itemAddressID" label={<BsFillPinMapFill />} accepter={SelectPicker} value={formData.itemAddressID} onChange={(value) => updateField('itemAddressID', value)} data={itemAddressesOptions} searchable loading={loadingItemAddressess} placeholder={loadingItemAddressess ? "Cargando..." : "Selecciona una dirección *"} style={{ width: "100%" }} />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Form.Group controlId={'itemStatus'} >
                                                <Form.ControlLabel><strong>Estado del Repuesto</strong></Form.ControlLabel>
                                                <Form.Control name="itemStatus" style={{ justifyContent:'space-around'}} inline accepter={RadioGroup} onChange={(value) => updateField('itemStatus', value)} defaultValue={formData.itemStatus}>
                                                    <Radio value="N">Nuevo</Radio>
                                                    <Radio value="U">Usado</Radio>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId={'wholesalePrice'}>
                                                <Form.ControlLabel><strong>Precio Por Mayor</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaDollarSign />
                                                    </InputGroup.Addon>
                                                    <Form.Control name="wholesalePrice" accepter={InputNumber} min={0} formatter={(value) => `${value} Bs.`} onChange={(value) => updateField('wholesalePrice', parseFloat(value))} />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId="branchOfficeID">
                                                <Form.ControlLabel><strong>Sucursal</strong></Form.ControlLabel>
                                                <Form.Control name="branchOfficeID" label={<BsShop/>} accepter={SelectPicker} value={formData.branchOfficeID} onChange={(value) => updateField('branchOfficeID', value)} data={branchOfficeOptions} searchable loading={loadingBranchOffice} placeholder={loadingBranchOffice ? "Cargando..." : "Selecciona una sucursal *"} style={{ width: "100%" }}/>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Form.Group controlId={'acronym'}>
                                                <Form.ControlLabel><strong>Código de Barra</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaBarcode />
                                                    </InputGroup.Addon>
                                                    <Form.Control name="acronym" placeholder="Acrónimo del artículo *" onChange={(value) => updateField('acronym', value.toUpperCase())} />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId={'purchasePrice'}>
                                                <Form.ControlLabel ><strong>Precio Público</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaDollarSign />
                                                    </InputGroup.Addon>
                                                    <Form.Control name="purchasePrice" accepter={InputNumber} min={0} formatter={(value) => `${value} Bs.`} onChange={(value) => updateField('purchasePrice', parseFloat(value))} />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId={'dateManufacture'}>
                                                <Form.ControlLabel><strong>Fecha de Fabricación</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaCalendar />
                                                    </InputGroup.Addon>
                                                    <Form.Control name="dateManufacture" type="date" onChange={(value) => updateField('dateManufacture', value)} />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Grid>
                            </Tabs.Tab>
                            <Tabs.Tab eventKey="2" title="Detalles Técnicos">
                                <Grid fluid>
                                    <Row>
                                        <div style={{ marginBottom:20 }}>
                                            <h5>Detalles Técnicos</h5>
                                            <p>Ingrese todos los datos técnicos del repuesto.</p>
                                        </div>
                                        <Col xs={24} md={8}>
                                            <Form.Group controlId={'brandID'}>
                                                <Form.ControlLabel><strong>Marca</strong></Form.ControlLabel>
                                                <Form.Control name="brandID" accepter={SelectPicker} value={formData.brandID} onChange={(value) => updateField('brandID', value)} label={<BsShieldShaded/>} data={brandsOptions} searchable loading={loadingBrands} placeholder={loadingBrands ? "Cargando..." : "Selecciona una marca *"} style={{width: "100%"}} />
                                            </Form.Group>
                                            <Form.Group controlId={'alias'}>
                                                <Form.ControlLabel><strong>Año</strong></Form.ControlLabel>
                                                    <InputGroup inside>
                                                        <InputGroup.Addon>
                                                            <BsCalendarDate />
                                                        </InputGroup.Addon>
                                                        <Form.Control name="alias" placeholder="Desde - hasta *" onChange={(value) => updateField('alias', value.toUpperCase())} />
                                                    </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId={'transmission'}>
                                                <Form.ControlLabel><strong>Transmisión</strong></Form.ControlLabel>
                                                <SelectPicker value={formData.transmission} onChange={(value) => updateField('transmission', value)} label={<FaCar />} data={transmitionsOptions} searchable loading={loadingSubCategories} placeholder={ loadingSubCategories? "Cargando..." : "Selecciona una transmision *"} style={{width: "100%"}} />
                                            </Form.Group>
                                            <Form.Group controlId={'quantity'}>
                                                <Form.ControlLabel><strong>Stock</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaBoxOpen />
                                                    </InputGroup.Addon>
                                                    <Form.Control name="quantity" accepter={InputNumber} min={0} formatter={(value) => `${value} Unidades.`} onChange={(value) => updateField('quantity', parseFloat(value))} />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Form.Group controlId={'model'}>
                                                <Form.ControlLabel><strong>Modelo</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaSignature />
                                                    </InputGroup.Addon>
                                                    <Form.Control name="model" placeholder="Ingrese el modelo del repuesto *" onChange={(value) => updateField('model', value.toUpperCase())} />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId={'fuel'}>
                                                <Form.ControlLabel><strong>Combustible</strong></Form.ControlLabel>    
                                                <SelectPicker  value={formData.fuel} onChange={(value) => updateField('fuel', value)} label={<BsFillFuelPumpFill />} data={combustibleTypesOptions} searchable loading={loadingSubCategories} placeholder={ loadingSubCategories? "Cargando..." : "Selecciona un tipo de combustible"} style={{width: "100%"}} />
                                            </Form.Group>
                                            <Form.Group controlId={'itemSeries'}>
                                                <Form.ControlLabel><strong>Serie del Motor</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <BsClipboardMinusFill  />
                                                    </InputGroup.Addon>
                                                    <Form.Control name="itemSeries" placeholder="Ingrese la serie del repuesto *" onChange={(value) => updateField('itemSeries', value.toUpperCase())} />
                                                </InputGroup>    
                                            </Form.Group>
                                            <Form.Group controlId={'barePrice'}>
                                                <Form.ControlLabel ><strong>Precio Pelado</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaDollarSign />
                                                    </InputGroup.Addon>
                                                    <Form.Control name="barePrice" accepter={InputNumber} min={0} formatter={(value) => `${value} Bs.`} onChange={(value) => updateField('barePrice', parseFloat(value))} />
                                                </InputGroup>   
                                            </Form.Group>
                                        </Col>
                                        <Col xs={24} md={8} >
                                            <Form.Group controlId={'cylinderCapacity'}>
                                                <Form.ControlLabel><strong>Cilindrada</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaCog />
                                                    </InputGroup.Addon>
                                                    <Form.Control name="cylinderCapacity" value={formData.cylinderCapacity} placeholder="Ingrese la cilindrada del repuesto *" onChange={(value) => updateField('cylinderCapacity', value)} />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId="subCategoryID">
                                                <Form.ControlLabel><strong>Sub-Categoría</strong></Form.ControlLabel>
                                                <Form.Control name="subCategoryID" label={<FaCubes/>} accepter={SelectPicker} value={formData.subCategoryID} onChange={(value) => updateField('subCategoryID', value)} data={subCategoriesOptions} searchable loading={loadingSubCategories} placeholder={loadingSubCategories ? "Cargando..." : "Selecciona una subcategoría *"} style={{ width: "100%" }} />                                          
                                            </Form.Group>
                                            <Form.Group controlId={'traction'}>
                                                <Form.ControlLabel><strong>Tracción</strong></Form.ControlLabel>
                                                <Form.Control style={{ justifyContent:'space-around'}} name="traction" inline accepter={RadioGroup} onChange={(value) => updateField('traction', value)} defaultValue={formData.traction}>
                                                    <Radio value="2">Tracción 4x2</Radio>
                                                    <Radio value="4">Tracción 4x4</Radio>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={24} md={24} style={{ marginTop:20 }}>
                                            <Form.Group controlId={'description'}>
                                                <Form.ControlLabel><strong>Especificaciones</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaAlignJustify />
                                                    </InputGroup.Addon>
                                                    <Input value={formData.description} name="description" as={'textarea'} rows={5} placeholder="Especificaciones del repuesto *" onChange={(value) => updateField('description', value.toUpperCase())} />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Grid>
                            </Tabs.Tab>
                            <Tabs.Tab eventKey="3" title="Imágenes">
                                <div style={{ marginBottom:20 }}>
                                    <h5>Imágenes del repuesto</h5>
                                    <p>Suba imágenes del repuesto, parte frontal, lateral o trasera u otros aspectos relevantes del repuesto.</p>
                                </div>
                                <Form.Group controlId="pathItems">
                                    <Form.Control
                                        name="pathItems"
                                        accepter={Uploader}
                                        autoUpload={false}
                                        multiple
                                        listType="picture-text"
                                        action="/"
                                        onChange={(file) => {
                                            handleFileChange(file, updateField);
                                        }}
                                        onRemove={(file) => {
                                            handleFileRemoveFromList(file, updateField);
                                        }}
                                        defaultFileList={[]}
                                        draggable>
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
                <Divider/>
                <ModalFooter>
                    <Button onClick={(e) => handleFormSubmit(e)} type="submit" loading={loading} appearance="primary">Aceptar</Button>
                    <Button onClick={handleCancel} appearance="default">Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}