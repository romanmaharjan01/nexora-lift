// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXpaqlgmqzlYYMwNDOsSlMVg72S6D9SB0",
  authDomain: "nexora-lift.firebaseapp.com",
  projectId: "nexora-lift",
  storageBucket: "nexora-lift.firebasestorage.app",
  messagingSenderId: "256539194091",
  appId: "1:256539194091:web:3d0c43ffbbbff73199c4ae",
  measurementId: "G-CYESSZBJSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;