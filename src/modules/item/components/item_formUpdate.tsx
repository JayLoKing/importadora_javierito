import { FaAlignJustify, FaBoxOpen, FaBuilding, FaCalendar, FaCamera, FaCog, FaCubes, FaDollarSign, FaListAlt, FaMapMarkerAlt, FaSignature, FaTag } from "react-icons/fa";
import { Button, Col, Form, Grid, InputGroup, Message, Modal, Row, Stack, useToaster, Uploader, SelectPicker } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { ItemRegisterForm } from "../hooks/useItemForm";
import { BranchOffice } from "../../branchOffice/models/branchOffice.model";
import { FetchDataAsync } from "../services/itemService";
import "../styles/styles.css";
import { FormEvent, useState } from "react";
import { Brand, ItemAddress, SubCategory } from "../models/item.model";
import { fileUpload } from "../services/storageService";

interface ItemModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
}

const urlFetchBranchOffice = "/branchOffice/getAll";
const urlFetchBrands = "/brands/getAllBrands";
const urlFetchItemAddress = "/itemAddresses/getAllItemAddresses";
const urlFetchSubCategories = "/subCategories/getAllSubCategories";

export default function ItemUpdate({open, hiddeModal} : ItemModalParams){
    const toaster = useToaster();
    const { data: dataBranchOffice, loading: loadingBranchOffice } = FetchDataAsync<BranchOffice[]>(urlFetchBranchOffice);
    const { data: dataBrands, loading: loadingBrands } = FetchDataAsync<Brand[]>(urlFetchBrands);
    const { data: dataItemAddresses, loading: loadingItemAddressess } = FetchDataAsync<ItemAddress[]>(urlFetchItemAddress);
    const { data: dataSubCategories, loading: loadingSubCategories } = FetchDataAsync<SubCategory[]>(urlFetchSubCategories);
    const [isValidImgs, setIsValidImgs] = useState<boolean>(false);
   

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

    const {
        formValue,
        handleInputChange,
        formRef,
        model,
        handleSubmit,
    } = ItemRegisterForm();

     const handleFileChange = async (files: File[]) => {
            try {
                
                const uploadPromises = files.map(async (file) => {
                    const pathImage = await fileUpload(file, formValue);
                    return pathImage;
                });
                const pathImages = await Promise.all(uploadPromises);
                console.log(pathImages.length);
                if(pathImages.length > 5 || pathImages.length < 0){
                    setIsValidImgs(true);
                } 
                setIsValidImgs(false);
                handleInputChange('pathItems', [...formValue.pathItems, ...pathImages]);
                
            } catch (error) {
                console.error('Error al cargar archivos:', error);
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
                        <Stack spacing={24} direction="row" alignItems="flex-start" justifyContent="center">
                            <Form ref={formRef} model={model} formValue={formValue} fluid>
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
                                                        onChange={(value) => handleInputChange('name', value)}
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
                                                        onChange={(value) => handleInputChange('alias', value)}
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
                                                        onChange={(value) => handleInputChange('model', value)}
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
                                                        onChange={(value) => handleInputChange('price', value)}
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
                                                        onChange={(value) => handleInputChange('wholesalePrice', value)}
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
                                                        onChange={(value) => handleInputChange('barePrice', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group controlId={'brandID'}>
                                                <Form.ControlLabel>Marca del Repuesto</Form.ControlLabel>
                                                <SelectPicker onChange={(value) => handleInputChange('brandID', value)} label={<FaTag/>} data={brandsOptions} searchable loading={loadingBrands} placeholder={ loadingBrands? "Cargando..." : "Selecciona una marca"} style={{width: "100%"}} />
                                            </Form.Group>


                                            <Form.Group controlId={'subCategoryID'}>
                                                <Form.ControlLabel>Sub-Categoria</Form.ControlLabel>    
                                                <SelectPicker onChange={(value) => handleInputChange('subCategoryID', value)} label={<FaListAlt/>} data={subCategoriesOptions} searchable loading={loadingSubCategories} placeholder={ loadingSubCategories? "Cargando..." : "Selecciona una sub-categoria"} style={{width: "100%"}} />
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
                                                        onChange={(value) => handleInputChange('dateManufacture', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                    </Col> 
                                    <Col xs={24} md={8}>
                                        <Form.Group controlId={'itemAddressID'}>
                                            <Form.ControlLabel>Dirección del Repuesto</Form.ControlLabel>
                                                <SelectPicker onChange={(value) => handleInputChange('itemAddressID', value)} label={<FaMapMarkerAlt/>} data={itemAddressesOptions} searchable loading={loadingItemAddressess} placeholder={loadingItemAddressess ? "Cargando..." : "Selecciona una direccion"} style={{width: "100%"}} />
                                            </Form.Group>
                                            <Form.Group controlId={'branchOfficeID'}>
                                                <Form.ControlLabel>Sucursales</Form.ControlLabel>
                                                <SelectPicker onChange={(value) => handleInputChange('branchOfficeID', value)} label={<FaBuilding/>} data={branchOfficeOptions} searchable loading={loadingBranchOffice} placeholder={loadingBranchOffice ? "Cargando..." : "Selecciona una sucursal"} style={{width: "100%"}} />
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
                                                        onChange={(value) => handleInputChange('quantity', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId={'acronym'}>
                                                <Form.ControlLabel>Acrónimo del Artículo</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaSignature />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="acronym"
                                                        placeholder="Acrónimo del artículo"
                                                        onChange={(value) => handleInputChange('acronym', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                    
                                    </Col>
                                    <Col xs={24} md={24} style={{marginTop:'12px'}}>
                                    <Form.Group controlId={'description'}>
                                        <Form.ControlLabel>Descripción del Repuesto</Form.ControlLabel>
                                        <InputGroup inside>
                                            <InputGroup.Addon>
                                                <FaAlignJustify />
                                            </InputGroup.Addon>
                                            <textarea style={{width: "100%", border:"none", outline:"none", resize:"none"}} value={formValue.description}  placeholder="Descripción del repuesto" id="description" name="description" onChange={(e) => handleInputChange('description', e.target.value)} rows={5}  >

                                            </textarea>
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
                                                 defaultFileList={[]}>
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
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button  type="submit" appearance="primary">Guardar</Button>
                    <Button onClick={() => hiddeModal(open)} appearance="default">Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}