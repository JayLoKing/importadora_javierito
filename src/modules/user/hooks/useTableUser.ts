import { useEffect, useState } from "react";

export function useTableUser (){
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [getID, setGetID] = useState(0);

    const handleChangeLimit = (datakey : number) => {
        setPage(1);
        setLimit(datakey);
    };
    
    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };
    
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
        handleSearch,
        limit,
        page,
        setPage,
        searchTerm,
        setSearchTerm,
        isMobile,
        getID,
        setGetID
    };
}