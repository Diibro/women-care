// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyD2h018TmVo5uwrPIDfbVVgOS2Db8uj4n4",
  authDomain: "women-care-acef9.firebaseapp.com",
  projectId: "women-care-acef9",
  storageBucket: "women-care-acef9.appspot.com",
  messagingSenderId: "858010463636",
  appId: "1:858010463636:web:e4eb0fd12c25479f193381",
  measurementId: "G-7YX4LJVCYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app) 