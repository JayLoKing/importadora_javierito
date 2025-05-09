import { useState } from "react";
import { BranchOffice } from "../models/branchOffice.model";

export const useBranchOfficeTable = () => {
    const [limit, setLimit] = useState(4);
    const [page, setPage] = useState(1);
    const [searchBranchOffice, setSearchBranchOffice] = useState<string>('');
    const [filterStatus, setFilterStatus] = useState<number | null>(null);
        
    const handleChangeLimit = (datakey : number) => {
        setPage(1);
        setLimit(datakey);
    };
        
    const handleSearch = (value: string) => {
        setPage(1);
        setSearchBranchOffice(value);
    };
        
    const handleChangePage = (page: number) => {
        setPage(page);
    }

    const handleClearSearch = () => {
        setPage(1);
        setSearchBranchOffice("");
    }

    const handleFilterStatus = (status: number | null) => {
        setPage(1);
        setFilterStatus(status);
    }

    const filterStatusOptions = ['Activo', 'Inactivo'].map((status) => ({
        label: status,
        value: status === 'Activo' ? 1 : status === 'Inactivo' ? 0 : null,
    }));

    const handleCountActiveAndInactive = (branchOffices: BranchOffice[] | undefined) => {
        // Si no hay datos o no es un array, retorna 0 en ambos contadores
        if (!branchOffices || !Array.isArray(branchOffices)) {
            return { active: 0, inactive: 0 };
        }
    
        const activeCount = branchOffices.filter(branch => branch.status === 1).length;
        return {
            active: activeCount,
            inactive: branchOffices.length - activeCount
        };
    };

    return {
        limit,
        page,
        setPage,
        handleChangePage,
        searchBranchOffice,
        filterStatus,
        handleChangeLimit,
        handleSearch,
        handleClearSearch,
        handleFilterStatus,
        filterStatusOptions,
        handleCountActiveAndInactive
    }
}