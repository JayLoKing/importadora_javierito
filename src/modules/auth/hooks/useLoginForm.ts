import { useState } from 'react';
import { LoginDTO } from '../models/login.model';
import { useAuthStore } from '../../../store/store';

export function useLoginForm(initialValues: LoginDTO) {
    const [formValues, setFormValues] = useState<LoginDTO>(initialValues);
    const { clearUser } = useAuthStore();

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
        clearUser,
        formValues,
        handleInputChange,
        resetForm,
    };
};
