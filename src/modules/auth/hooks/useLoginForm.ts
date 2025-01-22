import { useState } from 'react';
import { LoginDTO } from '../models/login.model';

export function useLoginForm(initialValues: LoginDTO) {
    const [formValues, setFormValues] = useState<LoginDTO>(initialValues);

    function handleInputChange(field: keyof LoginDTO, value: string): void {
        setFormValues((prevValues) => ({
            ...prevValues,
            [field]: value,
        }));
    };

    function resetForm(): void {
        setFormValues(initialValues);
    };

    return {
        formValues,
        handleInputChange,
        resetForm,
    };
};
