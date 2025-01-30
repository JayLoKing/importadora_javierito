import {  useRef, useState } from "react";
import {  ItemDTO, UpdateStockItem } from "../models/item.model";
import { validationItemUpdateStockModel } from "../utils/validationForm";
import {  UpdateStockItemAsync } from "../services/itemService";


export function ItemUpdateStock(){
    const formRef = useRef<any>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [formValue, setFormValue] = useState<UpdateStockItem>({
        itemID: 0,
        quantity: 0,
    });

    const model = validationItemUpdateStockModel;

    const handleSubmit = async (onSuccess?: () => void) => {
        if (!formRef.current) return false;
    
        try {
            const isValid = await formRef.current.check();
            if (isValid) {
                const res = await UpdateStockItemAsync(formValue);
                if (res !== null) {
                    console.log('Registro exitoso:', formValue);
                    resetForm();
                    if (onSuccess) onSuccess();
                    return true;
                }
            }
        } catch (error) {
            console.error('Fallo en la validacion del Formulario: ', error);
        }
        return false;
    };
    
    function resetForm() {
        if (formRef.current) { 
            formRef.current.reset(); 
        } 
        setFormValue({ 
            itemID: 0,
            quantity: 0,
        });
    };

    function handleInputChange(field: keyof ItemDTO, value: any) {
        setFormValue((prevValues) => ({
                ...prevValues,
                [field]: value,
            }));
    };

    function handleModal(hidde: boolean){
        setShowModal(hidde);
    }

    return {
        formValue,
        handleInputChange,
        handleModal,
        showModal,
        formRef,
        model,
        handleSubmit,
    };
}
