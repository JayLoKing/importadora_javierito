import { useRef, useState } from "react";
import { ItemDTO } from "../models/item.model";
import { validationItemFormModel } from "../utils/validationForm";
import { CreateItemAsync } from "../services/itemService";


export function ItemRegisterForm(){
    const formRef = useRef<any>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [formValue, setFormValue] = useState<ItemDTO>({
        name: '',
        alias: '',
        description: '',
        model: '',
        price: 0,
        wholesalePrice: 0,
        barePrice: 0,
        brandID: 0,
        subCategoryID: 0,
        weight: 0,
        dateManufacture: '',
        itemAddressID: 0,
        userID: 0,
        pathItems: [],
        branchOfficeID: 0,
        quantity: 0,
        acronym: ''
    });

    const model = validationItemFormModel;

    const handleChangeLimit = (datakey : number) => {
        setPage(1);
        setLimit(datakey);
    };

    const handleSubmit = async (onSuccess?: () => void) => {
        if (!formRef.current) return false;
    
        try {
            const isValid = await formRef.current.check();
            if (isValid) {
                const res = await CreateItemAsync(formValue);
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
            name: '',
            alias: '',
            description: '',
            model: '',
            price: 0,
            wholesalePrice: 0,
            barePrice: 0,
            brandID: 0,
            subCategoryID: 0,
            weight: 0,
            dateManufacture: '',
            itemAddressID: 0,
            userID: 0,
            pathItems: [],
            branchOfficeID: 0,
            quantity: 0,
            acronym: ''
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
        handleChangeLimit,
        limit,
        page,
        setPage,
        searchTerm,
        setSearchTerm
    };
}
