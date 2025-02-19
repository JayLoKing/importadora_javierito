import { FaAlignJustify,  FaCalendar, FaCamera, FaCog, FaCubes, FaDollarSign, FaListAlt, FaMapMarkerAlt, FaTag } from "react-icons/fa";
import { Button, Col, Form, Grid, InputGroup, Message, Modal, Row, Stack, useToaster, Uploader, SelectPicker, Loader, Input } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { FetchDataAsync, FetchDataByIdAsync } from "../services/itemService";
import "../styles/styles.css";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Brand, ItemById, ItemAddress, SubCategory } from "../models/item.model";
import { deleteFile, fileUpload } from "../services/storageService";
import { ItemFormUpdate } from "../hooks/useItemFormUpdate";
import { useUpdateItemFormStore } from "../hooks/useUpdateItemFormStorn";
import { ItemUrl } from "../urls/item.url";

interface ItemModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
    id: number;
}

export default function ItemUpdate({open, hiddeModal, id} : ItemModalParams){
    const toaster = useToaster();
    const formRef = useRef<any>();
    const memoizedBody = useMemo(() => ({ itemID: id }), [id]);
    const { data: itemData, fetchData, loading } = FetchDataByIdAsync<ItemById>(ItemUrl.getById, memoizedBody);
    
    const { data: dataBrands, loading: loadingBrands } = FetchDataAsync<Brand[]>(ItemUrl.getAllBrands);
    const { data: dataItemAddresses, loading: loadingItemAddressess } = FetchDataAsync<ItemAddress[]>(ItemUrl.getAllAddresses);
    const { data: dataSubCategories, loading: loadingSubCategories } = FetchDataAsync<SubCategory[]>(ItemUrl.getAllSubCategories);
    const [isValidImgs, setIsValidImgs] = useState<boolean>(false);
    const { formData, loadData, updateField,validationModel} = useUpdateItemFormStore();
    const { handleSubmit } = ItemFormUpdate();

    useEffect(() => {
        if (itemData && itemData.itemImages) {
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
                weight: itemData.weight,
                userID: 0
           });
           //updateField('itemImages', fileList);
        }
    }, [itemData, loadData]);

    useEffect(() => {
        if (open && id) {
            fetchData();
        }
    }, [open, id, fetchData]);

    const brandsOptions = dataBrands?.map(brand => ({
        label: brand.name,
        value: brand.id 
     })) || [];

     const itemAddressesOptions = dataItemAddresses?.map(itemAddress => ({
        label: itemAddress.name,
        value: itemAddress.id 
     })) || [];

     const subCategoriesOptions = dataSubCategories?.map(subCategory => ({
        label: subCategory.name,
        value: subCategory.id 
     })) || [];
    
    const showSuccessMessage = () => {
        toaster.push(
            <Message closable showIcon type="success" >
                Registro exitoso
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

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(isValidImgs);
        if(isValidImgs){
            toaster.push(
                <Message closable showIcon type="warning" >
                    Tienen que ser 5 imagenes.
                </Message>,
                { placement: 'topCenter', duration: 3000 }
            );
        } else {
            const success = await handleSubmit(showSuccessMessage);
            if (!success) {
                toaster.push(
                    <Message closable showIcon type="error">
                        Hubo un error en el registro
                    </Message>,
                    { placement: 'topCenter', duration: 3000 }
                );
            }
        }
    };

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
                        {loading ? (
                            <Row>
                                <Col xs={24} md={24} sm={24}>
                                <Stack justifyContent="center" alignItems="center" direction="column">
                                    <Loader content="Cargando..." vertical />
                                </Stack>
                                </Col>
                            </Row>
                        ):(
                            <Stack spacing={24} direction="row" alignItems="flex-start" justifyContent="center">
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
                                                    <SelectPicker value={formData.brandID} onChange={(value) => updateField('brandID', value)} label={<FaTag/>} data={brandsOptions} searchable loading={loadingBrands} placeholder={ loadingBrands? "Cargando..." : "Selecciona una marca"} style={{width: "100%"}} />
                                                </Form.Group>


                                                <Form.Group controlId={'subCategoryID'}>
                                                    <Form.ControlLabel>Sub-Categoria</Form.ControlLabel>    
                                                    <SelectPicker value={formData.subCategoryID} onChange={(value) => updateField('subCategoryID', value)} label={<FaListAlt/>} data={subCategoriesOptions} searchable loading={loadingSubCategories} placeholder={ loadingSubCategories? "Cargando..." : "Selecciona una sub-categoria"} style={{width: "100%"}} />
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
                                        </Col> 
                                        <Col xs={24} md={8}>
                                            <Form.Group controlId={'itemAddressID'}>
                                                <Form.ControlLabel>Dirección del Repuesto</Form.ControlLabel>
                                                    <SelectPicker value={formData.itemAddressID} onChange={(value) => updateField('itemAddressID', value)} label={<FaMapMarkerAlt/>} data={itemAddressesOptions} searchable loading={loadingItemAddressess} placeholder={loadingItemAddressess ? "Cargando..." : "Selecciona una direccion"} style={{width: "100%"}} />
                                            </Form.Group>
                                            
                                            
                                                
                                        
                                        </Col>
                                        <Col xs={24} md={24} style={{marginTop:'12px'}}>
                                        <Form.Group controlId={'description'}>
                                            <Form.ControlLabel>Descripción del Repuesto</Form.ControlLabel>
                                            <InputGroup inside>
                                                <InputGroup.Addon>
                                                    <FaAlignJustify />
                                                </InputGroup.Addon>
                                                <Input
                                                    value={formData.description}
                                                    name="description"
                                                    as={'textarea'}
                                                    rows={5}
                                                    onChange={(value) => updateField('description', value)} />
                                            </InputGroup>
                                        </Form.Group>
                                        
                                    </Col>  
                                        <Col xs={24} md={24} style={{marginTop:'12px'}}>
                                            <Form.Group controlId={'pathItems'}>
                                                <Form.ControlLabel>Imágenes del Repuesto</Form.ControlLabel>
                                                    <Uploader id="fileImage" autoUpload={false} multiple listType="picture-text" action="/" onChange={
                                                        async (filesList) => {
                                                            const files = filesList.map(file => file.blobFile).filter(Boolean) as File[];
                                                            await handleFileChange(files)
                                                        }
                                                    } 
                                                    defaultFileList={formData.itemImages.map((url, index) => ({
                                                        name: `image-${index + 1}`, 
                                                        url, 
                                                    }))}
                                                    >
                                                        <button>
                                                            <FaCamera />
                                                        </button>
                                                    </Uploader>
                                                    <Form.HelpText>Máximo 5 Imagenes</Form.HelpText>
                                            </Form.Group>
                                        </Col>          
                                    </Row>
                                </Form>    
                            </Stack>
                        )}
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button  type="submit" appearance="primary">Guardar</Button>
                    <Button onClick={() => {hiddeModal(open)}} appearance="default">Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}