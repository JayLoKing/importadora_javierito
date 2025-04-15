import { Schema } from "rsuite";

const { StringType, NumberType, ArrayType } = Schema.Types;

export const validationItemCreateFormModel = Schema.Model({
    name: StringType()
        .isRequired('El nombre es requerido')
        .pattern(/^[a-zA-Z0-9\s]+$/, 'El nombre solo puede contener letras y números.'),

    alias: StringType()
        .isRequired('El alias es requerido')
        .pattern(/^[a-zA-Z\s]+$/, 'El alias solo puede contener letras.'),

    description: StringType()
        .isRequired('La descripción es requerida')
        .minLength(5, 'La descripción debe tener al menos 10 caracteres.'),

    model: StringType()
        .isRequired('El modelo es requerido')
        .pattern(/^[a-zA-Z0-9\s]+$/, 'El modelo solo puede contener letras y números.'),

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
        .isRequired('Debe seleccionar una marca')
        .min(1, 'Debe seleccionar una marca válida'), 

    subCategoryID: NumberType()
        .isRequired('Debe seleccionar una subcategoría') 
        .min(1, 'Debe seleccionar una subcategoría válida'), 
    dateManufacture: StringType()
        .isRequired('La fecha de fabricación es requerida')
        .pattern(/^\d{4}-\d{2}-\d{2}$/, 'La fecha de fabricación debe estar en el formato YYYY-MM-DD.'),

    itemAddressID: NumberType()
        .isRequired('Debe seleccionar una dirección') 
        .min(1, 'Debe seleccionar una dirección válida'), 
    purchasePrice: NumberType()
        .isRequiredOrEmpty('El precio de compra es requerido')
        .min(0, 'El precio de compra debe ser un número positivo.'),
    pathItems: ArrayType()
        .isRequired('Debe subir al menos una imagen')
        .minLength(1, 'Debe subir al menos una imagen')
        .maxLength(5, 'No puede subir más de 5 imágenes')
        .of(
            StringType()
                .pattern(/\.(jpg|jpeg|png)(\?.*)?$/, 'Las imágenes deben estar en formato JPG o PNG.')
        ),

    branchOfficeID: NumberType()
        .isRequired('Debe seleccionar una sucursal') 
        .min(1, 'Debe seleccionar una sucursal válida'), 

    quantity: NumberType()
        .isRequired('La cantidad es requerida')
        .min(0, 'La cantidad debe ser un número positivo.'),

    acronym: StringType()
        .isRequired('El acrónimo es requerido')
        .minLength(2, 'El acrónimo debe tener al menos 2 caracteres.')
        .pattern(/^[a-zA-Z0-9]+$/, 'El acrónimo solo puede contener letras y números.'),

});

export const validationItemEditFormModel = Schema.Model({
    name: StringType()
        .isRequired('El nombre es requerido')
        .minLength(3, 'El nombre debe tener al menos 3 caracteres.')
        .pattern(/^[a-zA-Z0-9\s]+$/, 'El nombre solo puede contener letras y números.'),

    alias: StringType()
        .isRequired('El alias es requerido')
        .minLength(3, 'El alias debe tener al menos 3 caracteres.')
        .pattern(/^[a-zA-Z\s]+$/, 'El alias solo puede contener letras.'),

    description: StringType()
        .isRequired('La descripción es requerida')
        .minLength(10, 'La descripción debe tener al menos 10 caracteres.'),

    model: StringType()
        .isRequired('El modelo es requerido')
        .pattern(/^[a-zA-Z0-9\s]+$/, 'El modelo solo puede contener letras y números.'),

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
        .isRequired('Debe seleccionar una marca')
        .min(1, 'Debe seleccionar una marca válida'), 

    subCategoryID: NumberType()
        .isRequired('Debe seleccionar una subcategoría') 
        .min(1, 'Debe seleccionar una subcategoría válida'), 
    dateManufacture: StringType()
        .isRequired('La fecha de fabricación es requerida')
        .pattern(/^\d{4}-\d{2}-\d{2}$/, 'La fecha de fabricación debe estar en el formato YYYY-MM-DD.'),

    itemAddressID: NumberType()
        .isRequired('Debe seleccionar una dirección') 
        .min(1, 'Debe seleccionar una dirección válida'), 
    itemImages: ArrayType()
        .isRequired('Debe subir al menos una imagen')
        .minLength(1, 'Debe subir al menos una imagen')
        .maxLength(5, 'No puede subir más de 5 imágenes')
        .of(
            StringType()
                .pattern(/\.(jpg|jpeg|png)$/, 'Las imágenes deben estar en formato JPG o PNG.')
        ),
});

export const validationStockEditFormModel = Schema.Model({
    
    branchOfficeId: NumberType()
        .isRequired('Debe seleccionar una sucursal') 
        .min(1, 'Debe seleccionar una sucursal válida'), 

    quantity: NumberType()
        .isRequired('La cantidad es requerida')
        .min(0, 'La cantidad debe ser un número positivo.'),
});
