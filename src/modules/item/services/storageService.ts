import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/credentials";

export async function fileUpload(file: File, item: any): Promise<string>{
    try {
        const storageRef = ref(storage, `images/items/${item.name}/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        throw error;
    }
}
