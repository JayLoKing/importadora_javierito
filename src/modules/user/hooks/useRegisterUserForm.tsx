import { useState } from "react";

export const useRegisterUserForm = () => {
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);

    function handleOpenModalCreate(open: boolean) {
        setShowModalCreate(open);
    }

    return {
        showModalCreate,
        handleOpenModalCreate,
    }
}