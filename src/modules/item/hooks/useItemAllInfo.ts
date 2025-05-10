import { useState } from "react"
import { GetBranchOfficesStock } from "../models/itemAllInfo.model";

export const useItemAllInfo = () => {
    const [getItemInfoId, setGetItemInfoId] = useState(0);
    const [showModalAllInfo, setShowModalAllInfo] = useState<boolean>(false);
    const [branchOfficesStock, setBranchOfficesStock ] = useState<GetBranchOfficesStock[]>([]);
    const handleModalAllInfo = (isOpen: boolean) => {
        if (!isOpen) {
            setGetItemInfoId(0); 
        }
        setShowModalAllInfo(isOpen);
    };

    const getItemStatus = (status: string) => {
        switch(status) {
            case 'U': return 'USADO';
            case 'N': return 'NUEVO';
            default: return 'DESCONOCIDO';
        }
    };

    const getItemTraction = (traction: string) => {
        switch(traction){
            case '2': return '4x2';
            case '4': return '4x4';
            default: return 'DESCONOCIDO';
        }
    }

    const getBranchOfficesStock = (branchOfficesStocks: GetBranchOfficesStock[]) => {
        setBranchOfficesStock(branchOfficesStocks);
        return branchOfficesStock;
    }

    const formatDate = (dateString: string | Date): string => {
        if (!dateString) return "Sin fecha";
  
        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) return "Fecha inválida";

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    return {
        handleModalAllInfo,
        getItemInfoId,
        setGetItemInfoId,
        showModalAllInfo,
        getItemStatus,
        getItemTraction,
        getBranchOfficesStock,
        formatDate,
        branchOfficesStock
    }
}