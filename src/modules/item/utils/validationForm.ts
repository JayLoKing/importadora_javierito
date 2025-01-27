import { Schema } from "rsuite";

const { StringType, NumberType, ArrayType } = Schema.Types;

export const validationItemFormModel = Schema.Model({
    name: StringType()
        .isRequired('El nombre es requerido')
        .minLength(3, 'El nombre debe tener al menos 3 caracteres.'),
    alias: StringType()
        .isRequired('El alias es requerido')
        .minLength(3, 'El alias debe tener al menos 3 caracteres.'),
    description: StringType()
        .isRequired('La descripción es requerida')
        .minLength(10, 'La descripción debe tener al menos 10 caracteres.'),
    model: StringType()
        .isRequired('El modelo es requerido'),
    price: NumberType()
        .isRequired('El precio es requerido')
        .min(0, 'El precio debe ser un número positivo.'),
    wholesalePrice: NumberType()
        .isRequired('El precio al por mayor es requerido')
        .min(0, 'El precio al por mayor debe ser un número positivo.'),
    barePrice: NumberType()
        .isRequired('El precio base es requerido')
        .min(0, 'El precio base debe ser un número positivo.'),
    brandID: NumberType()
        .isRequired('El ID de la marca es requerido'),
    subCategoryID: NumberType()
        .isRequired('El ID de la subcategoría es requerido'),
    weight: NumberType()
        .isRequired('El peso es requerido')
        .min(0, 'El peso debe ser un número positivo.'),
    dateManufacture: StringType()
        .isRequired('La fecha de fabricación es requerida')
        .pattern(/^\d{4}-\d{2}-\d{2}$/, 'La fecha de fabricación debe estar en el formato YYYY-MM-DD.'),
    itemAddressID: NumberType()
        .isRequired('El ID de la dirección del artículo es requerido'),
    userID: NumberType()
        .isRequired('El ID del usuario es requerido'),
    pathItems: ArrayType()
        .isRequired('Debe subir al menos una imagen')
        .minLength(1, 'Debe subir al menos una imagen')
        .maxLength(5, 'No puede subir más de 5 imágenes')
        .of(
            StringType()
            .pattern(/\.(jpg|jpeg|png)$/, 'Las imágenes deben estar en formato JPG o PNG.')
        ),
    branchOfficeID: NumberType()
        .isRequired('El ID de la sucursal es requerido'),
    quantity: NumberType()
        .isRequired('La cantidad es requerida')
        .min(0, 'La cantidad debe ser un número positivo.'),
    barcodes: ArrayType()
        .isRequired('Los códigos de barras son requeridos')
        .of(
            StringType()
            .pattern(/^\d+$/, 'Los códigos de barras deben contener solo números.')
        ),
    acronym: StringType()
        .isRequired('El acrónimo es requerido')
        .minLength(2, 'El acrónimo debe tener al menos 2 caracteres.'),
});
