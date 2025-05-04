import { useEffect, useState } from "react";

export function useItemTable (){
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchBrand, setSearchBrand] = useState<string>('');
    const [searchSubCategory, setSearchSubCategory] = useState<string>('');
    
    const handleChangeLimit = (datakey : number) => {
        setPage(1);
        setLimit(datakey);
    };
    
    const handleSearch = (value: string) => {
        setPage(1);
        setSearchTerm(value);
    };
    
    const handleClearSearch = () => {
        setPage(1);
        setSearchTerm("");
    }

    const tableLoadingES = {
        loading: "Cargando Registros..."
      };
  
      const paginationLocaleES = {
          total: "Total de Registros: {0}",
          limit: "{0} / página",
          skip: "Ir a la página {0}",
          pager: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior",
          },
      };


    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
        
    }, []);
    
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
        handleChangeLimit,
        handleSearch,
        handleClearSearch,
        limit,
        page,
        setPage,
        searchTerm,
        setSearchTerm,
        isMobile,
        tableLoadingES,
        paginationLocaleES,
        searchBrand,
        setSearchBrand,
        searchSubCategory,
        setSearchSubCategory,
        formatDate
    };
}