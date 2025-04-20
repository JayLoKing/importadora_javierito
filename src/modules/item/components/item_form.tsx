import { FaAlignJustify, FaBoxOpen, FaBuilding, FaCalendar, FaCamera, FaCog, FaCubes, FaDollarSign, FaListAlt, FaMapMarkerAlt, FaSignature, FaTag, FaWrench } from "react-icons/fa";
import { Button, Col, Form, Grid, InputGroup, Message, Modal, Row, Stack, useToaster, Uploader, SelectPicker, Input, Checkbox, Divider } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { BranchOffice } from "../../branchOffice/models/branchOffice.model";
import { createItemAsync, getBrandsAsync, getItemAdressesAsync, getSubCategoryAsync } from "../services/item.service";
import "../styles/styles.css";
import { FormEvent, useState, useRef, useMemo, useEffect} from "react";
import { Brand, ItemAddress, SubCategory } from "../models/item.model";
import { deleteFile, fileUpload } from "../services/storage.service";
import { useCreateItemFormStore } from "../validations/useCreateItemFormStore";
import { useNotificationService } from "../../../context/NotificationContext";
import { useAuthStore } from "../../../store/store";
import { jwtDecoder } from "../../../utils/jwtDecoder";
import { useApi } from "../../../common/services/useApi";
import { getBranchOfficesAsync2 } from "../../branchOffice/services/branchOfficeService";
import { useRegisterItem } from "../hooks/useRegisterItem";
import ModalHeader from "rsuite/esm/Modal/ModalHeader";

interface ItemModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
    onItemCreated?: () => void;
}

