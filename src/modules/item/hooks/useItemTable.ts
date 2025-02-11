import { useEffect, useState } from "react";

export function useItemTable (){
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleChangeLimit = (datakey : number) => {
        setPage(1);
        setLimit(datakey);
    };
    
    const handleSearch = (value: string) => {
        setSearchLoading(true);
        setSearchTerm(value);
        setTimeout(() => {
            setSearchLoading(false);
        }, 500); 
    };
    
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
    
    function handleModalCreate(hidde: boolean){
        setShowModal(hidde);
    }

    return {
        handleModalCreate,
        showModal,
        handleChangeLimit,
        handleSearch,
        searchLoading,
        limit,
        page,
        setPage,
        searchTerm,
        setSearchTerm,
        isMobile,
    };
}