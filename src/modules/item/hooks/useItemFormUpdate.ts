import { useEffect, useRef, useState } from "react";
import { GetItemById, ItemDTO } from "../models/item.model";
import { validationItemFormModel } from "../utils/validationForm";
import { useAuthStore } from "../../../store/store";
import { jwtDecoder } from "../../../utils/jwtDecoder";
import { UpdateAsync } from "../services/itemService";
import { ItemUrl } from "../urls/item.url";

export function ItemFormUpdate(){
    const formRef = useRef<any>();
    const [showModalUpdate, setShowModal] = useState<boolean>(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [getID, setGetID] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const jwt = useAuthStore(state => state.jwt);
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

    useEffect(() => {
        const checkScreenSize = () => {
          setIsMobile(window.innerWidth < 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
      }, [formValue]);
        const handleSubmit = async (onSuccess?: () => void) => {
            if (!formRef.current) return false;
            try {
                const isValid = await formRef.current.check();
                if (isValid) {
                    // const res = await UpdateAsync<ItemDTO, ItemDTO>(ItemUrl.update,formValue);
                    // if (res !== null) {
                    //     resetForm();
                    //     if (onSuccess) onSuccess();
                    //     return true;
                    // }
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
        console.log("Campo actualizado:", field, "Valor:", value);
        setFormValue((prevValues) => ({
                ...prevValues,
                [field]: value,
            }));
    };


    function handleModalUpdate(hidde: boolean){
        setShowModal(hidde);
    }

    return {
        formValue,
        handleInputChange,
        handleModalUpdate,
        showModalUpdate,
        formRef,
        model,
        handleSubmit,
        handleChangeLimit,
        limit,
        page,
        setPage,
        searchTerm,
        setSearchTerm,
        isMobile,
        getID,
        setGetID
    };
}
