import { useState } from "react";

export const useUpdateItem = () => {
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [getIDUpdate, setGetIDUpdate] = useState(0);

    const handleModalUpdate = (isOpen: boolean) => {
        if (!isOpen) {
            setGetIDUpdate(0); 
        }
        setShowModalUpdate(isOpen);
    };

    return {
        handleModalUpdate,
        showModalUpdate,
        getIDUpdate,
        setGetIDUpdate
    }
}