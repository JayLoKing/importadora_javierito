import { useState } from "react";
import { NewBranchOfficeDTO } from "../models/branchOffice.model";

export function useBranchOfficeForm(initialValues: NewBranchOfficeDTO) {
    const [formValues, setFormValues] = useState<NewBranchOfficeDTO>(initialValues);

    function resetValues() {
        setFormValues({
            name: '',
            address: '',
            latitude: '',
            longitude: '',
            pathImages: []
        })
    }

    function handleInputChange(field: keyof NewBranchOfficeDTO, value: any): void {
        setFormValues(prev => ({
            ...prev,
            [field]: value
        }));
    }

    return {
        formValues,
        handleInputChange,
        setFormValues,
        resetValues
    }
}