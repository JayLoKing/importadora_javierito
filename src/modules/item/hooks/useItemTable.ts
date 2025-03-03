import { useEffect, useState } from "react";

export function useItemTable (){
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
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
    
    function handleModalCreate(hidde: boolean){
        setShowModal(hidde);
    }

    const handleModalUpdate = (isOpen: boolean) => {
        if (!isOpen) {
          setGetID(0); 
        }
        setShowModalUpdate(isOpen);
      };

    return {
        handleModalCreate,
        handleModalUpdate,
        showModal,
        showModalUpdate,
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