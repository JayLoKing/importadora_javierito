import { Schema } from "rsuite";

const {StringType} = Schema.Types;

export const validationUserFormModel = Schema.Model({
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

export const validationResetPasswordForm = Schema.Model({
    
    newPassword: StringType()
        .isRequiredOrEmpty('La contraseña es requerida.')
        .minLength(8, 'La contraseña debe tener al menos 8 caracteres.'),
    confirmPassword: StringType()
        .isRequiredOrEmpty('Debe confirmar la contraseña.'),
    code: StringType()
        .isRequiredOrEmpty('Codigo no Ingresado'),
        
});

export const validationVerifyEmailForm = Schema.Model({
    email: StringType()
        .isRequired('Se necesita el correo para verificacion de cuenta.')
        .isEmail('Ingrese un correo electronico valido.'),
});