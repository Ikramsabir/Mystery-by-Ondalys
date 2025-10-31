// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYHQfw9PgBrKVZjdWvEu-8-pX8znWr3cM",
  authDomain: "mystery-ondalys.firebaseapp.com",
  projectId: "mystery-ondalys",
  storageBucket: "mystery-ondalys.firebasestorage.app",
  messagingSenderId: "642430128547",
  appId: "1:642430128547:web:acefa5619bdda50299ca16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

export default app;