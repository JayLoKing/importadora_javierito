import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase/credentials";

export async function fileUpload(file: File) {
    try {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading file:", error);
        return null;
    }
}
