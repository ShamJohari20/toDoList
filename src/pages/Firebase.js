// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAG-rrUR3F57PEDrF_uzdPtbJnL21z-tK4",
  authDomain: "todolist-e1de7.firebaseapp.com",
  projectId: "todolist-e1de7",
  storageBucket: "todolist-e1de7.firebasestorage.app",
  messagingSenderId: "192182539415",
  appId: "1:192182539415:web:61128ae798cc79155445d2",
  measurementId: "G-DZBB5WHDGT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app); // 👈 new

export { db, auth };