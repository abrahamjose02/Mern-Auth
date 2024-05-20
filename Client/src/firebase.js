
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCMgUP0d5N8lkuNpXaZFGuK_iyhW2J030A",
  authDomain: "mern-auth-fac5c.firebaseapp.com",
  projectId: "mern-auth-fac5c",
  storageBucket: "mern-auth-fac5c.appspot.com",
  messagingSenderId: "1052970587364",
  appId: "1:1052970587364:web:6dac049c8fdd1a410648f1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);