import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/credentials";

export async function fileUpload(file: File, itemName: string): Promise<string> {
    try {
        if (!file || !file.name) {
            throw new Error("El archivo no está definido o no tiene un nombre válido.");
        }
        const newItemName = itemName ?? "Default - Name"
        const storageRef = ref(storage, `images/items/${newItemName}/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        throw error;
    }
}

export async function deleteFile(url: string): Promise<void> {
    try {
        if (!url) {
            throw new Error("No se proporcionó una ruta válida.");
        }

        const fileRef = ref(storage, url);
        await deleteObject(fileRef);
    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        throw error;
    }
}