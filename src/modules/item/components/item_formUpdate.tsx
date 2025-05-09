/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaAlignJustify, FaCalendar, FaCamera, FaCog, FaCubes, FaDollarSign, FaMapMarkerAlt, FaSignature, FaTag, FaBoxOpen } from "react-icons/fa";
import { Button, Col, Form, Grid, InputGroup, Message, Modal, Row, Stack, useToaster, Uploader, SelectPicker, Input, Loader, InputNumber, Tabs, Radio } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { getBrandsAsync, getItemAdressesAsync, getItemAsyncById, getSubCategoryAsync, updateItemAsync } from "../services/item.service";
import "../styles/styles.css";
import { FormEvent, useState, useRef, useMemo, useEffect} from "react";
import { Brand, ItemAddress, ItemById, SubCategory } from "../models/item.model";
import { useNotificationService } from "../../../context/NotificationContext";
import { useApi } from "../../../common/services/useApi";
import { useUpdateItemFormStore } from "../validations/useUpdateItemFormStorn";
import { useAuthStore } from "../../../store/store";
import { useUpdateItem } from "../hooks/useUpdateItem";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";
import { BsWrenchAdjustable, BsShieldShaded, BsFillPinMapFill, BsShop, BsCalendarDate, BsFillFuelPumpFill, BsClipboardMinusFill   } from "react-icons/bs";
import { FaBarcode, FaCheck } from "react-icons/fa6";

interface ItemModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
    id: number;
    onItemUpdated?: () => void;
}

