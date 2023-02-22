import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8_PLTzAwhaiOAeic7WoO30vpLr2CwF2A",
  authDomain: "medicare-cce18.firebaseapp.com",
  projectId: "medicare-cce18",
  storageBucket: "medicare-cce18.appspot.com",
  messagingSenderId: "169902360899",
  appId: "1:169902360899:web:e693463b775bf61731c7f6",
  measurementId: "G-WJXNM7CL4S",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();

export default app;