export default function ItemForm({open, hiddeModal, onItemCreated} : ItemModalParams){
    const toaster = useToaster();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formRef = useRef<any>();
    const {formData, updateField, resetForm, validationModel} = useCreateItemFormStore();
    const { branchOfficeOptionsES,brandsOptionsES,itemAddressesOptionsES,subCategoriesOptionsES} = useRegisterItem();
    // Fetch para sucursales, marcas, direcciones y subcategorías
    const fetchBranchOfficesAsync = useMemo(() => getBranchOfficesAsync2(), []);
    const { data: dataBranchOffice, loading: loadingBranchOffice, fetch: fetchBranchOffices } = useApi<BranchOffice[]>(fetchBranchOfficesAsync, { autoFetch: true });

    const fetchItemSubCategoryAsync = useMemo(() => getSubCategoryAsync(), []);
    const { data: dataSubCategories, loading: loadingSubCategories, fetch: fetchItemSubCategory } = useApi<SubCategory[]>(fetchItemSubCategoryAsync, { autoFetch: true });

    const fetchItemAdressesAsync = useMemo(() => getItemAdressesAsync(), []);
    const { data: dataItemAddresses, loading: loadingItemAddressess, fetch: fetchItemAdresses } = useApi<ItemAddress[]>(fetchItemAdressesAsync, { autoFetch: true });

    const fetchItemBrandsAsync = useMemo(() => getBrandsAsync(), []);
    const { data: dataBrands, loading: loadingBrands, fetch: fetchBrands } = useApi<Brand[]>(fetchItemBrandsAsync, { autoFetch: true });

    const [isValidImgs, setIsValidImgs] = useState<boolean>(false);
    const notificationService = useNotificationService();
    const jwt = useAuthStore(state => state.jwt);

    useEffect(() => {
        fetchBranchOffices();
        fetchItemSubCategory();
        fetchItemAdresses();
        fetchBrands();
    }, [fetchBranchOffices, fetchItemSubCategory, fetchItemAdresses, fetchBrands]);

    const branchOfficeOptions = dataBranchOffice?.map(branch => ({ label: branch.name, value: branch.id })) || [];
    const brandsOptions = dataBrands?.map(brand => ({ label: brand.name, value: brand.id })) || [];
    const itemAddressesOptions = dataItemAddresses?.map(itemAddress => ({ label: itemAddress.name, value: itemAddress.id })) || [];
    const subCategoriesOptions = dataSubCategories?.map(subCategory => ({ label: subCategory.name, value: subCategory.id })) || [];

    const showSuccessMessage = () => {
        toaster.push(
            <Message closable showIcon type="success" >
                Registro exitoso
            </Message>,
            { placement: 'topCenter', duration: 3000 }
        );
    };
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFileChange = async (files: any[]) => {
        try {
            console.log(`Item: ${formData.name}`);
            console.log('Iniciando manejo de archivos...');
            const currentUrls = formData.pathItems;
            console.log('URLs actuales en pathItems:', currentUrls);
            const removedUrls = currentUrls.filter(
                (url) => !files.some((file) => file.url === url)
            );
            console.log('URLs eliminadas:', removedUrls);
    
            if (removedUrls.length > 0) {
                console.log('Eliminando archivos del storage...');
                await Promise.all(removedUrls.map(async (url) => {
                    try {
                        console.log(`Eliminando archivo con URL: ${url}`);
                        await deleteFile(url);
                        console.log(`Archivo eliminado correctamente: ${url}`);
                    } catch (error) {
                        console.error(`Error al eliminar el archivo ${url}:`, error);
                    }
                }));
            } else {
                console.log('No hay archivos para eliminar.');
            }
    
            const newImages = files.filter((file) => file.blobFile).map((file) => file.blobFile);
    
            console.log('Nuevas imágenes a subir:', newImages);
    
            const totalImagesAfterUpdate = newImages.length + currentUrls.length - removedUrls.length;
            console.log('Total de imágenes después de la actualización:', totalImagesAfterUpdate);
    
            if (totalImagesAfterUpdate > 5) {
                console.log('Límite de imágenes excedido. No se subirán más imágenes.');
                toaster.push(
                    <Message closable showIcon type="warning">
                        No puede subir mas de 5 imágenes
                    </Message>,
                    { placement: 'topCenter', duration: 3000 }
                );
                setIsValidImgs(true);
                return; 
            }
    
            console.log('Subiendo nuevas imágenes al storage...');
            const uploadPromises = newImages.map(async (file) => {
                try {
                    console.log(`Subiendo archivo: ${file.name || 'archivo sin nombre'}`);
                    const pathImage = await fileUpload(file, formData.name ?? "DefaultNAME");
                    console.log(`Archivo subido correctamente. URL: ${pathImage}`);
                    return pathImage;
                } catch (error) {
                    console.error('Error al subir el archivo:', error);
                    return null;
                }
            });
    
            const pathImages = (await Promise.all(uploadPromises)).filter((url) => url !== null);
            console.log('URLs de las nuevas imágenes subidas:', pathImages);
    
            const updatedUrls = [...currentUrls.filter((url) => !removedUrls.includes(url)), ...pathImages];
            console.log('URLs actualizadas en pathItems:', updatedUrls);
            updateField('pathItems', updatedUrls);
    
            setIsValidImgs(false);
            console.log('Manejo de archivos completado correctamente.');
        } catch (error) {
            console.error('Error al manejar archivos:', error);
            toaster.push(
                <Message closable showIcon type="error">
                    Error al manejar las imágenes
                </Message>,
                { placement: 'topCenter', duration: 3000 }
            );
        }
    };

   
    const getUsernameAndRoleName = () => {
        let roleName, userName, userId;
        if(jwt){
            const decode = jwtDecoder(jwt);
            switch(decode.role){
                case "ROLE_Admin":
                    roleName = "Administrador"; 
                    userName = decode.sub;
                    userId = decode.id;
                    break;
                case "ROLE_Owner":
                    roleName = "Dueño"; 
                    userName = decode.sub;
                    userId = decode.id;
                    break;
                default:
                    roleName = "Vendedor";
                    userName = decode.sub;
                    userId = decode.id;
                    break;
            }
            return [roleName, userName, userId];
        }
        return "";
    }

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const [roleName, userName, userId] = getUsernameAndRoleName();
        formData.userID = userId as number;
        const result = await formRef.current.checkAsync();
        if (!result.hasError) {
            console.log("Formulario válido, procediendo...");
        } else {
            console.error("El formulario no es válido");
            console.warn("Errores de validación:", result);
            console.warn("Formulario:", formData);
            return;
        }

        if (isValidImgs) {
            toaster.push(
                <Message closable showIcon type="warning">
                    Tienen que ser 5 imágenes.
                </Message>,
                { placement: 'topCenter', duration: 3000 }
            );
            return;
        }

        try {
            await createItemAsync(formData);
                showSuccessMessage();
                notificationService.addNotification({
                    message: 'creó un nuevo ítem',
                    timestamp: new Date(),
                    actionType: 'REGISTRO',
                    type: 'Repuesto',
                    userName: userName as string,
                    targetRole: roleName as string,
                });
                formRef.current.reset();
                resetForm();
                hiddeModal(false);
                if(onItemCreated){
                    onItemCreated();
                }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toaster.push(
                <Message closable showIcon type="error">
                    Error al crear el item
                </Message>,
                { placement: 'topCenter', duration: 3000 }
            );
        }
    };

    const handleCancel = async () => {
        try {
            if (formData.pathItems.length > 0) {
                await Promise.all(formData.pathItems.map((url) => deleteFile(url)));
            }
            hiddeModal(false);
            resetForm();
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
            <Modal size={"lg"} open={open} onClose={() => hiddeModal(false)} overflow>
            <ModalHeader>
                <ModalTitle style={{ fontWeight: "bold" }}>Nuevo Repuesto</ModalTitle> 
            </ModalHeader>
                <ModalBody>
                    <Grid fluid>
                        <Stack spacing={24} direction="row" alignItems="flex-start" justifyContent="center">
                            <Form ref={formRef} model={validationModel} formValue={formData} fluid>
                                <Row>
                                    <Divider style={{ fontWeight: 'bold', marginTop:"7px" }}>Información del Repuesto</Divider>
                                    <Col xs={24} md={8}>
                                        <Form.Group controlId={'name'}>
                                            <Form.ControlLabel>Nombre del Repuesto</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaCog />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="name"
                                                        placeholder="Ingrese el nombre del repuesto *"
                                                        onChange={(value) => updateField('name', value)}
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
                                                        type="number"
                                                        onChange={(value) => updateField('price', parseFloat(value))} />
                                                </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId={'itemAddressID'}>
                                            <Form.ControlLabel>Dirección del Repuesto</Form.ControlLabel>
                                            <SelectPicker locale={itemAddressesOptionsES} value={formData.itemAddressID} onChange={(value) => updateField('itemAddressID', value)} label={<FaMapMarkerAlt/>} data={itemAddressesOptions} searchable loading={loadingItemAddressess} placeholder={loadingItemAddressess ? "Cargando..." : "Selecciona una direccion"} style={{width: "100%"}} />
                                        </Form.Group>
                                        <Form.Group controlId={'brandID'}>
                                            <Form.ControlLabel>Marca</Form.ControlLabel>
                                            <SelectPicker locale={brandsOptionsES} value={formData.brandID} onChange={(value) => updateField('brandID', value)} label={<FaTag/>} data={brandsOptions} searchable loading={loadingBrands} placeholder={ loadingBrands? "Cargando..." : "Selecciona una marca"} style={{width: "100%"}} />
                                        </Form.Group>
                                        <Form.Group controlId={'alias'}>
                                            <Form.ControlLabel>Año </Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaTag />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="alias"
                                                        placeholder="año entre año *"
                                                        onChange={(value) => updateField('alias', value)}
                                                    />
                                                </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId={'subCategoryID'}>
                                            <Form.ControlLabel>Transmisión</Form.ControlLabel>    
                                            <SelectPicker locale={subCategoriesOptionsES} value={formData.subCategoryID} onChange={(value) => updateField('subCategoryID', value)} label={<FaListAlt/>} data={subCategoriesOptions} searchable loading={loadingSubCategories} placeholder={ loadingSubCategories? "Cargando..." : "Selecciona una sub-categoria"} style={{width: "100%"}} />
                                        </Form.Group>
                                        <Form.Group controlId={'quantity'}>
                                            <Form.ControlLabel>Stock</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaBoxOpen />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        defaultValue={111}
                                                        name="quantity"
                                                        type="number"
                                                        onChange={(value) => updateField('quantity', parseFloat(value))}
                                                    />
                                                </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Form.Group controlId={'newor'}>
                                            <Form.ControlLabel>Estado del Repuesto</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaWrench />
                                                    </InputGroup.Addon>
                                                    <Checkbox>Nuevo</Checkbox>
                                                    <Checkbox>Usado</Checkbox>
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
                                                        type="number"
                                                        onChange={(value) => updateField('wholesalePrice', parseFloat(value))}
                                                    />
                                                </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId={'branchOfficeID'}>
                                            <Form.ControlLabel>Sucursal</Form.ControlLabel>
                                            <SelectPicker locale={branchOfficeOptionsES} value={formData.branchOfficeID} onChange={(value) => updateField('branchOfficeID', value)} label={<FaBuilding/>} data={branchOfficeOptions} searchable loading={loadingBranchOffice} placeholder={loadingBranchOffice ? "Cargando..." : "Selecciona una sucursal"} style={{width: "100%"}} />
                                        </Form.Group>
                                        <Form.Group controlId={'model'}>
                                            <Form.ControlLabel>Modelo</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaCubes />
                                                    </InputGroup.Addon>
                                                    <Form.Control 
                                                        name="model"
                                                        placeholder="Ingrese el modelo del repuesto *"
                                                        onChange={(value) => updateField('model', value)}
                                                    />
                                                </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId={'subCategoryID'}>
                                            <Form.ControlLabel>Combustible</Form.ControlLabel>    
                                            <SelectPicker locale={subCategoriesOptionsES} value={formData.subCategoryID} onChange={(value) => updateField('subCategoryID', value)} label={<FaListAlt/>} data={subCategoriesOptions} searchable loading={loadingSubCategories} placeholder={ loadingSubCategories? "Cargando..." : "Selecciona una sub-categoria"} style={{width: "100%"}} />
                                        </Form.Group>
                                        <Form.Group controlId={'model'}>
                                            <Form.ControlLabel>Serie del Motor</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaCubes />
                                                    </InputGroup.Addon>
                                                    <Form.Control 
                                                        name="model"
                                                        placeholder="Ingrese el modelo del repuesto *"
                                                        onChange={(value) => updateField('model', value)}
                                                    />
                                                </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId={'barePrice'}>
                                            <Form.ControlLabel >Precio Pelado</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaDollarSign />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="barePrice"
                                                        type="number"
                                                        onChange={(value) => updateField('barePrice', parseFloat(value))}
                                                    />
                                                </InputGroup>
                                        </Form.Group>
                                    </Col> 
                                    <Col xs={24} md={8}>
                                        <Form.Group controlId={'acronym'}>
                                            <Form.ControlLabel>Código de Barra</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaSignature />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="acronym"
                                                        placeholder="Acrónimo del artículo"
                                                        onChange={(value) => updateField('acronym', value)}
                                                    />
                                                </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId={'purchasePrice'}>
                                            <Form.ControlLabel >Precio Publico</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaDollarSign />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="purchasePrice"
                                                        type="number"
                                                        onChange={(value) => updateField('purchasePrice', parseFloat(value))}
                                                    />
                                                </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId={'dateManufacture'}>
                                            <Form.ControlLabel>Fecha de Fabricacion</Form.ControlLabel>
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
                                        <Form.Group controlId={'name'}>
                                            <Form.ControlLabel>Cilindrada</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaCog />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="cilindrada"
                                                    />
                                                </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId={'subCategoryID'}>
                                            <Form.ControlLabel>Sub-Categoria</Form.ControlLabel>    
                                            <SelectPicker locale={subCategoriesOptionsES} value={formData.subCategoryID} onChange={(value) => updateField('subCategoryID', value)} label={<FaListAlt/>} data={subCategoriesOptions} searchable loading={loadingSubCategories} placeholder={ loadingSubCategories? "Cargando..." : "Selecciona una sub-categoria"} style={{width: "100%"}} />
                                        </Form.Group>
                                        <Form.Group controlId={'newor'}>
                                            <Form.ControlLabel>Tracción</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaWrench />
                                                    </InputGroup.Addon>
                                                    <Checkbox>4 x 2</Checkbox>
                                                    <Checkbox>4 x 4</Checkbox>
                                                </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={24} md={24} style={{marginTop:'12px'}}>
                                    <Form.Group controlId={'description'}>
                                        <Form.ControlLabel>Especificaciones</Form.ControlLabel>
                                        <InputGroup inside>
                                            <InputGroup.Addon>
                                                <FaAlignJustify />
                                            </InputGroup.Addon>
                                            <Input
                                                value={formData.description}
                                                name="description"
                                                as={'textarea'}
                                                rows={5}
                                                placeholder="Descripción del repuesto"
                                                onChange={(value) => updateField('description', value)} />
                                        </InputGroup>
                                    </Form.Group>
                                       
                                    </Col>  
                                    <Col xs={24} md={24} style={{marginTop:'12px'}}>
                                        <Form.Group controlId={'pathItems'}>
                                            <Form.ControlLabel>Imagenes del Repuesto</Form.ControlLabel>
                                            <Uploader
                                                id="fileImage"
                                                autoUpload={false}
                                                multiple
                                                listType="picture-text"
                                                action="/"
                                                onChange={async (filesList) => {
                                                    const files = filesList
                                                        .map(file => file.blobFile) 
                                                        .filter(Boolean) 
                                                        .map(blobFile => ({
                                                            name: blobFile!.name, 
                                                            blobFile, 
                                                        }));
                                                    await handleFileChange(files);
                                                }}
                                                defaultFileList={formData.pathItems as []}
                                            >
                                                <button>
                                                    <FaCamera />
                                                </button>
                                            </Uploader>
                                                <Form.HelpText>Maximo 5 Imagenes</Form.HelpText>
                                        </Form.Group>
                                    </Col>          
                                </Row>
                            </Form>    
                        </Stack>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => handleFormSubmit(e)} type="submit" appearance="primary">Aceptar</Button>
                    <Button onClick={handleCancel} appearance="default">Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}