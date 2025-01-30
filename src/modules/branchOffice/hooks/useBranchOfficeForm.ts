import { useState } from "react";
import { NewBranchOfficeDTO } from "../models/branchOffice.model";

export function useBranchOfficeForm(initialValues: NewBranchOfficeDTO) {
    const [formValues, setFormValues] = useState<NewBranchOfficeDTO>(initialValues);

    function handleInputChange(field: keyof NewBranchOfficeDTO, value: any): void {
        setFormValues(prev => ({
            ...prev,
            [field]: value
        }));
    }

    function resetForm(): void {
        setFormValues(initialValues);
    }

    return {
        formValues,
        handleInputChange,
        resetForm
    }
}