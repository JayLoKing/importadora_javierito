import { FaAlignJustify, FaBoxOpen, FaBuilding, FaCalendar, FaCamera, FaCog, FaCubes, FaDollarSign, FaListAlt, FaMapMarkerAlt, FaSignature, FaTag, FaWeight } from "react-icons/fa";
import { Button, Col, Form, Grid, InputGroup, Message, Modal, Row, Stack, useToaster, Uploader, SelectPicker, InputNumber, Input } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { BranchOffice } from "../../branchOffice/models/branchOffice.model";
import { FetchDataAsync } from "../services/itemService";
import "../styles/styles.css";
import { FormEvent, useState, useRef} from "react";
import { Brand, ItemAddress, SubCategory } from "../models/item.model";
import { fileUpload } from "../services/storageService";
import { ItemUrl } from "../urls/item.url";
import { BranchOfficeUrl } from "../../branchOffice/urls/branchOffice.url";
import { useCreateItemFormStore } from "../hooks/useCreateItemFormStore";
import { useItemForm } from "../hooks/useItemForm";

interface ItemModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
}

export default function ItemForm({open, hiddeModal} : ItemModalParams){
    const toaster = useToaster();
    const formRef = useRef<any>();
    const { data: dataBranchOffice, loading: loadingBranchOffice } = FetchDataAsync<BranchOffice[]>(BranchOfficeUrl.getAll);
    const { data: dataBrands, loading: loadingBrands } = FetchDataAsync<Brand[]>(ItemUrl.getAllBrands);
    const { data: dataItemAddresses, loading: loadingItemAddressess } = FetchDataAsync<ItemAddress[]>(ItemUrl.getAllAddresses);
    const { data: dataSubCategories, loading: loadingSubCategories } = FetchDataAsync<SubCategory[]>(ItemUrl.getAllSubCategories);
    const [isValidImgs, setIsValidImgs] = useState<boolean>(false);
    const {formData, updateField, resetForm, validationModel} = useCreateItemFormStore();
    const {handleSubmit} = useItemForm();

    const branchOfficeOptions = dataBranchOffice?.map(branch => ({
       label: branch.name,
       value: branch.id 
    })) || [];

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
    
     const handleFileChange = async (files: File[]) => {
        try {
            const uploadPromises = files.map(async (file) => {
                const pathImage = await fileUpload(file, formData);
                return pathImage;
            });
            const pathImages = await Promise.all(uploadPromises);
            console.log(pathImages.length);
            if(pathImages.length > 5 || pathImages.length < 0){
                setIsValidImgs(true);
            } 
            setIsValidImgs(false);
            updateField('pathItems', [...formData.pathItems, ...pathImages]);
                
        } catch (error) {
            console.error('Error al cargar archivos:', error);
        }
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formRef.current.check()) {
            console.error(formData);
            console.error("El formulario no es válido");
            return;
        }

        if(isValidImgs){
            toaster.push(
                <Message closable showIcon type="warning" >
                    Tienen que ser 5 imagenes.
                </Message>,
                { placement: 'topCenter', duration: 3000 }
            );
        } else {
            const success = await handleSubmit(showSuccessMessage, formData);
            if (!success) {
                toaster.push(
                    <Message closable showIcon type="error">
                        Hubo un error en el registro
                    </Message>,
                    { placement: 'topCenter', duration: 3000 }
                );
            }
            formRef.current.reset();
            resetForm();
        }
    };

    return (
        <>
            <Modal size={"lg"} open={open} onClose={() => hiddeModal(false)} overflow>
                <ModalTitle>
                    <Stack justifyContent="center" alignItems="center">
                        <strong>Nuevo Respuesto</strong>
                    </Stack>   
                </ModalTitle>
                <ModalBody>
                    <Grid fluid>
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
                                                <SelectPicker onChange={(value) => updateField('brandID', value)} label={<FaTag/>} data={brandsOptions} searchable loading={loadingBrands} placeholder={ loadingBrands? "Cargando..." : "Selecciona una marca"} style={{width: "100%"}} />
                                            </Form.Group>


                                            <Form.Group controlId={'subCategoryID'}>
                                                <Form.ControlLabel>Sub-Categoria</Form.ControlLabel>    
                                                <SelectPicker onChange={(value) => updateField('subCategoryID', value)} label={<FaListAlt/>} data={subCategoriesOptions} searchable loading={loadingSubCategories} placeholder={ loadingSubCategories? "Cargando..." : "Selecciona una sub-categoria"} style={{width: "100%"}} />
                                            </Form.Group>

                                            <Form.Group controlId={'weight'}>
                                                <Form.ControlLabel>Peso del repuesto</Form.ControlLabel>
                                                <InputGroup inside>
                                                   
                                                    <InputGroup.Addon>
                                                        <FaWeight />
                                                    </InputGroup.Addon>
                                                    <InputNumber name="weight" defaultValue={100} formatter={value => `${value} kg`}  onChange={(value) => updateField('weight', value)}/>
                                                </InputGroup>
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
                                            <Form.ControlLabel>Direccion del Repuesto</Form.ControlLabel>
                                                <SelectPicker onChange={(value) => updateField('itemAddressID', value)} label={<FaMapMarkerAlt/>} data={itemAddressesOptions} searchable loading={loadingItemAddressess} placeholder={loadingItemAddressess ? "Cargando..." : "Selecciona una direccion"} style={{width: "100%"}} />
                                            </Form.Group>
                                            <Form.Group controlId={'branchOfficeID'}>
                                                <Form.ControlLabel>Sucursales</Form.ControlLabel>
                                                <SelectPicker onChange={(value) => updateField('branchOfficeID', value)} label={<FaBuilding/>} data={branchOfficeOptions} searchable loading={loadingBranchOffice} placeholder={loadingBranchOffice ? "Cargando..." : "Selecciona una sucursal"} style={{width: "100%"}} />
                                            </Form.Group>

                                            <Form.Group controlId={'quantity'}>
                                                <Form.ControlLabel>Cantidad del Repuesto</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaBoxOpen />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        defaultValue={111}
                                                        name="quantity"
                                                        type="number"
                                                        onChange={(value) => updateField('quantity', value)}
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
                                                        name="acronym"
                                                        placeholder="Acrónimo del artículo"
                                                        onChange={(value) => updateField('acronym', value)}
                                                    />
                                                </InputGroup>
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
                                                 onChange={
                                                    async (filesList) => {
                                                        const files = filesList.map(file => file.blobFile).filter(Boolean) as File[];
                                                        await handleFileChange(files)
                                                    }
                                                } 
                                                 defaultFileList={[]}>
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
                    <Button onClick={(e) => handleFormSubmit(e)} type="submit" appearance="primary">Registrar</Button>
                    <Button onClick={() => hiddeModal(open)} appearance="default">Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}