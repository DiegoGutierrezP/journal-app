import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDacVDpVg0ukZ8pOkPXnGsd9lMHsHr7yhU",
  authDomain: "react-cursos-fh.firebaseapp.com",
  projectId: "react-cursos-fh",
  storageBucket: "react-cursos-fh.appspot.com",
  messagingSenderId: "75812894491",
  appId: "1:75812894491:web:a1d106717c9d0aa5a805be"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);