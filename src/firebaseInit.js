
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmn0WUjdKE6CqZ8g17zJJ9G7b7PYchsPc",
  authDomain: "photoalbum-8409b.firebaseapp.com",
  projectId: "photoalbum-8409b",
  storageBucket: "photoalbum-8409b.appspot.com",
  messagingSenderId: "759017016387",
  appId: "1:759017016387:web:2030feb168d2b8f615d8f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
