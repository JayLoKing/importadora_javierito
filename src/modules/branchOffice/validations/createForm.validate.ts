import { Schema } from "rsuite";

const { StringType, ArrayType } = Schema.Types;

export const validationBranchOfficeCreateFormModel = Schema.Model({
    name: StringType()
        .isRequired('El nombre es requerido'),

    address: StringType()
        .isRequired('La dirección es requerida'),

    latitude: StringType()
        .isRequired(''),

    longitute: StringType()
        .isRequired(''),

    pathItems: ArrayType()
        .isRequired('Debe subir al menos una imagen')
        .minLength(1, 'Debe subir al menos una imagen')
        .maxLength(5, 'No puede subir más de 5 imágenes'),
});