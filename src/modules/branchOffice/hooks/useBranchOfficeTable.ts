import { useState } from "react";
import { BranchOffice } from "../models/branchOffice.model";

export const useBranchOfficeTable = () => {
    const [limit, setLimit] = useState(5);
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

    const handleCountActiveAndInactive = (branchOffices: BranchOffice[]) => {
        let activeCount = 0;
        
        branchOffices.forEach(branch => {
            if (branch.status === 1) activeCount++;
        });
        
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