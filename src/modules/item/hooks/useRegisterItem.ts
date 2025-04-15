import { useState } from "react";

export const useRegisterItem = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    
    function handleModalCreate(hidde: boolean){
        setShowModal(hidde);
    }

     const branchOfficeOptionsES = {
            searchPlaceholder: "Buscar Sucursal..."
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

    return {
        handleModalCreate,
        showModal,
        branchOfficeOptionsES,
        brandsOptionsES,
        itemAddressesOptionsES,
        subCategoriesOptionsES
    }
}