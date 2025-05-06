import { useEffect, useState } from "react";

export function useTableUser (){
    const [limit, setLimit] = useState(4);
    const [page, setPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [filterStatus, setFilterStatus] = useState<number | null>(null);
    const [filterOfficeId, setFilterOfficeId] = useState<number | null>(null);
    const [filterRole, setFilterRole] = useState<string | null>(null);
    const [filterSomeName, setFilterSomeName] = useState<string | null>(null);
    const [getID, setGetID] = useState(0);
    const userActive = ['Activo'].map( status => ({ label: status, value: 1 }));
    const userInactive = ['Inactivo'].map( status => ({label: status,value: 0 }));
    const employeeRole = ['Empleado'].map( role => ({label: role, value: 'Employee'}));
    const administratorRole = ['Administrador'].map( role => ({label: role, value: 'Admin'}));

    const statusOptions = [...userActive, ...userInactive];
    const roleOptions = [...employeeRole, ...administratorRole];

    const handleChangeLimit = (datakey : number) => {
        setPage(1);
        setLimit(datakey);
    };

    const handleFilterStatus = (value: number | null) => {
        setPage(1);
        setFilterStatus(value);
    }

    const handleFilterRole = (value: string | null) => {
        setPage(1);
        setFilterRole(value);
    }

    const handleFilterOfficeId = (value: number | null) => {
        setPage(1);
        setFilterOfficeId(value);
    }

    const handleFilterSomeName = (value: string | null) => {
        setPage(1);
        setFilterSomeName(value);
    }
    
    const handleClearSearch = () => {
        setPage(1);
        setFilterSomeName("");
    }

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
    
    return {
        handleChangeLimit,
        handleClearSearch,
        limit,
        page,
        setPage,
        filterStatus,
        isMobile,
        getID,
        setGetID,
        handleFilterOfficeId,
        handleFilterRole,
        handleFilterSomeName,
        handleFilterStatus,
        statusOptions,
        roleOptions,
        filterOfficeId,
        filterRole,
        filterSomeName,
    };
}