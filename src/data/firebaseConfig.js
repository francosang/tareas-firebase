/**
 * Firebase configuration and initialization
 * Centralizes Firebase app instance management
 */

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC6alh3mfd6xVUF4IqBM4eHVyv5eVV5mNk",
  authDomain: "test-app-18ab0.firebaseapp.com",
  projectId: "test-app-18ab0",
  storageBucket: "test-app-18ab0.firebasestorage.app",
  messagingSenderId: "907232824807",
  appId: "1:907232824807:web:653e6f4b6f2e47924f4142",
  measurementId: "G-VM2ZW3X3Y5"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
