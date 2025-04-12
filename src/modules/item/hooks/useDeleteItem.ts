import { useState } from "react";

export const useDeleteItem = () => {
    const [showModalDelete, setShowModalDelete] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<{ id: number; name: string }>({ id: 0, name: '' });
    const [getIDDelete, setGetIDDelete] = useState(0);

    const handleModalDelete = (open: boolean, item?: { id: number; name: string }) => {
        if (item) {
            setSelectedItem(item);
        }
        setShowModalDelete(open);
    };

    return {
        showModalDelete,
        handleModalDelete,
        selectedItem,
        getIDDelete,
        setGetIDDelete,
    }
}