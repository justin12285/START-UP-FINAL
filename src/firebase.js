import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtcO4nVQr-jGI84DIx0UYAcmPXegk5yIQ",
  authDomain: "start-up-project-1c65a.firebaseapp.com",
  projectId: "start-up-project-1c65a",
  storageBucket: "start-up-project-1c65a.firebasestorage.app",
  messagingSenderId: "297098637737",
  appId: "1:297098637737:web:a5c973c8b78ab2b5e794b8",
  measurementId: "G-0K77KQDM3J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
