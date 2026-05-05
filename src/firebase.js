import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Use env vars (Vercel) with hardcoded fallback (local dev)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCtcO4nVQr-jGI84DIx0UYAcmPXegk5yIQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "start-up-project-1c65a.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "start-up-project-1c65a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "start-up-project-1c65a.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "297098637737",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:297098637737:web:a5c973c8b78ab2b5e794b8",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-0K77KQDM3J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
