import { FaAlignJustify, FaBoxOpen, FaCalendar, FaCamera, FaCog, FaCubes, FaDollarSign, FaListAlt, FaSignature, FaTag } from "react-icons/fa";
import { Button, Col, Form, Grid, InputGroup, Row, Stack, Uploader, SelectPicker, Input, Divider, Modal, InputNumber, RadioGroup, Radio } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { BranchOffice } from "../../branchOffice/models/branchOffice.model";
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

interface ItemModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
    onItemCreated?: () => void;
}

export default function ItemForm({open, hiddeModal, onItemCreated} : ItemModalParams){
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formRef = useRef<any>();
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
    const {limit, page, paramQuery} = useBranchOfficeTable();
    // Fetch para sucursales, marcas, direcciones y subcategorías
    const fetchBranchOfficesAsync = useMemo(() => getBranchOfficesAsync2(limit,page,paramQuery), [limit,page,paramQuery]);
    const { data: dataBranchOffice, loading: loadingBranchOffice, fetch: fetchBranchOffices } = useApi<BranchOffice[]>(fetchBranchOfficesAsync, { autoFetch: true });

    const fetchItemSubCategoryAsync = useMemo(() => getSubCategoryAsync(), []);
    const { data: dataSubCategories, loading: loadingSubCategories, fetch: fetchItemSubCategory } = useApi<SubCategory[]>(fetchItemSubCategoryAsync, { autoFetch: true });

    const fetchItemAdressesAsync = useMemo(() => getItemAdressesAsync(), []);
    const { data: dataItemAddresses, loading: loadingItemAddressess, fetch: fetchItemAdresses } = useApi<ItemAddress[]>(fetchItemAdressesAsync, { autoFetch: true });

    const fetchItemBrandsAsync = useMemo(() => getBrandsAsync(), []);
    const { data: dataBrands, loading: loadingBrands, fetch: fetchBrands } = useApi<Brand[]>(fetchItemBrandsAsync, { autoFetch: true });

    const notificationService = useNotificationService();
    const {userId, userName, role} = useAuthStore();

    useEffect(() => {
        if(open) {
            fetchBranchOffices();
            fetchItemSubCategory();
            fetchItemAdresses();
            fetchBrands();
        }
    }, [open, fetchBranchOffices, fetchItemSubCategory, fetchItemAdresses, fetchBrands]);

    const branchOfficeOptions = dataBranchOffice?.map(branch => ({ label: branch.name, value: branch.id })) || [];
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
            <ModalHeader closeButton={false}>
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
                                                        onChange={(value) => updateField('name', value.toUpperCase())}
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
                                        <Form.Group controlId="itemAddressID">
                                        <Form.ControlLabel>Dirección del Repuesto</Form.ControlLabel>
                                        <Form.Control
                                            name="itemAddressID"
                                            accepter={SelectPicker}
                                            value={formData.itemAddressID}
                                            onChange={(value) => updateField('itemAddressID', value)}
                                            data={itemAddressesOptions}
                                            searchable
                                            loading={loadingItemAddressess}
                                            placeholder={loadingItemAddressess ? "Cargando..." : "Selecciona una dirección"}
                                            style={{ width: "100%" }}
                                        />
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
                                        <Form.Group controlId={'alias'}>
                                            <Form.ControlLabel>Año </Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaTag />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="alias"
                                                        placeholder="Desde AÑO entre AÑO *"
                                                        onChange={(value) => updateField('alias', value)}
                                                    />
                                                </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId={'transmission'}>
                                            <Form.ControlLabel>Transmisión</Form.ControlLabel>
                                            <SelectPicker value={formData.transmission} onChange={(value) => updateField('transmission', value)} label={<FaListAlt/>} data={transmitionsOptions} searchable loading={loadingSubCategories} placeholder={ loadingSubCategories? "Cargando..." : "Selecciona una transmision"} style={{width: "100%"}} />
                                        </Form.Group>
                                        <Form.Group controlId={'quantity'}>
                                            <Form.ControlLabel>Stock</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaBoxOpen />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="quantity"
                                                        accepter={InputNumber}
                                                        min={0}
                                                        formatter={(value) => `${value} Unidades.`}
                                                        onChange={(value) => updateField('quantity', parseFloat(value))}
                                                    />
                                                </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <Form.Group controlId={'itemStatus'}>
                                            <Form.ControlLabel>Estado del Repuesto</Form.ControlLabel>
                                                <Form.Control name="itemStatus" inline accepter={RadioGroup} onChange={(value) => updateField('itemStatus', value)} defaultValue={formData.itemStatus}>
                                                    <Radio value="N">Nuevo</Radio>
                                                    <Radio value="U">Usado</Radio>
                                                </Form.Control>
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
                                        <Form.Group controlId="branchOfficeID">
                                            <Form.ControlLabel>Sucursal</Form.ControlLabel>
                                            <Form.Control
                                                name="branchOfficeID"
                                                accepter={SelectPicker}
                                                value={formData.branchOfficeID}
                                                onChange={(value) => updateField('branchOfficeID', value)}
                                                data={branchOfficeOptions}
                                                searchable
                                                loading={loadingBranchOffice}
                                                placeholder={loadingBranchOffice ? "Cargando..." : "Selecciona una sucursal"}
                                                style={{ width: "100%" }}
                                            />
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
                                        <Form.Group controlId={'fuel'}>
                                            <Form.ControlLabel>Combustible</Form.ControlLabel>    
                                            <SelectPicker  value={formData.fuel} onChange={(value) => updateField('fuel', value)} label={<FaListAlt/>} data={combustibleTypesOptions} searchable loading={loadingSubCategories} placeholder={ loadingSubCategories? "Cargando..." : "Selecciona un tipo de combustible"} style={{width: "100%"}} />
                                            <Form.HelpText>Solo si es motor/bomba</Form.HelpText>
                                        </Form.Group>
                                        <Form.Group controlId={'itemSeries'}>
                                            <Form.ControlLabel>Serie del Motor</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaCubes />
                                                    </InputGroup.Addon>
                                                    <Form.Control 
                                                        name="itemSeries"
                                                        placeholder="Ingrese la serie del repuesto *"
                                                        onChange={(value) => updateField('itemSeries', value)}
                                                    />
                                                </InputGroup>
                                                <Form.HelpText>Solo si es motor/bomba</Form.HelpText>
                                        </Form.Group>
                                        <Form.Group controlId={'barePrice'}>
                                            <Form.ControlLabel >Precio Pelado</Form.ControlLabel>
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
                                                <Form.HelpText>Solo si es motor/bomba</Form.HelpText>
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
                                                        placeholder="Acrónimo del artículo *"
                                                        onChange={(value) => updateField('acronym', value.toUpperCase())}
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
                                                        accepter={InputNumber}
                                                        min={0}
                                                        formatter={(value) => `${value} Bs.`}
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
                                        <Form.Group controlId={'cylinderCapacity'}>
                                            <Form.ControlLabel>Cilindrada</Form.ControlLabel>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaCog />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="cylinderCapacity"
                                                        value={formData.cylinderCapacity}
                                                        placeholder="Ingrese la cilindrada del repuesto *"
                                                        onChange={(value) => updateField('cylinderCapacity', value)}
                                                    />
                                                </InputGroup>
                                                <Form.HelpText>Solo si es motor/bomba</Form.HelpText>
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
                                        <Form.Group controlId={'traction'}>
                                            <Form.ControlLabel>Tracción</Form.ControlLabel>
                                                <Form.Control name="traction" inline accepter={RadioGroup} onChange={(value) => updateField('traction', value)} defaultValue={formData.traction}>
                                                    <Radio value="4">4x4</Radio>
                                                    <Radio value="2">4x2</Radio>
                                                </Form.Control>
                                                <Form.HelpText>Solo si es motor/bomba</Form.HelpText>
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
                                                placeholder="Especificaciones del repuesto *"
                                                onChange={(value) => updateField('description', value)} />
                                        </InputGroup>
                                    </Form.Group>
                                       
                                    </Col>  
                                    <Col xs={24} md={24} style={{marginTop:'12px'}}>
                                    <Form.Group controlId="pathItems">
                                        <Form.ControlLabel>Imágenes del Repuesto</Form.ControlLabel>
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
                        </Stack>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => handleFormSubmit(e)} type="submit" loading={loading} appearance="primary">Aceptar</Button>
                    <Button onClick={handleCancel} appearance="default">Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}