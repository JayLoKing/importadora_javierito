// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, getDocs, collection } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAPQ39tW7kwb8G_SSTaM92s-IBlBbGUf-k",
  authDomain: "importadora-javierito.firebaseapp.com",
  projectId: "importadora-javierito",
  storageBucket: "importadora-javierito.firebasestorage.app",
  messagingSenderId: "58503441335",
  appId: "1:58503441335:web:adba5321b00a2d387ed632"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Storage
const storage = getStorage(app);

// Inicializa Firestore
const db = getFirestore(app); 

export async function checkFirestoreAvailability(): Promise<boolean> {
  try {
    await getDocs(collection(db, "notifications"));
    console.log("Firestore está disponible y accesible.");
    return true;
  } catch (error) {
    console.error("Firestore no está disponible o hay un problema de conexión:", error);
    return false;
  }
}

export { storage, db };