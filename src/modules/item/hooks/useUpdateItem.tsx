/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Message, useToaster } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import { deleteFile, fileUpload } from "../services/storage.service";
import { ItemById } from "../models/item.model";

export const useUpdateItem = () => {
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
    const [getIDUpdate, setGetIDUpdate] = useState(0);
    const [files, setFiles] = useState<FileType[]>([]);
    const [filesToRemove, setFilesToRemove] = useState<string[]>([]);
    const toaster = useToaster();
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
                {mesage}
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
         // 1. Verificar si es una operación de eliminación
        if (filesList.length < files.length) {
            // Es una eliminación, no hacer nada porque onRemove ya lo maneja
            return;
        }

        // 2. Validar tipos de archivo (solo para nuevas adiciones)
        console.log('Nuevas imágenes seleccionadas:', filesList.map(f => f.name));
        const invalidFiles = filesList.filter(f => !f.url).some(file => {
            const fileName = file.name || file.blobFile?.name || '';
            return !/\.(jpg|jpeg|png)$/i.test(fileName);
        });

        if (invalidFiles) {
            showWarningFilesMessage('Solo se permiten JPG, JPEG o PNG');
            return;
        }

        // 2. Separar archivos existentes (con URL) y nuevos (con blob)
        const existingFiles = files.filter(f => f.url && !f.blobFile);
        const newFiles = filesList.filter(file => !file.url && file.blobFile);

        // 3. Crear objetos para nuevos archivos
        const processedNewFiles = newFiles.map(file => ({
            ...file,
            url: file.blobFile ? URL.createObjectURL(file.blobFile) : undefined
        }));

        // 4. Combinar archivos
        const allFiles = [...existingFiles, ...processedNewFiles];
        setFiles(allFiles);

        updateField('itemImages', allFiles.map(f => f.name || f.url) as string[]);

        console.log('Archivos actuales:', allFiles.map(f => f.name || f.url) as string[]);
       
    };

    const handleFileRemoveFromList = (file: FileType, updateField: (field: keyof ItemById, value: any) => void) => {
        // 1. Mantengo tu find original para la URL existente
        const existingFile = files.find(f => f.url === file.url);
        
        // 2. Si encontramos un archivo existente, lo agregamos a filesToRemove
        let newFilesToRemove = filesToRemove;
        if (existingFile?.url) {
            newFilesToRemove = [...filesToRemove, existingFile.url as string];
            setFilesToRemove(newFilesToRemove); // Actualizar estado
        } else {
            console.log('file vacio');
        }
        console.log('url a eliminar:',filesToRemove)
        // 3. Filtramos para quitar el archivo (manteniendo tu lógica)
        const updatedFiles = files.filter(f => {
            if (file.url) return f.url !== file.url;
            return f.name !== file.name;
        });

        // 4. Actualizamos el estado de files
        setFiles(updatedFiles);

        updateField('itemImages', updatedFiles);
        console.log('Files actualizados CORRECTAMENTE:', updatedFiles);

        // 6. Liberamos memoria de blobs (nuevas imágenes) si es necesario
        if (!file.url) {
            const blobToRemove = files.find(f => f.name === file.name);
            if (blobToRemove?.url) {
                URL.revokeObjectURL(blobToRemove.url);
            }
        }
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
        setFiles,
        setFilesToRemove,
        remainingOriginalFiles,
        filesToRemove,
    }
}