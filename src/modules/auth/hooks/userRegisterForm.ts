import { useRef, useState } from "react";
import { RegisterUserDTO } from "../models/register.user.model";
import { registerClientAsync } from "../services/registerUserService";
import { validationUserFormModel } from "../utils/validations/user/validation_form";

export function userRegisterForm(){
    const [visible, setVisible] = useState(false);
    const formRef = useRef<any>();
    const togglePasswordVisibility = () => setVisible(!visible);


    const [formValue, setFormValue] = useState<RegisterUserDTO>({
        userName: '',
        password: '',
        confirmPassword: '',
        role: '',
        email: '',
        name: '',
        lastName: '',
        secondLastName: '',
        ci: '',
        phoneNumber: '',
    });

    const model = validationUserFormModel;

    const handleSubmit = async (onSuccess?: () => void) => {
        if (!formRef.current) return false;
    
        try {
            formValue.userName = 'user-text1';
            formValue.role = 'Customer';
            const isValid = await formRef.current.check();
            if (isValid) {
                const res = await registerClientAsync(formValue);
                 if (res !== null) {
                    console.log('Registro exitoso:', formValue);
                    resetForm();
                    if (onSuccess) onSuccess();
                    return true;
                 }
            }
        } catch (error) {
            console.error('Fallo en la validacion del Formulario: ', error);
        }
        return false;
    };
    

    function resetForm() {
        if (formRef.current) { 
            formRef.current.reset(); 
        } 
        setFormValue({ 
            userName: '', 
            role: '', 
            name: '', 
            lastName: '', 
            secondLastName: '', 
            ci: '', 
            phoneNumber: '', 
            email: '', 
            password: '', 
            confirmPassword: '', 
        });
    };

    function handleInputChange(field: keyof RegisterUserDTO, value: string) {
        setFormValue((prevValues) => ({
                ...prevValues,
                [field]: value,
            }));
        };

    return {
        formValue,
        handleInputChange,
        formRef,
        model,
        handleSubmit,
        visible,
        togglePasswordVisibility
    };
}