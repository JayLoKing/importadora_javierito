import { Schema } from "rsuite";

const { StringType, NumberType } = Schema.Types;

export const validationUserCreateFormModel = Schema.Model({
    role: StringType()
        .isRequiredOrEmpty('El nombre es requerido'),
    email: StringType()
        .isRequiredOrEmpty('El alias es requerido')
        .isEmail('El Correo no es válido'),

    name: StringType()
        .isRequiredOrEmpty('El nombre es requerido')
        .minLength(3, 'La descripción debe tener al menos 10 caracteres.'),

    lastName: StringType()
        .isRequiredOrEmpty('El Apellido Paterno es requerido')
        .pattern(/^[a-zA-Z\s]+$/, 'El Apellido Paterno puede contener letras.'),

    secondLastName: StringType()
        .pattern(/^[a-zA-Z\s]+$/, 'El Apellido Materno puede contener letras.'),

    ci: StringType()
        .isRequiredOrEmpty('El CI es requerido')
        .pattern(/^[a-zA-Z0-9\s]+$/, 'El CI solo puede contener letras y numeros.'),

    phoneNumber: StringType()
        .isRequiredOrEmpty('El Telefono es requerido')
        .pattern(/^[a-zA-Z0-9\s]+$/, 'El Telefono solo puede contener letras y numeros.'),

    branchOfficeId: NumberType()
        .isRequiredOrEmpty('Debe seleccionar una sucursal') 
        .min(1, 'Debe seleccionar una sucursal válida'), 
});