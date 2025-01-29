// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
// Your web app's Firebase configuration
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKd4Z1N3hGVIacLWL9IdiFFcyrQHHziz8",
  authDomain: "chat-37d58.firebaseapp.com",
  projectId: "chat-37d58",
  storageBucket: "chat-37d58.firebasestorage.app",
  messagingSenderId: "1061686504659",
  appId: "1:1061686504659:web:b5e33409fde52802867826"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db= getFirestore(app);
export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");