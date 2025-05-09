/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { NewBranchOfficeDTO } from "../models/branchOffice.model";
import { Message, useToaster } from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import { deleteFile, fileUpload } from "../../item/services/storage.service";
import { User } from "../../user/models/user.model";

export function useBranchOfficeForm() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const toaster = useToaster();
    const [files, setFiles] = useState<FileType[]>([]);

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
    
    const handleFileChange =  (filesList: FileType[], updateField: (field: keyof NewBranchOfficeDTO, value: any) => void) => {
        const fileNames = filesList
        .map(file => file.name || file.blobFile?.name)
        .filter(Boolean);
    
        const invalidFiles = fileNames.some(name => 
            !/\.(jpg|jpeg|png)$/i.test(name as string)
        );
    
        if (invalidFiles) {
            showWarningFilesMessage('Solo se permiten JPG, JPEG o PNG');
            return;
        }
        updateField('pathImages', fileNames as string[]);
        const validFiles = filesList.filter(file => 
            /\.(jpg|jpeg|png)$/i.test(file.name || file.blobFile?.name || '')
        );
        setFiles(validFiles);
    } 
    
    const handleFileRemoveFromList = (file: FileType, updateField: (field: keyof NewBranchOfficeDTO, value: any) => void) => {
        console.log('Eliminando archivo:', file.name || file.blobFile?.name);
        const fileNameToRemove = file.name || file.blobFile?.name;
        const updatedFiles = files.filter(f => 
            f.name !== fileNameToRemove && 
            f.blobFile?.name !== fileNameToRemove
        );
        console.log('Archivos restantes:', updatedFiles);
        setFiles(updatedFiles);
        updateField('pathImages', updatedFiles.map(f => f.name));
    };

    const handleUsersOptions = (users: User[]) => {
        return users
            .filter(user => user.role === "Admin")
            .map(user => ({
                label: user.fullname,
                value: user.id
            }));
    };


    return {
        showModal,
        handleModalCreate,
        handleFileUpload,
        handleFileRemove,
        handleFileChange,
        handleFileRemoveFromList,
        showSuccessMessage,
        showErrorMessage,
        showWarningFilesMessage,
        handleUsersOptions
    }
}