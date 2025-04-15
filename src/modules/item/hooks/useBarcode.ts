import { useState } from "react";

export const useBarcode = () => {
    const [showModalBareCode, setShowModalBareCode] = useState<boolean>(false);
    const [getIDBarcode, setGetIDBarcode] = useState(0);    

    const handleModalBareCode = (isOpen: boolean) => {
        if (!isOpen) {
            setGetIDBarcode(0); 
        }
        setShowModalBareCode(isOpen);
    };
    
    return {
        handleModalBareCode,
        showModalBareCode,
        getIDBarcode,
        setGetIDBarcode
    }
}