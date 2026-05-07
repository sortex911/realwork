import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCCC0hKAT7ZK7F0uLPINBUB7cIF__llFU",
  authDomain: "green-realm-landscape.firebaseapp.com",
  projectId: "green-realm-landscape",
  storageBucket: "green-realm-landscape.firebasestorage.app",
  messagingSenderId: "873248022322",
  appId: "1:873248022322:web:3052314f4cd6048170012b",
  measurementId: "G-BHE7W793JN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db      = getFirestore(app);
export const auth    = getAuth(app);
