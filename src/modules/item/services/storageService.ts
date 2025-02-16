import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/credentials";

export async function fileUpload(file: File, item: any): Promise<string>{
    try {
        const storageRef = ref(storage, `images/items/${item.name}/${Date.now()}_${file.name}`);
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
        const fileRef = ref(storage, url);
        await deleteObject(fileRef);
    } catch (error) {
        console.error("Error al eliminar la imagen:", error);
        throw error;
    }
}