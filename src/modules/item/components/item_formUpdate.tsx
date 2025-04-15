/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaAlignJustify, FaCalendar, FaCamera, FaCog, FaCubes, FaDollarSign, FaListAlt, FaMapMarkerAlt, FaSignature, FaTag } from "react-icons/fa";
import { Button, Col, Form, Grid, InputGroup, Message, Modal, Row, Stack, useToaster, Uploader, SelectPicker, Input, Loader } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { getBrandsAsync, getItemAdressesAsync, getItemAsyncById, getSubCategoryAsync, updateItemAsync } from "../services/item.service";
import "../styles/styles.css";
import { FormEvent, useState, useRef, useMemo, useEffect} from "react";
import { Brand, ItemAddress, ItemById, SubCategory } from "../models/item.model";
import { deleteFile, fileUpload } from "../services/storage.service";
import { useNotificationService } from "../../../context/NotificationContext";
import { useAuthStore } from "../../../store/store";
import { jwtDecoder } from "../../../utils/jwtDecoder";
import { useApi } from "../../../common/services/useApi";
import { useUpdateItemFormStore } from "../validations/useUpdateItemFormStorn";

interface ItemModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
    id: number;
    onItemUpdated?: () => void;
}

export default function ItemForm({open, hiddeModal, id, onItemUpdated} : ItemModalParams){
    const toaster = useToaster();
    const formRef = useRef<any>();
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

    const [isValidImgs, setIsValidImgs] = useState<boolean>(false);
    const [originalImages, setOriginalImages] = useState<string[]>([]);
    const notificationService = useNotificationService();
    const jwt = useAuthStore(state => state.jwt);

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

   

    useEffect(() => {
        if (open && id) {
            fetchData();
        }
    }, [open, id, fetchData]);

    const showSuccessMessage = () => {
        toaster.push(
            <Message closable showIcon type="success" >
                Edicion exitoso!
            </Message>,
            { placement: 'topCenter', duration: 3000 }
        );
    };
    
    const handleFileChange = async (files: any[]) => {
        try {
            console.log(`Item: ${formData.name}`);
            console.log('Iniciando manejo de archivos...');
            const currentUrls = formData.itemImages;
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
            updateField('itemImages', updatedUrls);
    
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

    const brandsOptionsES = {
        searchPlaceholder: "Buscar marca..."
    };
    
    const itemAddressesOptionsES = {
        searchPlaceholder: "Buscar direccion..."
    };
    
    const subCategoriesOptionsES = {
        searchPlaceholder: "Buscar sub-categoria..."
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
        updateField('userID', userId as number);

        if (formRef.current.check()) {
            console.error("El formulario no es válido");
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
            await updateItemAsync(formData);
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
                hiddeModal(false);
                if (onItemUpdated) {
                    onItemUpdated(); 
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
            const currentImages = formData.itemImages.map((file: any) => file.url || file); 
            const imagesToDelete = currentImages.filter(url => !originalImages.includes(url)); 

            if (imagesToDelete.length > 0) {
                console.log("Eliminando imágenes nuevas al cancelar:", imagesToDelete);
                await Promise.all(imagesToDelete.map(async (url) => {
                    try {
                        await deleteFile(url);
                        console.log(`Imagen eliminada del storage: ${url}`);
                    } catch (error) {
                        console.error(`Error al eliminar la imagen ${url}:`, error);
                    }
                }));
            } else {
                console.log("No hay imágenes nuevas para eliminar al cancelar.");
            }
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
            <Modal size={"lg"} open={open} onClose={() => hiddeModal(false)} overflow>
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
                                                <Form.ControlLabel>Precio del Repuesto</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaDollarSign />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="price"
                                                        type="number"
                                                        onChange={(value) => updateField('price', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId={'wholesalePrice'}>
                                                <Form.ControlLabel>Precio al por mayor</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaDollarSign />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="wholesalePrice"
                                                        type="number"
                                                        onChange={(value) => updateField('wholesalePrice', value)}
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
                                                        type="number"
                                                        onChange={(value) => updateField('barePrice', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group controlId={'brandID'}>
                                                <Form.ControlLabel>Marca del Repuesto</Form.ControlLabel>
                                                <SelectPicker locale={brandsOptionsES} value={formData.brandID} onChange={(value) => updateField('brandID', value)} label={<FaTag/>} data={brandsOptions} searchable loading={loadingBrands} placeholder={ loadingBrands? "Cargando..." : "Selecciona una marca"} style={{width: "100%"}} />
                                            </Form.Group>

                                            <Form.Group controlId={'subCategoryID'}>
                                                <Form.ControlLabel>Sub-Categoria</Form.ControlLabel>    
                                                <SelectPicker locale={subCategoriesOptionsES} value={formData.subCategoryID} onChange={(value) => updateField('subCategoryID', value)} label={<FaListAlt/>} data={subCategoriesOptions} searchable loading={loadingSubCategories} placeholder={ loadingSubCategories? "Cargando..." : "Selecciona una sub-categoria"} style={{width: "100%"}} />
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
                                                <SelectPicker locale={itemAddressesOptionsES} value={formData.itemAddressID} onChange={(value) => updateField('itemAddressID', value)} label={<FaMapMarkerAlt/>} data={itemAddressesOptions} searchable loading={loadingItemAddressess} placeholder={loadingItemAddressess ? "Cargando..." : "Selecciona una direccion"} style={{width: "100%"}} />
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
                                                defaultFileList={formData.itemImages as []}
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
                            )}  
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