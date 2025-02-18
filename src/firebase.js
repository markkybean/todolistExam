// Import the functions you need from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // Import Authentication
import { signInWithEmailAndPassword, signOut } from "firebase/auth";  // Import Authentication methods

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmemwCe9tdTUspYoqovx2uWlAc3xGHRe8",
  authDomain: "todolist-2f219.firebaseapp.com",
  projectId: "todolist-2f219",
  storageBucket: "todolist-2f219.appspot.com",
  messagingSenderId: "843323611299",
  appId: "1:843323611299:web:01c65e4b1ae73d34674716",
  measurementId: "G-7DWC4L8F6V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Export authentication methods for use in your app
export { auth, signInWithEmailAndPassword, signOut };
