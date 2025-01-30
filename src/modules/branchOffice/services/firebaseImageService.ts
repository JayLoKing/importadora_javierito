import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase/credentials";

export async function uploadImageToFirebase(file: File): Promise<string> {
    try {
        const storageRef = ref(storage, `branchOffice/${file.name}`);

        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);

        console.log("Imagen subida correctamente. URL:", downloadURL);
        return downloadURL;
    } catch (error) {
        console.error("Error al subir la imagen:", error);
        throw error;
    }
};