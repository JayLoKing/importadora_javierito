/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Message, toaster } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import { deleteFile, fileUpload } from "../services/storage.service";
import { ItemById } from "../models/item.model";

export const useUpdateItem = () => {
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [getIDUpdate, setGetIDUpdate] = useState(0);
    const [files, setFiles] = useState<FileType[]>([]);
    const [filesToRemove, setFilesToRemove] = useState<string[]>([]);
    const [originalImages, setOriginalImages] = useState<string[]>([]);

    let remainingOriginalFiles;

    const handleModalUpdate = (isOpen: boolean) => {
        if (!isOpen) {
            setGetIDUpdate(0); 
        }
        setShowModalUpdate(isOpen);
    };

    const showSuccessMessage = () => {
        toaster.push(
            <Message closable showIcon type="success" >
                Editado Correctamente!
            </Message>,
            { placement: 'topCenter', duration: 3000 }
        );
    };

    const showErrorMessage = (message: string) => {
         toaster.push(
            <Message closable showIcon type="error">
                {message}
            </Message>,
            { placement: 'topCenter', duration: 3000 }
        );
    };

    const showWarningFilesMessage = (mesage: string) => {
        toaster.push(
            <Message closable showIcon type="warning">
                {mesage }
            </Message>,
            { placement: 'topCenter', duration: 3000 }
        );
    };

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

    const handleFileRemove =  async (files: string[]) => {
        try {
             
            if (files.length > 0) {
                console.log('Eliminando archivos del storage...');
                await Promise.all(files.map(async (url) => {
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
        } catch (error) {
            console.error('Error al manejar archivos:', error);
            toaster.push(
                <Message closable showIcon type="error">
                    Error al manejar las imágenes
                </Message>,
                { placement: 'topCenter', duration: 3000 }
            );
        } 
    }
    
    
    const handleFileUpload = async (files: FileType[]) => {
        try {
             
            const newImages = files.filter((file) => file.blobFile).map((file) => file.blobFile);
            
            console.log('Nuevas imágenes a subir:', newImages);
        
            console.log('Subiendo nuevas imágenes al storage...');
            const uploadImages = newImages.map(async (files) => {
                try {
                    console.log(`Subiendo archivo: ${files!.name || 'archivo sin nombre'}`);
                    const pathImage = await fileUpload(files as File, files!.name ?? "DefaultNAME");
                    console.log(`Archivo subido correctamente. URL: ${pathImage}`);
                    return pathImage;
                } catch (error) {
                    console.error('Error al subir el archivo:', error);
                    return null;
                }
            });
            const uploadImagesResults = await Promise.all(uploadImages);
               
            return uploadImagesResults as string[];
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
    
    const handleFileChange = (filesList: FileType[], updateField: (field: keyof ItemById, value: any) => void) => {
        // Filtrar solo archivos válidos
        const validFiles = filesList.filter(file => 
            /\.(jpg|jpeg|png)$/i.test(file.name || file.blobFile?.name || '')
        );
        console.log('Archivos válidos:', validFiles);
        setFiles(validFiles);
        updateField('itemImages', validFiles.map(f => f.name || f.url));
    };
    
    const handleFileRemoveFromList = (file: FileType, updateField: (field: keyof ItemById, value: any) => void) => {
        const fileNameToRemove = file.name || file.blobFile?.name;
        const updatedFiles = files.filter(f => 
            f.name !== fileNameToRemove && 
            f.blobFile?.name !== fileNameToRemove
        );
        setFiles(updatedFiles);
        updateField('itemImages', updatedFiles.map(f => f.name || f.url));
        // Si el archivo tiene URL (ya estaba en el storage), agregar a filesToRemove
        // Luego manejar la URL para eliminar (si existe)
        if (file.url) {
            setFilesToRemove(prev => {
                const newFilesToRemove = [...prev, file.url as string];
                console.log('Archivos a eliminar actualizados:', newFilesToRemove);
                return newFilesToRemove;
            });
        }
        
        // Actualizar lista de archivos visibles
        
        
        
    };

    return {
        handleModalUpdate,
        handleRoles,
        handleFileRemove,
        handleFileUpload,
        handleFileChange,
        handleFileRemoveFromList,
        showModalUpdate,
        getIDUpdate,
        setGetIDUpdate,
        showSuccessMessage,
        showErrorMessage,
        showWarningFilesMessage,
        files,
        originalImages,
        setFiles,
        setFilesToRemove,
        remainingOriginalFiles,
        filesToRemove,
        setOriginalImages,
    }
}