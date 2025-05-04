import { useState } from "react";
import { ParamsDTO } from "../models/params.model";

export const useBranchOfficeTable = () => {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [searchBranchOffice, setSearchBranchOffice] = useState<string>('');
    const [paramQuery, setParamQuery] = useState<ParamsDTO>({query: ""});
        
    const handleChangeLimit = (datakey : number) => {
        setPage(1);
        setLimit(datakey);
    };
        
    const handleSearch = (value: string) => {
        setPage(1);
        setSearchBranchOffice(value);
        setParamQuery({query: searchBranchOffice});
    };
        
    const handleClearSearch = () => {
        setPage(1);
        setSearchBranchOffice("");
    }

    return {
        limit,
        page,
        searchBranchOffice,
        handleChangeLimit,
        handleSearch,
        handleClearSearch,
        paramQuery,
    }
}