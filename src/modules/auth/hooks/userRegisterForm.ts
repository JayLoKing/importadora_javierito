import { useRef, useState } from "react";
import { RegisterUserDTO } from "../models/register.user.model";
import { Schema } from "rsuite";
import { registerClientAsync } from "../services/registerUserService";

export function userRegisterForm(){
    const [visible, setVisible] = useState(false);
    const formRef = useRef<any>();
    const { StringType } = Schema.Types;
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

    const model = Schema.Model({
        name: StringType()
            .isRequired('El nombre es requerido')
            .minLength(3, 'El nombre debe tener al menos 3 caracteres.'),
        lastName: StringType()
            .isRequired('El apellido paterno es requerido.')
            .minLength(2, 'El apellido paterno debe tener al menos 2 caracteres.'),
        secondLastName: StringType()
            .minLength(2, 'El apellido Materno debe tener al menos 2 caracteres.'),
        ci: StringType()
            .isRequired('El CI es requerido.')
            .pattern(/^\d+$/, 'El CI debe contener solo numeros.'),
        phoneNumber: StringType()
            .isRequired('El numero de telefono es requerido.')
            .pattern(/^\d{8}$/, 'El numero debe tener 8 digitos.'),
        email: StringType()
            .isRequired('El correo electronico es requerido.')
            .isEmail('Ingrese un correo electronico valido.'),
        password: StringType()
            .isRequired('La contraseña es requerida.')
            .minLength(8, 'La contraseña debe tener al menos 8 caracteres.'),
        confirmPassword: StringType()
            .isRequired('Debe confirmar la contraseña.')
            .addRule((value, data) => { return value === data.password}, 'Las contraseñas no coinciden')
    });

    
    

    const handleSubmit = async () => {
        if (!formRef.current) return;

        try {
            formValue.userName = 'user-text1';
            formValue.role = 'Customer';
            const isValid = await formRef.current.check();
            if(isValid){
                console.log('Formulario Valido', formValue);
                const res = await registerClientAsync(formValue);
                    if (res !== null) {
                    console.log('Formulario Valido', formValue);
                    resetForm();
                }
                return true;
            }
            
        } catch (error) {
            console.error('Fallo en la validacion del Formulario: ', error);
        }
        return false;
    }

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