// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPQ39tW7kwb8G_SSTaM92s-IBlBbGUf-k",
  authDomain: "importadora-javierito.firebaseapp.com",
  projectId: "importadora-javierito",
  storageBucket: "importadora-javierito.firebasestorage.app",
  messagingSenderId: "58503441335",
  appId: "1:58503441335:web:adba5321b00a2d387ed632"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage }