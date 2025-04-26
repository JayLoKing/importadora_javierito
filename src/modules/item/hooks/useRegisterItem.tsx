/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Message, useToaster } from "rsuite";
import { deleteFile, fileUpload } from "../services/storage.service";
import { NewItemDTO } from "../models/item.model";

export const useRegisterItem = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const toaster = useToaster();
     const [isValidImgs, setIsValidImgs] = useState<boolean>(false);

    function handleModalCreate(hidde: boolean){
        setShowModal(hidde);
    }

    const showSuccessMessage = () => {
        toaster.push(
            <Message closable showIcon type="success" >
                Registro exitoso
            </Message>,
            { placement: 'topCenter', duration: 3000 }
        );
    };

    const showErrorMessage = () => {
         toaster.push(
            <Message closable showIcon type="error">
                Error al cancelar el formulario
            </Message>,
            { placement: 'topCenter', duration: 3000 }
        );
    };

    const showWarningFilesMessage = () => {
        toaster.push(
            <Message closable showIcon type="warning">
                Tienen que ser 5 imágenes.
            </Message>,
            { placement: 'topCenter', duration: 3000 }
        );
   };


    const branchOfficeOptionsES = {
        searchPlaceholder: "Buscar Sucursal..."
    };
        
    const brandsOptionsES = {
        searchPlaceholder: "Buscar marca..."
    };
        
    const itemAddressesOptionsES = {
        searchPlaceholder: "Buscar direccion..."
    };
        
    const subCategoriesOptionsES = {
        searchPlaceholder: "Buscar sub-categoria..."
    };

    const transmissionsOptionsES = {
        searchPlaceholder: "Buscar transmision..."
    };

    const combustibleTypesOptionsES = {
        searchPlaceholder: "Buscar tipo de combustible..."
    };

    const transmitionsOptions = ['Automático', 'Manual'].map((transmission) => ({
        label: transmission,
        value: transmission,
    }));

    const combustibleTypesOptions = ['Gasolina', 'Diesel', 'Gas', 'Electrico'].map((combustibleType) => ({
        label: combustibleType,
        value: combustibleType,
    }));

    const handleRoles = (role: string) => {
        switch (role) {
            case "admin":
                return "Administrador";
            case "user":
                return "Empleado";
            case "superAdmin":
                return "Super Administrador";
            default:
                return role;
        }
    }

    const handleFileChange = async (files: any[], formData: NewItemDTO, updateField: (field: keyof NewItemDTO, value: any) => void) => {
        try {
            console.log(`Item: ${formData.name}`);
            console.log('Iniciando manejo de archivos...');
            const currentUrls = formData.pathItems;
            console.log('URLs actuales en pathItems:', currentUrls);
            const removedUrls = currentUrls.filter(
                (url) => !files.some((file) => file.url === url)
            );
            console.log('URLs eliminadas:', removedUrls);
        
            if (removedUrls.length > 0) {
                console.log('Eliminando archivos del storage...');
                await Promise.all(removedUrls.map(async (url) => {
                    try {
                        console.log(`Eliminando archivo con URL: ${url}`);
                        await deleteFile(url);
                        console.log(`Archivo eliminado correctamente: ${url}`);
                    } catch (error) {
                        console.error(`Error al eliminar el archivo ${url}:`, error);
                    }
                }));
            } else {
                console.log('No hay archivos para eliminar.');
            }
        
            const newImages = files.filter((file) => file.blobFile).map((file) => file.blobFile);
        
            console.log('Nuevas imágenes a subir:', newImages);
        
            const totalImagesAfterUpdate = newImages.length + currentUrls.length - removedUrls.length;
            console.log('Total de imágenes después de la actualización:', totalImagesAfterUpdate);
        
            if (totalImagesAfterUpdate > 5) {
                console.log('Límite de imágenes excedido. No se subirán más imágenes.');
                toaster.push(
                    <Message closable showIcon type="warning">
                            No puede subir mas de 5 imágenes
                    </Message>,
                    { placement: 'topCenter', duration: 3000 }
                );
                setIsValidImgs(true);
                return; 
            }
        
            console.log('Subiendo nuevas imágenes al storage...');
            const uploadPromises = newImages.map(async (file) => {
                    try {
                    console.log(`Subiendo archivo: ${file.name || 'archivo sin nombre'}`);
                    const pathImage = await fileUpload(file, formData.name ?? "DefaultNAME");
                    console.log(`Archivo subido correctamente. URL: ${pathImage}`);
                    return pathImage;
                } catch (error) {
                    console.error('Error al subir el archivo:', error);
                    return null;
                }
            });
        
            const pathImages = (await Promise.all(uploadPromises)).filter((url) => url !== null);
            console.log('URLs de las nuevas imágenes subidas:', pathImages);
        
            const updatedUrls = [...currentUrls.filter((url) => !removedUrls.includes(url)), ...pathImages];
            console.log('URLs actualizadas en pathItems:', updatedUrls);
            updateField('pathItems', updatedUrls);
        
            setIsValidImgs(false);
            console.log('Manejo de archivos completado correctamente.');
        } catch (error) {
            console.error('Error al manejar archivos:', error);
            toaster.push(
                <Message closable showIcon type="error">
                    Error al manejar las imágenes
                </Message>,
                { placement: 'topCenter', duration: 3000 }
            );
        }
    };

    return {
        handleModalCreate,
        handleRoles,
        handleFileChange,
        showModal,
        branchOfficeOptionsES,
        brandsOptionsES,
        itemAddressesOptionsES,
        subCategoriesOptionsES,
        showSuccessMessage,
        showErrorMessage,
        showWarningFilesMessage,
        isValidImgs,
        transmitionsOptions,
        combustibleTypesOptions,
        transmissionsOptionsES,
        combustibleTypesOptionsES,
    }
}