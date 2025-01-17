import { useState } from 'react';
import { LoginDTO } from '../models/login.model';

export function useLoginForm(initialValues: LoginDTO) {
    const [formValues, setFormValues] = useState<LoginDTO>(initialValues);

    function handleInputChange(field: keyof LoginDTO, value: string) {
        setFormValues((prevValues) => ({
            ...prevValues,
            [field]: value,
        }));
    };

    function resetForm() {
        setFormValues(initialValues);
    };

    return {
        formValues,
        handleInputChange,
        resetForm,
    };
};
