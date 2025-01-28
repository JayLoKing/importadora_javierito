import { FaAlignJustify, FaCalendar, FaCamera, FaCode, FaDollarSign, FaUser, FaWeight } from "react-icons/fa";
import { Button, Col, Form, Grid, TagInput, InputGroup, Message, Modal, Row, Stack, useToaster, Uploader } from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { ItemRegisterForm } from "../hooks/useItemForm";

interface ItemModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
}

export default function ItemForm({open, hiddeModal} : ItemModalParams){
    const toaster = useToaster();

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

    const handleFormSubmit = async () => {
        const success = await handleSubmit(showSuccessMessage);
        if (!success) {
            toaster.push(
                <Message closable showIcon type="error">
                    Hubo un error en el registro
                </Message>,
                { placement: 'topCenter', duration: 3000 }
            );
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
                        <Stack spacing={24} alignItems="flex-start" justifyContent="center">
                            <Form ref={formRef} model={model} formValue={formValue} onSubmit={handleFormSubmit}>
                                <Row>
                                    <Col xs={24} md={12}>
                                            <Form.Group controlId={'name'}>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaUser />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="name"
                                                        placeholder="Nombre del respuesto"
                                                        onChange={(value) => handleInputChange('name', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group controlId={'alias'}>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaUser />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="alias"
                                                        placeholder="Sobrenombre/Alias del repuesto"
                                                        onChange={(value) => handleInputChange('alias', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group controlId={'description'}>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaAlignJustify />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="description"
                                                        placeholder="Descripción del repuesto"
                                                        onChange={(value) => handleInputChange('description', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group controlId={'model'}>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaUser />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="model"
                                                        placeholder="Modelo del repuesto"
                                                        onChange={(value) => handleInputChange('model', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId={'price'}>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaDollarSign />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="price"
                                                        type="number"
                                                        placeholder="Precio del repuesto"
                                                        onChange={(value) => handleInputChange('price', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group controlId={'wholesalePrice'}>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaDollarSign />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="wholesalePrice"
                                                        type="number"
                                                        placeholder="Precio al por mayor"
                                                        onChange={(value) => handleInputChange('wholesalePrice', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group controlId={'barePrice'}>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaDollarSign />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="barePrice"
                                                        type="number"
                                                        placeholder="Precio base"
                                                        onChange={(value) => handleInputChange('barePrice', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group controlId={'brandID'}>
                                                <Form.Control
                                                    name="brandID"
                                                    type="number"
                                                    placeholder="ID de la marca"
                                                    onChange={(value) => handleInputChange('brandID', value)}
                                                />
                                            </Form.Group>
                                    </Col>
                                    <Col xs={24} md={12}>
                                            <Form.Group controlId={'subCategoryID'}>
                                                <Form.Control
                                                    name="subCategoryID"
                                                    type="number"
                                                    placeholder="ID de la subcategoría"
                                                    onChange={(value) => handleInputChange('subCategoryID', value)}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId={'weight'}>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaWeight />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="weight"
                                                        type="number"
                                                        placeholder="Peso del repuesto"
                                                        onChange={(value) => handleInputChange('weight', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group controlId={'dateManufacture'}>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaCalendar />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="dateManufacture"
                                                        type="date"
                                                        placeholder="Fecha de fabricación"
                                                        onChange={(value) => handleInputChange('dateManufacture', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>

                                            <Form.Group controlId={'itemAddressID'}>
                                                <Form.Control
                                                    name="itemAddressID"
                                                    type="number"
                                                    placeholder="ID de la dirección del artículo"
                                                    onChange={(value) => handleInputChange('itemAddressID', value)}
                                                />
                                            </Form.Group>
                                            
                                            <Form.Group controlId={'branchOfficeID'}>
                                                <Form.Control
                                                    name="branchOfficeID"
                                                    type="number"
                                                    placeholder="ID de la sucursal"
                                                    onChange={(value) => handleInputChange('branchOfficeID', value)}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId={'quantity'}>
                                                <Form.Control
                                                    name="quantity"
                                                    type="number"
                                                    placeholder="Cantidad del artículo"
                                                    onChange={(value) => handleInputChange('quantity', value)}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId={'barcodes'}>
                                                {/* <Form.Control
                                                    name="barcodes"
                                                    accepter={TagInput}
                                                    placeholder="Códigos de barras del artículo"
                                                    onChange={(value) => handleInputChange('barcodes', value)}
                                                    multiple
                                                /> */}
                                                <TagInput
                                                    name="barcodes"
                                                    trigger={['Enter', 'Space', 'Comma']}
                                                    placeholder="Codigo de barra"
                                                    style={{ width: 300 }}
                                                    menuStyle={{ width: 300 }}
                                                    onCreate={(value, item) => {
                                                        console.log(value, item);
                                                    }}
                                                    />
                                            </Form.Group>

                                            <Form.Group controlId={'acronym'}>
                                                <InputGroup inside>
                                                    <InputGroup.Addon>
                                                        <FaCode />
                                                    </InputGroup.Addon>
                                                    <Form.Control
                                                        name="acronym"
                                                        placeholder="Acrónimo del artículo"
                                                        onChange={(value) => handleInputChange('acronym', value)}
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                    </Col> 
                                </Row>
                                <Row>
                                    <Col xs={24} md={24} style={{marginTop:'12px'}}>
                                        <Form.Group controlId={'pathItems'}>
                                                <Uploader multiple listType="picture-text" action="//jsonplaceholder.typicode.com/posts/">
                                                    <button>
                                                        <FaCamera />
                                                        Subir Fotos
                                                    </button>
                                                </Uploader>
                                                {/* <Form.Control
                                                    name="pathItems"
                                                    accepter={TagInput}
                                                    placeholder="Ruta de la imagen del artículo"
                                                    onChange={(value) => handleInputChange('pathItems', value)}
                                                    multiple
                                                /> */}
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>    
                        </Stack>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" appearance="primary">Registrar</Button>
                    <Button onClick={() => hiddeModal(open)} appearance="primary" color="red">Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}