export default function ItemForm({open, hiddeModal, id, onItemUpdated} : ItemModalParams){
    const toaster = useToaster();
    const formRef = useRef<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const {userId, userName, role} = useAuthStore();
    const {showErrorMessage, showWarningFilesMessage,setFilesToRemove,setFiles,originalImages,  showSuccessMessage, setOriginalImages,handleFileRemove, files,filesToRemove,handleFileUpload,handleFileChange, handleRoles, handleFileRemoveFromList} = useUpdateItem();
    const {formData, loadData, updateField, validationModel} = useUpdateItemFormStore();

    const fetchItemByIdAsync = useMemo(() => {
        if(open && id){
            return getItemAsyncById(id);
        }
        return null;
    },[id]);
    const { data: itemData, fetch: fetchData, loading: loadingItemData } = useApi<ItemById>(fetchItemByIdAsync!, { autoFetch: false });

    const fetchItemSubCategoryAsync = useMemo(() => getSubCategoryAsync(), []);
    const { data: dataSubCategories, loading: loadingSubCategories, fetch: fetchItemSubCategory } = useApi<SubCategory[]>(fetchItemSubCategoryAsync, { autoFetch: true });

    const fetchItemAdressesAsync = useMemo(() => getItemAdressesAsync(), []);
    const { data: dataItemAddresses, loading: loadingItemAddressess, fetch: fetchItemAdresses } = useApi<ItemAddress[]>(fetchItemAdressesAsync, { autoFetch: true });

    const fetchItemBrandsAsync = useMemo(() => getBrandsAsync(), []);
    const { data: dataBrands, loading: loadingBrands, fetch: fetchBrands } = useApi<Brand[]>(fetchItemBrandsAsync, { autoFetch: true });

    
    useEffect(() => {
        if (open && id) {
            fetchData();
        }
    }, [open, id, fetchData]);

    const notificationService = useNotificationService();

    useEffect(() => {
        fetchItemSubCategory();
        fetchItemAdresses();
        fetchBrands();
    }, [fetchItemSubCategory, fetchItemAdresses, fetchBrands]);

    const brandsOptions = dataBrands?.map(brand => ({ label: brand.name, value: brand.id })) || [];
    const itemAddressesOptions = dataItemAddresses?.map(itemAddress => ({ label: itemAddress.name, value: itemAddress.id })) || [];
    const subCategoriesOptions = dataSubCategories?.map(subCategory => ({ label: subCategory.name, value: subCategory.id })) || [];

    useEffect(() => {
        if (itemData && !Array.isArray(itemData) && itemData.itemImages) {
            const fileList = itemData.itemImages.map((url, index) => ({
                name: `image-${index + 1}`,
                url,
                fileKey: url,
            }));
            loadData({
                itemID: itemData.itemID,
                name: itemData.name,
                alias: itemData.alias,
                model: itemData.model,
                price: itemData.price,
                wholesalePrice: itemData.wholesalePrice,
                barePrice: itemData.barePrice,
                brandID: itemData.brandID,
                subCategoryID: itemData.subCategoryID,
                dateManufacture: itemData.dateManufacture,
                itemAddressID: itemData.itemAddressID,
                description: itemData.description,
                itemImages: fileList as any,
                userID: 0,
                acronym: itemData.acronym,
           });
           setOriginalImages(itemData.itemImages);
        }
    }, [itemData, loadData]);

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        

        try {
            formData.userID = userId as number;
        console.log("Datos del formulario:", formData);
        const currentFilesToRemove = [...filesToRemove];
        console.log('Archivos a eliminar confirmados:', currentFilesToRemove);
        
        const currentUrls = originalImages.filter(url => !currentFilesToRemove.includes(url));
        console.log("URLs actuales:", currentUrls); 
        formData.itemImages = currentUrls; 
        const result = await formRef.current.checkAsync();
        if (result.hasError) {
            console.error("El formulario no es válido");
            console.warn("Errores de validación:", result);
            console.log("Errores de validación:", formData);
            setLoading(false);
            showErrorMessage("Formulario no válido, por favor revise los campos resaltados en rojo.");
            if(result.formError?.pathItems){
                showWarningFilesMessage("Suba al menos 1 imagen y un máximo de 5 imágenes (JPG, PNG)"); 
            } 
            return;
        }
             // 2. Subir nuevas imágenes (las que no tienen URL)
            const filesToUpload = files.filter(file => !file.url);
            const uploadedUrls = await handleFileUpload(filesToUpload) || [];
            console.log("nuevas urls:", uploadedUrls);
            // 4. Actualizar el campo pathItems con:
            // - URLs de imágenes existentes que no se eliminaron
            // - URLs de nuevas imágenes subidas
            
           
                
            const allUrls = [...currentUrls, ...uploadedUrls];
            console.log("Todas las URLs:", allUrls);
           
            formData.itemImages = allUrls;
    
            console.log("Datos finales del formulario:", formData);


            const  {call} = await updateItemAsync(formData);
                if((await call).status !== 200) {
                await handleFileRemove(formData.itemImages);
                showErrorMessage("Error al crear el ítem respuesta del servidor");
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
                hiddeModal(false);
                if (onItemUpdated) {
                    onItemUpdated(); 
                }
                handleFileRemove(filesToRemove);
                setFilesToRemove([]);
                setFiles([]);
                setOriginalImages([]);
        } catch (error) {
            console.error("Error al crear el ítem:", error);
            await handleFileRemove(formData.itemImages as string[]);
            showErrorMessage("Error al editar el ítem");
            setLoading(false);
        } finally {
            setLoading(false); 
            setFilesToRemove([]);
                setFiles([]);
                setOriginalImages([]);
        }
    };

    const handleCancel = async () => {
        try {
            setFilesToRemove([]);
            setFiles([]);
            setOriginalImages([]);
            hiddeModal(false);
            formRef.current.reset();
        } catch (error) {
            console.error('Error al cancelar el formulario:', error);
            toaster.push(
                <Message closable showIcon type="error">
                    Error al cancelar el formulario
                </Message>,
                { placement: 'topCenter', duration: 3000 }
            );
        }
    }

    return (
        <>
            <Modal size={"lg"} open={open} onClose={() => hiddeModal(false)} overflow backdrop="static">
                <ModalHeader>
                    <ModalTitle style={{ fontWeight: "bold" }}>Editar Repuesto</ModalTitle>    
                </ModalHeader>
                <ModalBody>
                    {loadingItemData ? (
                        <>
                            <Row>
                                <Col xs={24} md={24} style={{ height: "200px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Loader size="lg" content="Cargando Informacion!" />
                                </Col>
                            </Row>
                        </>
                    ) : (
                    <Form ref={formRef} model={validationModel} formValue={formData} fluid>
                        <Tabs defaultActiveKey="1" appearance="pills">
                            <Tabs.Tab eventKey="1" title="Información General">
                                <Grid fluid >
                                    <Row>
                                        <div style={{ marginBottom:20 }}>
                                            <h5>Información General</h5>
                                            <p>Edite todos los campos con los datos del repuesto.</p>
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
                                            {/* <Form.Group controlId={'itemStatus'} >
                                                <Form.ControlLabel><strong>Estado del Repuesto</strong></Form.ControlLabel>
                                                <Form.Control name="itemStatus" style={{ justifyContent:'space-around'}} inline accepter={RadioGroup} onChange={(value) => updateField('itemStatus', value)} defaultValue={formData.itemStatus}>
                                                    <Radio value="N">Nuevo</Radio>
                                                    <Radio value="U">Usado</Radio>
                                                </Form.Control>
                                            </Form.Group> */}
                                            <Form.Group controlId={'wholesalePrice'}>
                                                <Form.ControlLabel><strong>Precio Por Mayor</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaDollarSign />
                                                    </InputGroup.Addon>
                                                    <Form.Control name="wholesalePrice" accepter={InputNumber} min={0} formatter={(value) => `${value} Bs.`} onChange={(value) => updateField('wholesalePrice', parseFloat(value))} />
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
                                            {/* <Form.Group controlId={'purchasePrice'}>
                                                <Form.ControlLabel ><strong>Precio Público</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaDollarSign />
                                                    </InputGroup.Addon>
                                                    <Form.Control name="purchasePrice" accepter={InputNumber} min={0} formatter={(value) => `${value} Bs.`} onChange={(value) => updateField('purchasePrice', parseFloat(value))} />
                                                </InputGroup>
                                            </Form.Group> */}
                                        </Col>
                                    </Row>
                                </Grid>
                            </Tabs.Tab>
                            <Tabs.Tab eventKey="2" title="Detalles Técnicos">
                                <Grid fluid >
                                    <Row>
                                        <div style={{ marginBottom:20 }}>
                                            <h5>Detalles Técnicos</h5>
                                            <p>Edite todos los datos técnicos del repuesto.</p>
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
                                                    <Form.Control name="alias" placeholder="Desde - hasta *" onChange={(value) => updateField('alias', value)} />
                                                </InputGroup>
                                            </Form.Group>
                                            {/* <Form.Group controlId={'transmission'}>
                                                <Form.ControlLabel><strong>Transmisión</strong></Form.ControlLabel>
                                                <SelectPicker value={formData.transmission} onChange={(value) => updateField('transmission', value)} label={<FaCar />} data={transmitionsOptions} searchable loading={loadingSubCategories} placeholder={ loadingSubCategories? "Cargando..." : "Selecciona una transmision *"} style={{width: "100%"}} />
                                            </Form.Group> */}
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Form.Group controlId={'model'}>
                                                <Form.ControlLabel><strong>Modelo</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaSignature />
                                                    </InputGroup.Addon>
                                                    <Form.Control name="model" placeholder="Ingrese el modelo del repuesto *" onChange={(value) => updateField('model', value)} />
                                                </InputGroup>
                                            </Form.Group>
                                            {/* <Form.Group controlId={'fuel'}>
                                                <Form.ControlLabel><strong>Combustible</strong></Form.ControlLabel>    
                                                <SelectPicker  value={formData.fuel} onChange={(value) => updateField('fuel', value)} label={<BsFillFuelPumpFill />} data={combustibleTypesOptions} searchable loading={loadingSubCategories} placeholder={ loadingSubCategories? "Cargando..." : "Selecciona un tipo de combustible"} style={{width: "100%"}} />
                                            </Form.Group> */}
                                            {/* <Form.Group controlId={'itemSeries'}>
                                                <Form.ControlLabel><strong>Serie del Motor</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <BsClipboardMinusFill  />
                                                    </InputGroup.Addon>
                                                    <Form.Control name="itemSeries" placeholder="Ingrese la serie del repuesto *" onChange={(value) => updateField('itemSeries', value)} />
                                                </InputGroup>    
                                            </Form.Group> */}
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
                                        <Col xs={24} md={8}>
                                            {/* <Form.Group controlId={'cylinderCapacity'}>
                                                <Form.ControlLabel><strong>Cilindrada</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaCog />
                                                    </InputGroup.Addon>
                                                    <Form.Control name="cylinderCapacity" value={formData.cylinderCapacity} placeholder="Ingrese la cilindrada del repuesto *" onChange={(value) => updateField('cylinderCapacity', value)} />
                                                </InputGroup>
                                            </Form.Group> */}
                                            <Form.Group controlId="subCategoryID">
                                                <Form.ControlLabel><strong>Sub-Categoría</strong></Form.ControlLabel>
                                                <Form.Control name="subCategoryID" label={<FaCubes/>} accepter={SelectPicker} value={formData.subCategoryID} onChange={(value) => updateField('subCategoryID', value)} data={subCategoriesOptions} searchable loading={loadingSubCategories} placeholder={loadingSubCategories ? "Cargando..." : "Selecciona una subcategoría *"} style={{ width: "100%" }} />                                          
                                            </Form.Group>
                                            {/* <Form.Group controlId={'traction'}>
                                                <Form.ControlLabel><strong>Tracción</strong></Form.ControlLabel>
                                                <Form.Control style={{ justifyContent:'space-around'}} name="traction" inline accepter={RadioGroup} onChange={(value) => updateField('traction', value)} defaultValue={formData.traction}>
                                                    <Radio value="2">Tracción 4x2</Radio>
                                                    <Radio value="4">Tracción 4x4</Radio>
                                                </Form.Control>
                                            </Form.Group> */}
                                        </Col>
                                        <Col xs={24} md={24} style={{ marginTop:20 }}>
                                            <Form.Group controlId={'description'}>
                                                <Form.ControlLabel><strong>Especificaciones</strong></Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaAlignJustify />
                                                    </InputGroup.Addon>
                                                    <Input name="description" value={formData.description} as={'textarea'} rows={5} placeholder="Especificaciones del repuesto *" onChange={(value) => updateField('description', value)} />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Grid>
                            </Tabs.Tab>
                            <Tabs.Tab eventKey="3" title="Imágenes">
                                <div style={{ marginBottom:20 }}>
                                    <h5>Imágenes del repuesto</h5>
                                    <p>Edite las imágenes del repuesto, parte frontal, lateral o trasera u otros aspectos relevantes del repuesto.</p>
                                </div>
                                <Form.Group controlId="itemImages">
                                    <Form.Control
                                        name="itemImages"
                                        accepter={Uploader}
                                        autoUpload={false}
                                        loading={loadingItemData}
                                        multiple
                                        listType="picture-text"
                                        action="/"
                                        fileList={formData.itemImages as []}
                                        draggable
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
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => handleFormSubmit(e)} loading={loading} type="submit" appearance="primary">Aceptar</Button>
                    <Button onClick={handleCancel} appearance="default">Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}