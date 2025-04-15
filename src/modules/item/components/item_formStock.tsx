/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, InputGroup, Modal, SelectPicker, Stack} from "rsuite";
import ModalBody from "rsuite/esm/Modal/ModalBody";
import ModalFooter from "rsuite/esm/Modal/ModalFooter";
import ModalTitle from "rsuite/esm/Modal/ModalTitle";
import { useUpdateStockFormStore } from "../validations/useUpdateStockFormStore";
import { useApi } from "../../../common/services/useApi";
import { BranchOffice } from "../../branchOffice/models/branchOffice.model";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { getBranchOfficesAsync2 } from "../../branchOffice/services/branchOfficeService";
import { useRegisterItem } from "../hooks/useRegisterItem";
import { FaBuilding, FaBoxOpen} from "react-icons/fa";
import { createStockAsync } from "../services/stock.service";
import { useUpdateStock } from "../hooks/useUpdateStock";
import { getAcronymAsync } from "../services/item.service";
import { ItemAcronym } from "../models/item.model";

interface StockModalParams {
    open: boolean;
    hiddeModal: (hide: boolean) => void;
    id?: number;
    onStockUpdated?: () => void;
}

export default function UpdateStock ({open, hiddeModal,id, onStockUpdated} : StockModalParams) {
    const {formData, updateField, resetForm, validationModel, loadData} = useUpdateStockFormStore();
    const fetchBranchOfficesAsync = useMemo(() => getBranchOfficesAsync2(), []);
    const fetchAcronymByIdAsync = useMemo(() => {
            if(open && id){
                return getAcronymAsync(id);
            }
            return null;
    },[id]);
    const { data: acronymData, fetch: fetchData } = useApi<ItemAcronym>(fetchAcronymByIdAsync!, { autoFetch: true });
    const { data: dataBranchOffice, loading: loadingBranchOffice, fetch: fetchBranchOffices } = useApi<BranchOffice[]>(fetchBranchOfficesAsync, { autoFetch: true });
    const { branchOfficeOptionsES } = useRegisterItem();
    const branchOfficeOptions = dataBranchOffice?.map(branch => ({ label: branch.name, value: branch.id })) || [];
    const {showErrorMessage, showSuccessMessage} = useUpdateStock();
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef<any>();

    useEffect(() => {
        if(open && id){
            resetForm();
            fetchBranchOffices();
            fetchData();
        }
    }, [fetchBranchOffices, fetchData]);

    useEffect(() => {
        if (acronymData && !Array.isArray(acronymData)) {
            loadData({
              itemId: acronymData.id,
              acronym: acronymData.acronym,
           });
        }
    }, [acronymData]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            console.log(formData);
            const result = await formRef.current.checkAsync();
            if (result.hasError) {
                console.log("Hay errores en el formulario", result.hasError);
                return;
            } 
        
            await createStockAsync(formData);
            if (onStockUpdated) {
                onStockUpdated(); 
            }
            hiddeModal(false);
            resetForm();
            showSuccessMessage();
        } catch (error) {
            console.error("Error updating stock:", error);
            showErrorMessage();
        } finally {
            setIsLoading(false);
        }
    }

    const handleCancel =  () => {
        hiddeModal(false);
        resetForm(); 
    }

    return (
        <>
            <Modal size={"xs"} open={open} onClose={() => hiddeModal(false)} overflow>
                <ModalTitle>
                    <Stack justifyContent="center" alignItems="center">
                        <strong>Actualizacion de Stock</strong>
                    </Stack>   
                </ModalTitle>
                <ModalBody>
                    <Stack spacing={24} direction="column" alignItems="center" justifyContent="center">
                        <Form ref={formRef} model={validationModel} formValue={formData} fluid>
                            <Form.Group controlId={'branchOfficeID'}>
                                <Form.ControlLabel>Sucursales</Form.ControlLabel>
                                <SelectPicker locale={branchOfficeOptionsES} value={formData.branchOfficeId} onChange={(value) => updateField('branchOfficeId', value)} label={<FaBuilding/>} data={branchOfficeOptions} searchable loading={loadingBranchOffice} placeholder={loadingBranchOffice ? "Cargando..." : "Selecciona una sucursal"} style={{width: "100%"}} />
                            </Form.Group>
                            <Form.Group controlId={'quantity'}>
                                <Form.ControlLabel>Cantidad del Repuesto</Form.ControlLabel>
                                    <InputGroup inside>
                                        <InputGroup.Addon>
                                            <FaBoxOpen />
                                        </InputGroup.Addon>
                                            <Form.Control
                                                name="quantity"
                                                type="number"
                                                onChange={(value) => updateField('quantity', parseFloat(value))}
                                    />
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => handleSubmit(e)} loading={isLoading} type="submit" appearance="primary">Aceptar</Button>
                    <Button onClick={handleCancel} appearance="default">Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}