/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaAlignJustify, FaCalendar, FaCamera, FaCog, FaCubes, FaDollarSign, FaMapMarkerAlt, FaSignature, FaTag } from "react-icons/fa";
import { Button, Col, Form, Grid, InputGroup, Message, Modal, Row, Stack, useToaster, Uploader, SelectPicker, Input, Loader, InputNumber } from "rsuite";
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
                <ModalTitle>
                    <Stack justifyContent="center" alignItems="center">
                        <strong>Editar Respuesto</strong>
                    </Stack>   
                </ModalTitle>
                <ModalBody>
                    <Grid fluid>
                        <Stack spacing={24} direction="row" alignItems="flex-start" justifyContent="center">
                            {loadingItemData ? (
                                <>
                                <Row >
                                    <Col xs={24} md={24} style={{height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <Loader size="lg" content="Cargando Informacion!" />
                                    </Col>
                                </Row>
                                </>
                            ) : (
                                <Form ref={formRef} model={validationModel} formValue={formData} fluid>
                                <Row>
                                    <Col xs={24} md={8}>
                                            <Form.Group controlId={'name'}>
                                                <Form.ControlLabel>Nombre del Repuesto</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaCog />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="name"
                                                        onChange={(value) => updateField('name', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group controlId={'alias'}>
                                                <Form.ControlLabel>Alias del repuesto</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaTag />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="alias"
                                                        onChange={(value) => updateField('alias', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId={'model'}>
                                                <Form.ControlLabel>Modelo del repuesto</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaCubes />
                                                    </InputGroup.Addon>
                                                    <Form.Control 
                                                        name="model"
                                                        onChange={(value) => updateField('model', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId={'price'}>
                                            <Form.ControlLabel>Precio Unitario</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaDollarSign />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="price"
                                                        accepter={InputNumber}
                                                        min={0}
                                                        formatter={(value) => `${value} Bs.`}
                                                        placeholder="Ingrese el precio unitario *"
                                                        
                                                        onChange={(value) => updateField('price', parseFloat(value))} />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId={'wholesalePrice'}>
                                            <Form.ControlLabel>Precio Por Mayor</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaDollarSign />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="wholesalePrice"
                                                        accepter={InputNumber}
                                                        min={0}
                                                        formatter={(value) => `${value} Bs.`}
                                                        onChange={(value) => updateField('wholesalePrice', parseFloat(value))}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Form.Group controlId={'barePrice'}>
                                            <Form.ControlLabel >Precio base</Form.ControlLabel>
                                            <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaDollarSign />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="barePrice"
                                                        accepter={InputNumber}
                                                        min={0}
                                                        formatter={(value) => `${value} Bs.`}
                                                        onChange={(value) => updateField('barePrice', parseFloat(value))}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group controlId={'brandID'}>
                                                <Form.ControlLabel>Marca</Form.ControlLabel>
                                                <Form.Control
                                                    name="brandID"
                                                    accepter={SelectPicker}
                                                    value={formData.brandID}
                                                    onChange={(value) => updateField('brandID', value)}
                                                    label={<FaTag/>}
                                                    data={brandsOptions}
                                                    searchable
                                                    loading={loadingBrands}
                                                    placeholder={loadingBrands ? "Cargando..." : "Selecciona una marca"}
                                                    style={{width: "100%"}}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="subCategoryID">
                                                <Form.ControlLabel>Sub-Categoría</Form.ControlLabel>
                                                <Form.Control
                                                    name="subCategoryID"
                                                    accepter={SelectPicker}
                                                    value={formData.subCategoryID}
                                                    onChange={(value) => updateField('subCategoryID', value)}
                                                    data={subCategoriesOptions}
                                                    searchable
                                                    loading={loadingSubCategories}
                                                    placeholder={loadingSubCategories ? "Cargando..." : "Selecciona una subcategoría"}
                                                    style={{ width: "100%" }}
                                                />                                          
                                            </Form.Group>

                                            <Form.Group controlId={'dateManufacture'}>
                                                <Form.ControlLabel>Fecha de la Fabricacion</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaCalendar />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="dateManufacture"
                                                        type="date"
                                                        onChange={(value) => updateField('dateManufacture', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                             <Form.Group controlId={'acronym'}>
                                                <Form.ControlLabel>Acronimo del Articulo</Form.ControlLabel>
                                                    <InputGroup inside>
                                                        <InputGroup.Addon>
                                                            <FaSignature />
                                                        </InputGroup.Addon>
                                                        <Form.Control
                                                            value={formData.acronym}
                                                            name="acronym"
                                                            placeholder="Acrónimo del artículo"
                                                            onChange={(value) => updateField('acronym', value)}
                                                        />
                                                </InputGroup>
                                            </Form.Group>
                                    </Col> 
                                    <Col xs={24} md={8}>
                                        <Form.Group controlId={'itemAddressID'}>
                                            <Form.ControlLabel>Dirección del Repuesto</Form.ControlLabel>
                                                <SelectPicker  value={formData.itemAddressID} onChange={(value) => updateField('itemAddressID', value)} label={<FaMapMarkerAlt/>} data={itemAddressesOptions} searchable loading={loadingItemAddressess} placeholder={loadingItemAddressess ? "Cargando..." : "Selecciona una direccion"} style={{width: "100%"}} />
                                        </Form.Group>
                                        
                                    </Col>
                                    <Col xs={24} md={24} style={{marginTop:'12px'}}>
                                    <Form.Group controlId={'description'}>
                                        <Form.ControlLabel>Descripcion del Repuesto</Form.ControlLabel>
                                        <InputGroup inside>
                                            <InputGroup.Addon>
                                                <FaAlignJustify />
                                            </InputGroup.Addon>
                                            <Input
                                                value={formData.description}
                                                name="description"
                                                as={'textarea'}
                                                rows={5}
                                                placeholder="Descripcion del repuesto"
                                                onChange={(value) => updateField('description', value)} />
                                        </InputGroup>
                                    </Form.Group>
                                       
                                    </Col>  
                                    <Col xs={24} md={24} style={{marginTop:'12px'}}>
                                    <Form.Group controlId="itemImages">
                                        <Form.ControlLabel>Imágenes del Repuesto</Form.ControlLabel>
                                        <Form.Control
                                            name="itemImages"
                                            accepter={Uploader}
                                            autoUpload={false}
                                            loading={loadingItemData}
                                            multiple
                                            listType="picture-text"
                                            action="/"
                                            fileList={formData.itemImages as []}
                                            onChange={(file) => {
                                                handleFileChange(file, updateField);
                                            }}
                                            onRemove={(file) => {
                                                handleFileRemoveFromList(file, updateField);
                                            }}
                                            
                                            draggable
                                            style={{ width: '100%' }}
                                        >
                                            <button style={{ 
                                            width: '100%',
                                            padding: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            border: '1px dashed #ddd',
                                            borderRadius: '4px',
                                            background: '#f7f7f7',
                                            cursor: 'pointer'
                                            }}>
                                            <FaCamera style={{ fontSize: '24px', marginBottom: '8px', color: '#555' }} />
                                            <span>Haz clic o arrastra imágenes aquí</span>
                                            </button>
                                        </Form.Control>
                                        <Form.HelpText>Máximo 5 imágenes (JPG, PNG)</Form.HelpText>
                                        </Form.Group>
                                    </Col>          
                                </Row>
                            </Form>  
                            )}  
                        </Stack>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => handleFormSubmit(e)} loading={loading} type="submit" appearance="primary">Aceptar</Button>
                    <Button onClick={handleCancel} appearance="default">Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}